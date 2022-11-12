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
  styleUrls: ['./assignments-form-add-pallet-modal.component.scss'],
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

  private _initObservables() {
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
            console.log('Single pallet');
            this.form.controls['count'].setValue(null);
            this.form.controls['inners'].setValue(null);
            break;
          case PalletType.MULTIPLE:
            console.log('Multiple pallets');
            this.form.controls['inners'].setValue(null);
            break;
          case PalletType.INCOMPLETE:
            console.log('Incomplete pallet');
            this.form.controls['count'].setValue(null);
            break;
          default:
            this.form.controls['count'].setValue(null);
            this.form.controls['inners'].setValue(null);
            break;
        }
      }
    })
    this._subscriptions.push(tcSubscription, typeSubscription);
  }

  private _addPallet(): void {
    const pallet = new PalletDbRefModel(

    );
    this._palletsCollectionService.add(pallet).then(() => {
      const mappedPallet = this._assignmentsMapperService.IPalletDbRefModelToIAssignmentPalletModel(pallet);
      this._assignmentsObservableService.addPallet(this._assignment.id, 'TC', mappedPallet);
      this.close();
    });
  }

  private _formDefinition(): FormGroup {
    return new FormGroup({
      tc: new FormControl(null, [
        Validators.required
      ]),
      type: new FormControl(null, [
        Validators.required
      ]),
      count: new FormControl(null),
      inners: new FormControl(null)
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}
