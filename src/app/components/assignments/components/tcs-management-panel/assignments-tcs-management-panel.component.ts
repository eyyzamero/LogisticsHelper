import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IAssignmentModel, IAssignmentTcModel } from '../../models';
import { AssignmentsObservableService } from '../../services/observable/assignments-observable.service';
import { AssignmentsFormTcModalComponent } from '../form/components/modals/add-tcs/assignments-form-tc-modal.component';

@Component({
  selector: 'app-assignments-tcs-management-panel',
  templateUrl: './assignments-tcs-management-panel.component.html',
  styleUrls: ['./assignments-tcs-management-panel.component.scss'],
})
export class AssignmentsTcsManagementPanelComponent implements OnInit, OnDestroy {

  tcs: Array<IAssignmentTcModel> = new Array<IAssignmentTcModel>();

  private _assignmentId: string | null = null;
  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private _translateService: TranslateService,
    private _activatedRoute: ActivatedRoute,
    private _assignmentsObservableService: AssignmentsObservableService,
    private _modalController: ModalController
  ) { }

  ngOnInit(): void {
    this._initObservables();
  }

  edit(tc: IAssignmentTcModel) {
    this._modalController.create({
      component: AssignmentsFormTcModalComponent,
      componentProps: {
        title: this._translateService.instant('assignments.edit-tc'),
        assignmentId: this._assignmentId,
        tcId: tc.id
      },
      cssClass: 'modal',
      backdropDismiss: false
    }).then(modal => modal.present());
  }

  delete(tc: IAssignmentTcModel) {

  }

  private _initObservables(): void {
    const routeParamsSubscription = this._activatedRoute.paramMap.subscribe({
      next: (paramMap) => this._assignmentId = paramMap.get('id')
    });
    const assignmentsSubscription = this._assignmentsObservableService.observable.subscribe({
      next: (value) => {
        if (this._assignmentId)
          this._checkIfAssignmentIsInObservable(value.data);
      }
    });
    this._subscriptions.push(routeParamsSubscription, assignmentsSubscription);
  }

  private _checkIfAssignmentIsInObservable(assignments: Array<IAssignmentModel>): void {
    const assignment = assignments.find(x => x.id === this._assignmentId);

    if (assignment)
      this.tcs = assignment.tcs;
    else
      this._getAssignment();
  }

  private _getAssignment(): void {

  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}