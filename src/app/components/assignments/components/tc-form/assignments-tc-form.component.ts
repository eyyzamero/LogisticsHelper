import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirestoreCollection } from 'src/app/core/enums';
import { ITcDbRefModel, TcDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { AssignmentsMapperService } from '../../services/mapper/assignments-mapper.service';
import { AssignmentsObservableService } from '../../services/observable/assignments-observable.service';
import { BaseAssignmentsModal } from '../form/components/modals/base/assignments-modal.base';

@Component({
  selector: 'app-assignments-tc-form',
  templateUrl: './assignments-tc-form.component.html',
  styleUrls: ['./assignments-tc-form.component.scss']
})
export class AssignmentsTcFormComponent extends BaseAssignmentsModal {

  @Input() private _assignmentId: string = '';
  
  form: FormGroup = this._formDefinition();

  private _tcsCollectionService: FirestoreCollectionService<ITcDbRefModel>;

  constructor(
    firestore: AngularFirestore,
    modalController: ModalController,
    private _assignmentsMapperService: AssignmentsMapperService,
    private _assignmentsObservableService: AssignmentsObservableService
  ) {
    super(modalController);
    this._tcsCollectionService = new FirestoreCollectionService<ITcDbRefModel>(firestore, FirestoreCollection.TCS);
  }

  submit(): void {
    if (this.form.valid)
      this._addTc();
  }

  private _addTc(): void {
    const tc = new TcDbRefModel(
      undefined,
      this._assignmentId,
      this.form.controls['tc'].value,
      this.form.controls['width'].value,
      this.form.controls['height'].value,
      this.form.controls['inners'].value,
      this.form.controls['limit'].value
    );
    this._tcsCollectionService.add(tc).then(() => {
      const mappedTc = this._assignmentsMapperService.ITcDbRefModelToIAssignmentTcModel(tc);
      this._assignmentsObservableService.addTc(this._assignmentId, mappedTc);
      this.close();
    });
  }

  private _formDefinition(): FormGroup {
    return new FormGroup({
      tc: new FormControl(null, [
        Validators.required,
        Validators.pattern(/TC-T[\w]*/)
      ]),
      width: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(999)
      ]),
      height: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(999)
      ]),
      inners: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(9999)
      ]),
      limit: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(99999)
      ])
    });
  }
}
