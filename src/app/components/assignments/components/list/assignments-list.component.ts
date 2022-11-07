import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunicationState, FirestoreCollection } from 'src/app/core/enums';
import { IAssignmentDbRefModel, ITcDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { AuthObservableService } from 'src/app/core/services/observable/auth/auth-observable.service';
import { IAssignmentModel } from '../../models';
import { AssignmentsMapperService } from '../../services/mapper/assignments-mapper.service';
import { AssignmentsObservableService } from '../../services/observable/assignments-observable.service';

@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.scss'],
})
export class AssignmentsListComponent implements OnInit, OnDestroy {
  
  assignments: Array<IAssignmentModel> = new Array<IAssignmentModel>();
  communicationState: CommunicationState = CommunicationState.NONE;

  readonly CommunicationState = CommunicationState;

  private _assignmentsCollectionService: FirestoreCollectionService<IAssignmentDbRefModel>;
  private _tcsCollectionService: FirestoreCollectionService<ITcDbRefModel>;
  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    firestore: AngularFirestore,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authObservableService: AuthObservableService,
    private _assignmentsObservableService: AssignmentsObservableService,
    private _assignmentsMapperService: AssignmentsMapperService
  ) {
    this._assignmentsCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.ASSIGNMENTS);
    this._tcsCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.TCS);
    this._getAssignments();
  }

  ngOnInit(): void {
    this._initObservables();
  }

  navigateToForm(assignmentId: string) {
    this._router.navigate([`./form/${assignmentId}`], {
      relativeTo: this._activatedRoute
    });
  }

  moveToHistory(assignmentId: string) {

  }

  delete(assignmentId: string) {

  }

  private _initObservables(): void {
    const assignmentsSubscription = this._assignmentsObservableService.observable.subscribe({
      next: (value) => {
        this.assignments = value.data;
        this.communicationState = value.communicationState;
      }
    });
    this._subscriptions.push(assignmentsSubscription);
  }

  private async _getAssignments(): Promise<void> {
    this._assignmentsObservableService.clearWithoutNext();
    this._assignmentsObservableService.addCommunicationState(CommunicationState.LOADING);
    const userId = this._authObservableService.observableSubjectValue.data?.id;
    const assignments = await this._assignmentsCollectionService.getByUserRef(userId);

    if (assignments) {
      let mappedAssignments = this._assignmentsMapperService.ArrayOfIAssignmentDbRefModelToArrayOfIAssignmentModel(assignments);
      this._assignmentsObservableService.addWithoutNext(mappedAssignments);

      Promise.all(assignments.map(assignment => this._getTcs(assignment.id))).then(
        () => this._assignmentsObservableService.next()
      );
    }
  }

  private async _getTcs(assignmentId: string): Promise<void> {
    const tcs = await this._tcsCollectionService.getWhereFieldEqualsValue('assignmentId', assignmentId);
    const mappedTcs = this._assignmentsMapperService.ArrayOfITcDbRefToArrayOfIAssignmentTcModel(tcs);
    this._assignmentsObservableService.addTcsWithoutNext(assignmentId, mappedTcs);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}
