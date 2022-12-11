import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersChangeEmailFormComponent } from '../../forms/change-email/users-change-email-form.component';
import { BaseUsersFormModal } from '../base/users-form-modal.base';

@Component({
  selector: 'app-users-change-email-form-modal',
  templateUrl: './users-change-email-form-modal.component.html',
  styleUrls: ['./users-change-email-form-modal.component.scss']
})
export class UsersChangeEmailFormModalComponent extends BaseUsersFormModal {

  @ViewChild(UsersChangeEmailFormComponent, { static: false }) private _usersChangeEmailFormRef?: UsersChangeEmailFormComponent;

  constructor(
    modalController: ModalController
  ) {
    super(modalController);
  }

  submit() {
    this._usersChangeEmailFormRef?.submit();
  }
}