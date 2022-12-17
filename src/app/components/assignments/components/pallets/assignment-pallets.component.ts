import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap, Subscription, take, tap } from 'rxjs';
import { CommunicationState, FirestoreCollection } from 'src/app/core/enums';
import { IPalletDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { IAssignmentModel, IAssignmentPalletModel } from '../../models';
import { AssignmentsObservableService } from '../../services/observable/assignments-observable.service';

@Component({
  selector: 'app-assignment-pallets',
  templateUrl: './assignment-pallets.component.html',
  styleUrls: ['./assignment-pallets.component.scss']
})
export class AssignmentPalletsComponent implements OnInit, OnDestroy {

  pallets: Array<IAssignmentPalletModel> = new Array<IAssignmentPalletModel>();
  communicationState: CommunicationState = CommunicationState.NONE;

  readonly CommunicationState = CommunicationState;

  private _assignmentId: string = '';
  private _palletsCollectionService: FirestoreCollectionService<IPalletDbRefModel>;
  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    firestore: AngularFirestore,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _assignmentsObservableService: AssignmentsObservableService
  ) {
    this._palletsCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.PALLETS);
  }

  ngOnInit(): void {
    this._initObservables();
  }
  
  navigateBackToAssignment(): void {
    this._router.navigate([`assignments/form/${this._assignmentId}`]);
  }

  delete(pallet: IAssignmentPalletModel): void {
    this._palletsCollectionService.delete(pallet.id).then(() => this._assignmentsObservableService.deletePallet(this._assignmentId, pallet));
  }

  private _navigateToPreviousPage(): void {
    this._router.navigate(['..'], {
      relativeTo: this._activatedRoute
    });
  }

  private _initObservables(): void {
    const routeParamsSubscription = this._activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const id = paramMap.get('id');
        if (id) {
          this._assignmentId = id;
          this._getData();
        } else
          this._navigateToPreviousPage();
      }
    });
    const assignmentSubscription = this._assignmentsObservableService.observable.pipe(
      tap(value => this.communicationState = value.communicationState),
      mergeMap(value => value.data),
      filter(value => value.id === this._assignmentId)
    ).subscribe({
      next: (value) => this.pallets = this._extractPalletsFromAssignment(value)
    });
    this._subscriptions.push(routeParamsSubscription, assignmentSubscription);
  }

  private _extractPalletsFromAssignment(value: IAssignmentModel): Array<IAssignmentPalletModel> {
    const pallets = value.tcs.reduce<Array<IAssignmentPalletModel>>((accumulator, current) => {
      accumulator.push(...current.pallets);
      return accumulator;
    }, new Array<IAssignmentPalletModel>());
    return pallets;
  }

  private _getData(): void {
    const assignmentInObservable = this._assignmentsObservableService.observableSubjectValue.data.find(x => x.id === this._assignmentId);

    if (assignmentInObservable)
      this.pallets = this._extractPalletsFromAssignment(assignmentInObservable);
    else
      this._getPalletsFromDb();
  }

  private _getPalletsFromDb(): void {

  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}