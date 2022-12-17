import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommunicationState, FirestoreCollection, FormMode } from 'src/app/core/enums';
import { AssignmentLogDbRef, IAssignmentLogDbRefModel, ITcDbRefModel, TcDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { AssignmentLogType } from '../../enums';
import { IAssignmentTcModel } from '../../models';
import { AssignmentsMapperService } from '../../services/mapper/assignments-mapper.service';
import { AssignmentsObservableService } from '../../services/observable/assignments-observable.service';
import { BaseAssignmentsModal } from '../form/components/modals/base/assignments-modal.base';

@Component({
  selector: 'app-assignments-tc-form',
  templateUrl: './assignments-tc-form.component.html',
  styleUrls: ['./assignments-tc-form.component.scss']
})
export class AssignmentsTcFormComponent extends BaseAssignmentsModal {

  @Input() set tcId(id: string) {
    this._tcId = id;

    if (id) {
      this._mode = FormMode.EDIT;
      this._assignTcFormValues(id);
    }
  }
  @Input() assignmentId: string = '';

  get mode(): FormMode {
    return this._mode;
  }

  form: FormGroup = this._formDefinition();
  communicationState: CommunicationState = CommunicationState.NONE;

  readonly CommunicationState = CommunicationState;

  private get _filledTcDbRefModel(): TcDbRefModel {
    const tc = new TcDbRefModel(
      undefined,
      this.assignmentId,
      this.form.controls['tc'].value,
      this.form.controls['width'].value,
      this.form.controls['height'].value,
      this.form.controls['inners'].value,
      this.form.controls['limit'].value
    );
    return tc;
  }

  private _tcId: string = '';
  private _mode: FormMode = FormMode.CREATE;
  private _initialTc?: IAssignmentTcModel;
  private _tcsCollectionService: FirestoreCollectionService<ITcDbRefModel>;
  private _assignmentLogsCollectionService: FirestoreCollectionService<IAssignmentLogDbRefModel>;

  constructor(
    firestore: AngularFirestore,
    modalController: ModalController,
    private _assignmentsMapperService: AssignmentsMapperService,
    private _assignmentsObservableService: AssignmentsObservableService
  ) {
    super(modalController);
    this._tcsCollectionService = new FirestoreCollectionService<ITcDbRefModel>(firestore, FirestoreCollection.TCS);
    this._assignmentLogsCollectionService = new FirestoreCollectionService<IAssignmentLogDbRefModel>(firestore, FirestoreCollection.ASSIGNMENTS_LOGS);
  }

  submit(): void {
    if (this.form.valid)
      this._mode === FormMode.CREATE ? this._addTc() : this._editTc();
  }

  private _assignTcFormValues(id: string): void {
    this.communicationState = CommunicationState.LOADING;

    const assignment = this._assignmentsObservableService.observableSubjectValue.data.find(x => x.id === this.assignmentId);

    if (assignment) {
      const tc = assignment.tcs.find(x => x.id === id);

      if (tc) {
        this._initialTc = tc;

        this.form.controls['tc'].setValue(tc.name);
        this.form.controls['width'].setValue(tc.width);
        this.form.controls['height'].setValue(tc.height);
        this.form.controls['inners'].setValue(tc.inners);
        this.form.controls['limit'].setValue(tc.limit);

        this.form.controls['width'].disable();
        this.form.controls['height'].disable();
        this.form.controls['inners'].disable();

        this.communicationState = CommunicationState.LOADED;
      }
    }
  }

  private _addTc(): void {
    const tc = this._filledTcDbRefModel;
    this._tcsCollectionService.add(tc).then(() => {
      const mappedTc = this._assignmentsMapperService.ITcDbRefModelToIAssignmentTcModel(tc);
      this._assignmentsObservableService.addTc(this.assignmentId, mappedTc);
      this._addEventToLogs(mappedTc);
      this.close();
    });
  }

  private _editTc(): void {
    let tc = this._filledTcDbRefModel;
    tc.id = this._tcId;

    this._tcsCollectionService.update(tc).then(() => {
      const mappedTc = this._assignmentsMapperService.ITcDbRefModelToIAssignmentTcModel(tc);
      this._assignmentsObservableService.editTc(this.assignmentId, mappedTc);
      this._addEventToLogs(mappedTc);
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

  private _addEventToLogs(tc: IAssignmentTcModel): void {
    const log = new AssignmentLogDbRef(
      undefined,
      this.assignmentId,
      this._mode === FormMode.CREATE ? AssignmentLogType.TC_ADDED : AssignmentLogType.TC_EDITED,
      `${tc.name} - ${tc.width}W x ${tc.height}H x ${tc.inners}IN - ${tc.limit}L`
    );

    if (this.mode === FormMode.EDIT && this._initialTc)
      log.second_text = `${this._initialTc.name} - ${this._initialTc.width}W x ${this._initialTc.height}H x ${this._initialTc.inners}IN - ${this._initialTc.limit}L`;

    this._assignmentLogsCollectionService.add(log).then(() => {
      const mappedLog = this._assignmentsMapperService.IAssignmentLogDbRefModelToIAssignmentLogModel(log);
      this._assignmentsObservableService.addLog(this.assignmentId, mappedLog);
    });
  }
}
