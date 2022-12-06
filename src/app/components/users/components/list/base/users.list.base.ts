import { Directive, OnDestroy, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Subscription } from "rxjs";
import { CommunicationState, FirestoreCollection } from "src/app/core/enums";
import { IUserDbRefModel } from "src/app/core/models";
import { FirestoreCollectionService } from "src/app/core/services/collections/firestore-collection.service";
import { IUserModel } from "../../../models";
import { UsersListObservableService } from "../../../services/observable/list/users-list-observable.service";

@Directive()
export class BaseUsersList implements OnInit, OnDestroy {

  users: Array<IUserModel> = new Array<IUserModel>();
  communicationState: CommunicationState = CommunicationState.NONE;

  readonly CommunicationState = CommunicationState;

  private _usersCollectionService: FirestoreCollectionService<IUserDbRefModel>;
  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    firestore: AngularFirestore,
    private _authService: AngularFireAuth,
    private _usersListObservableService: UsersListObservableService
  ) {
    this._usersCollectionService = new FirestoreCollectionService<IUserDbRefModel>(firestore, FirestoreCollection.USERS);
  }

  ngOnInit(): void {
    this._initObservables();
  }

  edit(user: IUserModel) {

  }

  resetPassword(user: IUserModel) {

  }

  delete(user: IUserModel) {
    
  }

  private _initObservables() {
    const usersSubscription = this._usersListObservableService.observable.subscribe({
      next: (value) => {
        this.communicationState = value.communicationState;
        this.users = value.data;
      }
    });
    this._subscriptions.push(usersSubscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}