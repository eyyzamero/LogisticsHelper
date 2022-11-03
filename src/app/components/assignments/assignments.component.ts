import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IonAccordionGroup } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CommunicationState, FirestoreCollection } from 'src/app/core/enums';
import { IAssignmentDbRefModel, ITcDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { AuthObservableService } from 'src/app/core/services/observable/auth/auth-observable.service';
import { IAssignmentModel } from './models';
import { AssignmentsMapperService } from './services/mapper/assignments-mapper.service';
import { AssignmentsObservableService } from './services/observable/assignments-observable.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'] 
})
export class AssignmentsComponent implements OnInit, OnDestroy {

  @ViewChild('accordionGroup', { static: true }) accordionGroup!: IonAccordionGroup;
  
  assignments: Array<IAssignmentModel> = new Array<IAssignmentModel>();
  communicationState: CommunicationState = CommunicationState.NONE;

  readonly CommunicationState = CommunicationState;

  private _assignmentsCollectionService: FirestoreCollectionService<IAssignmentDbRefModel>;
  private _tcsCollectionService: FirestoreCollectionService<ITcDbRefModel>;
  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    firestore: AngularFirestore,
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