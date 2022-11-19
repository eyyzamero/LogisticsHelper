import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { IonAccordionGroup } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CommunicationState, FirestoreCollection } from 'src/app/core/enums';
import { IAssignmentDbRefModel, IPalletDbRefModel, ITcDbRefModel, IUserDbRefModel } from 'src/app/core/models';
import { AssignmentDbRefModel } from 'src/app/core/models/collections/assignments/assignment-db-ref.model';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { AuthObservableService } from 'src/app/core/services/observable/auth/auth-observable.service';
import { AssignmentStatus } from '../../enums';
import { IAssignmentModel } from '../../models';
import { AssignmentsMapperService } from '../../services/mapper/assignments-mapper.service';
import { AssignmentsObservableService } from '../../services/observable/assignments-observable.service';

@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.scss']
})
export class AssignmentsListComponent implements OnInit, OnDestroy {
  
  @ViewChild('accordionGroup', { static: false }) accordionGroupRef!: IonAccordionGroup;
  
  get assignments(): Array<IAssignmentModel> {
    return this._assignments.filter(x => x.status === this.status);
  }

  status: AssignmentStatus = AssignmentStatus.ACTIVE;
  statuses: Array<string> = Object.values(AssignmentStatus);
  communicationState: CommunicationState = CommunicationState.NONE;

  readonly CommunicationState = CommunicationState;

  private _assignments: Array<IAssignmentModel> = new Array<IAssignmentModel>();
  private _openedAssignmentAccordions: Array<string> = new Array<string>();
  private _assignmentsCollectionService: FirestoreCollectionService<IAssignmentDbRefModel>;
  private _tcsCollectionService: FirestoreCollectionService<ITcDbRefModel>;
  private _palletsCollectionService: FirestoreCollectionService<IPalletDbRefModel>;
  private _usersCollectionService: FirestoreCollectionService<IUserDbRefModel>;
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
    this._palletsCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.PALLETS);
    this._usersCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.USERS);
    this._getAssignments();
  }

  ngOnInit(): void {
    this._initObservables();
  }

  async create(): Promise<void> {
    const id = await this._createNewUniqueAssignmentId();
    const currentUserDocRef = this._usersCollectionService.getDocRefByDocId(this._authObservableService.observableSubjectValue.data!.id)!;
    const assignment = new AssignmentDbRefModel(id, AssignmentStatus.ACTIVE, currentUserDocRef);
    this._assignmentsCollectionService.add(assignment, id).then(() => {
      const mappedAssignment = this._assignmentsMapperService.IAssignmentDbRefModelToIAssignmentModel(assignment);
      this._assignmentsObservableService.addAssignment(mappedAssignment);
      this.navigateToForm(id);
    });
  }

  navigateToForm(assignmentId: string): void {
    this._router.navigate([`./form/${assignmentId}`], {
      relativeTo: this._activatedRoute
    });
  }

  moveToHistory(assignmentId: string): void {
    this._assignmentsCollectionService.updateProperty(assignmentId, 'status', AssignmentStatus.HISTORY).then(
      () => this._assignmentsObservableService.setStatus(assignmentId, AssignmentStatus.HISTORY)
    );
  }

  delete(assignmentId: string): void {
    this._assignmentsCollectionService.delete(assignmentId).then(
      () => this._assignmentsObservableService.delete(assignmentId)
    );
  }

  getOverallPercentage(assignment: IAssignmentModel): string {
    const count = assignment.tcs.reduce<number>((tcAccumulator, currentTc) => {
      const inners = currentTc.pallets.reduce<number>((palletAccumulator, currentPallet) => {
        return palletAccumulator + currentPallet.inners;
      }, 0);
      return tcAccumulator + inners;
    }, 0);

    const limit = assignment.tcs.reduce<number>((accumulator, current) => {
      return accumulator + current.limit;
    }, 0);

    return isNaN(count / limit) ? '0' : (count / limit).toFixed(2);
  }

  toggleAccordion(id: string) {
    const index = this._openedAssignmentAccordions.findIndex(x => x === id);
    index > -1 ? this._openedAssignmentAccordions.splice(index, 1) : this._openedAssignmentAccordions.push(id);
  }

  private _initObservables(): void {
    const assignmentsSubscription = this._assignmentsObservableService.observable.subscribe({
      next: (value) => {
        this._assignments = value.data;
        this.communicationState = value.communicationState;

        if (this.accordionGroupRef)
          this.accordionGroupRef.value = this._openedAssignmentAccordions;
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

      Promise.all(assignments.map(assignment => this._getTcsAndPallets(assignment.id))).then(
        () => this._assignmentsObservableService.next()
      );
    }
  }

  private async _getTcsAndPallets(assignmentId: string): Promise<void> {
    const tcs = await this._tcsCollectionService.getWhereFieldEqualsValue('assignmentId', assignmentId);
    const mappedTcs = this._assignmentsMapperService.ArrayOfITcDbRefToArrayOfIAssignmentTcModel(tcs);
    this._assignmentsObservableService.addTcsWithoutNext(assignmentId, mappedTcs);

    const pallets = await this._palletsCollectionService.getWhereFieldEqualsValue('assignmentId', assignmentId);
    const mappedPallets = this._assignmentsMapperService.ArrayOfIPalletDbRefToArrayOfIAssignmentPalletModel(pallets);
    this._assignmentsObservableService.addPalletsToTcsWithoutNext(assignmentId, mappedPallets);
  }

  private async _createNewUniqueAssignmentId(): Promise<string> {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth()).padStart(2, '0');
    const year = date.getFullYear();
    const suffix = Math.random().toString().substring(2, 9);
    const id = `${day}_${month}_${year}_${suffix}`;
    const assignmentWithCreatedIdNotExists = (await this._assignmentsCollectionService.getByDocIdAsync(id)) === undefined;

    return assignmentWithCreatedIdNotExists ? id : this._createNewUniqueAssignmentId();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}
