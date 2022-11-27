import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DeleteModalComponent } from 'src/app/core/components/modals/delete-modal/delete-modal.component';
import { FirestoreCollection } from 'src/app/core/enums';
import { AssignmentLogDbRef, IAssignmentLogDbRefModel, ITcDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { AssignmentLogType } from '../../enums';
import { IAssignmentModel, IAssignmentTcModel } from '../../models';
import { AssignmentsMapperService } from '../../services/mapper/assignments-mapper.service';
import { AssignmentsObservableService } from '../../services/observable/assignments-observable.service';
import { AssignmentsFormTcModalComponent } from '../form/components/modals/add-tcs/assignments-form-tc-modal.component';

@Component({
  selector: 'app-assignments-tcs-management-panel',
  templateUrl: './assignments-tcs-management-panel.component.html',
  styleUrls: ['./assignments-tcs-management-panel.component.scss'],
})
export class AssignmentsTcsManagementPanelComponent implements OnInit, OnDestroy {

  tcs: Array<IAssignmentTcModel> = new Array<IAssignmentTcModel>();

  assignmentId: string | null = null;
  private _tcsCollectionService: FirestoreCollectionService<ITcDbRefModel>;
  private _assignmentsLogsCollectionService: FirestoreCollectionService<IAssignmentLogDbRefModel>;
  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    firestore: AngularFirestore,
    private _router: Router,
    private _translateService: TranslateService,
    private _activatedRoute: ActivatedRoute,
    private _assignmentsObservableService: AssignmentsObservableService,
    private _modalController: ModalController,
    private _assignmentsMapperService: AssignmentsMapperService
  ) {
    this._tcsCollectionService = new FirestoreCollectionService<ITcDbRefModel>(firestore, FirestoreCollection.TCS);
    this._assignmentsLogsCollectionService = new FirestoreCollectionService<IAssignmentLogDbRefModel>(firestore, FirestoreCollection.ASSIGNMENTS_LOGS);
  }

  ngOnInit(): void {
    this._initObservables();
  }

  edit(tc: IAssignmentTcModel) {
    this._modalController.create({
      component: AssignmentsFormTcModalComponent,
      componentProps: {
        title: this._translateService.instant('assignments.edit-tc'),
        assignmentId: this.assignmentId,
        tcId: tc.id
      },
      cssClass: 'modal',
      backdropDismiss: false
    }).then(modal => modal.present());
  }

  navigateBackToAssignment(): void {
    this._router.navigate([`assignments/form/${this.assignmentId}`]);
  }

  async delete(tc: IAssignmentTcModel) {
    const modal = await this._modalController.create({
      component: DeleteModalComponent,
      componentProps: {
        tcId: tc.id
      },
      cssClass: 'modal',
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      if (data)
        this._deleteTc(tc);
    });
    modal.present();
  }

  private _initObservables(): void {
    const routeParamsSubscription = this._activatedRoute.paramMap.subscribe({
      next: (paramMap) => this.assignmentId = paramMap.get('id')
    });
    const assignmentsSubscription = this._assignmentsObservableService.observable.subscribe({
      next: (value) => {
        if (this.assignmentId)
          this._checkIfAssignmentIsInObservable(value.data);
      }
    });
    this._subscriptions.push(routeParamsSubscription, assignmentsSubscription);
  }

  private _checkIfAssignmentIsInObservable(assignments: Array<IAssignmentModel>): void {
    const assignment = assignments.find(x => x.id === this.assignmentId);

    if (assignment)
      this.tcs = assignment.tcs;
    else
      this._getAssignment();
  }

  private _getAssignment(): void {

  }

  private _deleteTc(tc: IAssignmentTcModel) {
    this._tcsCollectionService.delete(tc.id).then(() => {
      this._assignmentsObservableService.deleteTc(this.assignmentId!, tc.id);
      
      const log = new AssignmentLogDbRef(undefined, this.assignmentId!, AssignmentLogType.TC_DELETED, tc.name);
      this._assignmentsLogsCollectionService.add(log).then(() => {
        const mappedLog = this._assignmentsMapperService.IAssignmentLogDbRefModelToIAssignmentLogModel(log);
        this._assignmentsObservableService.addLog(this.assignmentId!, mappedLog);
      }); 
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}