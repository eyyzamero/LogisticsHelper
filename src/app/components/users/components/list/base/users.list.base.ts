import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { CommunicationState, UserRole } from "src/app/core/enums";
import { IUserModel } from "../../../models";
import { UsersListObservableService } from "../../../services/observable/list/users-list-observable.service";
import { UsersChangeEmailFormModalComponent } from "../../modals/change-email-form/users-change-email-form-modal.component";
import { UsersChangePasswordFormModalComponent } from "../../modals/users-change-password/users-change-password-form-modal.component";
import { UsersFormModalComponent } from "../../modals/users-form/users-form-modal.component";

@Directive()
export class BaseUsersList implements OnInit, OnDestroy {

  get users(): Array<IUserModel> {
    return this._sortByRoles(this._users);
  }

  communicationState: CommunicationState = CommunicationState.NONE;

  readonly CommunicationState = CommunicationState;

  private _users: Array<IUserModel> = new Array<IUserModel>();
  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private _usersListObservableService: UsersListObservableService,
    private _modalController: ModalController,
    private _translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this._initObservables();
  }

  edit(user: IUserModel) {
    this._modalController.create({
      component: UsersFormModalComponent,
      componentProps: {
        title: this._translateService.instant('users.edit'),
        userId: user.id
      },
      cssClass: 'modal',
      backdropDismiss: false
    }).then(modal => modal.present()); 
  }

  changePassword(user: IUserModel) {
    this._modalController.create({
      component: UsersChangePasswordFormModalComponent,
      componentProps: {
        title: `${this._translateService.instant('users.change-password-for')}: ${user.email}`,
        user: user
      },
      cssClass: 'modal',
      backdropDismiss: false
    }).then(modal => modal.present());
  }

  changeEmail(user: IUserModel) {
    this._modalController.create({
      component: UsersChangeEmailFormModalComponent,
      componentProps: {
        title: `${this._translateService.instant('users.change-email-for')}: ${user.email}`,
        user: user
      },
      cssClass: 'modal',
      backdropDismiss: false
    }).then(modal => modal.present());
  }

  delete(user: IUserModel) {

  }

  private _initObservables() {
    const usersSubscription = this._usersListObservableService.observable.subscribe({
      next: (value) => {
        this.communicationState = value.communicationState;
        this._users = value.data;
      }
    });
    this._subscriptions.push(usersSubscription);
  }

  private _sortByRoles(users: Array<IUserModel>) {
    const sortedUsers = users.sort((a, b) => {
      const enumEntries = Object.values(UserRole);
      return enumEntries.indexOf(a.role) - enumEntries.indexOf(b.role);
    });
    return sortedUsers;
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}