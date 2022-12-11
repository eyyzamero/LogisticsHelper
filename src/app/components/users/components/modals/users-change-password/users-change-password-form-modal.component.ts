import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersChangePasswordFormComponent } from '../../forms/change-password/users-change-password-form.component';
import { BaseUsersFormModal } from '../base/users-form-modal.base';

@Component({
  selector: 'app-users-change-password-form-modal',
  templateUrl: './users-change-password-form-modal.component.html',
  styleUrls: ['./users-change-password-form-modal.component.scss']
})
export class UsersChangePasswordFormModalComponent extends BaseUsersFormModal {

  @ViewChild(UsersChangePasswordFormComponent, { static: false }) private _usersChangePasswordFormRef?: UsersChangePasswordFormComponent;

  constructor(
    modalController: ModalController
  ) {
    super(modalController);
  }

  submit() {
    this._usersChangePasswordFormRef?.submit();
  }
}