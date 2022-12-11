import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersFormComponent } from '../../forms/form/users-form.component';
import { BaseUsersFormModal } from '../base/users-form-modal.base';

@Component({
  selector: 'app-users-form-modal',
  templateUrl: './users-form-modal.component.html',
  styleUrls: ['./users-form-modal.component.scss']
})
export class UsersFormModalComponent extends BaseUsersFormModal {

  @ViewChild(UsersFormComponent, { static: false }) private _usersFormRef?: UsersFormComponent;

  constructor(
    modalController: ModalController
  ) {
    super(modalController);
  }

  submit() {
    this._usersFormRef?.submit();
  }
}