import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AssignmentsMapperService } from 'src/app/components/assignments/services/mapper/assignments-mapper.service';
import { AssignmentsObservableService } from 'src/app/components/assignments/services/observable/assignments-observable.service';
import { FirestoreCollection } from 'src/app/core/enums';
import { ITcDbRefModel, TcDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';

@Component({
  selector: 'app-assignments-form-add-tcs-modal',
  templateUrl: './assignments-form-add-tcs-modal.component.html',
  styleUrls: ['./assignments-form-add-tcs-modal.component.scss']
})
export class AssignmentsFormAddTcsModalComponent {

  @Input() private _assignmentId: string = '';
  
  form: FormGroup = this._formDefinition();

  private _tcsCollectionService: FirestoreCollectionService<ITcDbRefModel>;

  constructor(
    firestore: AngularFirestore,
    private _modalController: ModalController,
    private _assignmentsMapperService: AssignmentsMapperService,
    private _assignmentsObservableService: AssignmentsObservableService
  ) {
    this._tcsCollectionService = new FirestoreCollectionService<ITcDbRefModel>(firestore, FirestoreCollection.TCS);
  }

  close() {
    this._modalController.dismiss();
  }

  submit() {
    if (this.form.valid)
      this._addTc();
  }

  private _addTc() {
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