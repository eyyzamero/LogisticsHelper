import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PalletType } from 'src/app/components/assignments/enums';
import { AssignmentModel, IAssignmentModel } from 'src/app/components/assignments/models';
import { AssignmentsMapperService } from 'src/app/components/assignments/services/mapper/assignments-mapper.service';
import { AssignmentsObservableService } from 'src/app/components/assignments/services/observable/assignments-observable.service';
import { FirestoreCollection } from 'src/app/core/enums';
import { IPalletDbRefModel, PalletDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';

@Component({
  selector: 'app-assignments-form-add-pallet-modal',
  templateUrl: './assignments-form-add-pallet-modal.component.html',
  styleUrls: ['./assignments-form-add-pallet-modal.component.scss']
})
export class AssignmentsFormAddPalletModalComponent implements OnInit, OnDestroy {

  @Input() private set _assignmentId(value: string) {
    const assignment = this._assignmentsObservableService.observableSubjectValue.data.find(x => x.id === value);

    if (assignment) {
      this._assignment = assignment;
      this.tcs = this._assignment.tcs.map(x => x.name);
    }
  }

  form: FormGroup = this._formDefinition();
  tcs: Array<string> = new Array<string>();
  palletTypes: Array<string> = Object.values(PalletType).filter(x => x !== PalletType.NONE)
  tcFieldFilled: boolean = false;

  readonly PalletType = PalletType;

  private _assignment: IAssignmentModel = new AssignmentModel();
  private _palletsCollectionService: FirestoreCollectionService<IPalletDbRefModel>;
  private _subscriptions: Array<Subscription> = new Array<Subscription>();
  
  constructor(
    firestore: AngularFirestore,
    private _modalController: ModalController,
    private _assignmentsMapperService: AssignmentsMapperService,
    private _assignmentsObservableService: AssignmentsObservableService
  ) {
    this._palletsCollectionService = new FirestoreCollectionService<IPalletDbRefModel>(firestore, FirestoreCollection.PALLETS);
  }

  ngOnInit(): void {
    this._initObservables();
  }

  close(): void {
    this._modalController.dismiss();
  }

  submit(): void {
    if (this.form.valid)
      this._addPallet();
  }

  private _initObservables(): void {
    const tcSubscription = this.form.controls['tc'].valueChanges.subscribe({
      next: (value: string) => {
        this.tcFieldFilled = value ? true : false;

        if (!this.tcFieldFilled)
          this.form.controls['type'].setValue(null);
      }
    });
    const typeSubscription = this.form.controls['type'].valueChanges.subscribe({
      next: (value: PalletType) => {
        switch(value) {
          case PalletType.SINGLE:
            this.form.controls['count'].setValue(0);
            this.form.controls['inners'].setValue(0);
            break;
          case PalletType.MULTIPLE:
            this.form.controls['inners'].setValue(0);
            break;
          case PalletType.INCOMPLETE:
            this.form.controls['count'].setValue(0);
            break;
          default:
            this.form.controls['count'].setValue(0);
            this.form.controls['inners'].setValue(0);
            break;
        }
      }
    })
    this._subscriptions.push(tcSubscription, typeSubscription);
  }

  private _addPallet(): void {
    const tc = this._assignment.tcs.find(x => x.name === this.form.controls['tc'].value)!;
    let pallet = new PalletDbRefModel(
      undefined,
      this._assignment.id,
      tc.id,
      tc.width * tc.height * tc.inners,
      true
    );

    switch(this.form.controls['type'].value) {
      case PalletType.SINGLE:
        this._palletsCollectionService.add(pallet).then(() => {
          const mappedPallet = this._assignmentsMapperService.IPalletDbRefModelToIAssignmentPalletModel(pallet);
          this._assignmentsObservableService.addPallet(pallet.assignmentId, pallet.tcId, mappedPallet);
          this.close();
        });
        break;
      case PalletType.MULTIPLE:
        let pallets = new Array<PalletDbRefModel>();

        for (let i = 0; i < +this.form.controls['count'].value; i++)
          pallets.push(pallet);

        this._palletsCollectionService.addMultiple(pallets).then(() => {
          const mappedPallets = this._assignmentsMapperService.ArrayOfIPalletDbRefToArrayOfIAssignmentPalletModel(pallets);
          this._assignmentsObservableService.addPalletsToTc(this._assignment.id, tc.name, mappedPallets);
          this.close();
        });
        break;
      case PalletType.INCOMPLETE:
        pallet.inners = +this.form.controls['inners'].value;
        pallet.full = false;
        this._palletsCollectionService.add(pallet).then(() => {
          const mappedPallet = this._assignmentsMapperService.IPalletDbRefModelToIAssignmentPalletModel(pallet);
          this._assignmentsObservableService.addPallet(pallet.assignmentId, pallet.tcId, mappedPallet);
          this.close();
        });
        break;
    }
  }

  private _formDefinition(): FormGroup {
    return new FormGroup({
      tc: new FormControl(null, [
        Validators.required
      ]),
      type: new FormControl(null, [
        Validators.required
      ]),
      count: new FormControl(0, [
        Validators.required
      ]),
      inners: new FormControl(0, [
        Validators.required
      ])
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}
