import { Component, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IUserModel, UserModel } from '../../../models';
import { UsersChangePasswordFormComponent } from '../../forms/change-password/users-change-password-form.component';

@Component({
  selector: 'app-users-change-password-form-modal',
  templateUrl: './users-change-password-form-modal.component.html',
  styleUrls: ['./users-change-password-form-modal.component.scss']
})
export class UsersChangePasswordFormModalComponent {

  @ViewChild(UsersChangePasswordFormComponent, { static: false }) private _usersChangePasswordFormRef?: UsersChangePasswordFormComponent;

  @Input() title: string = '';
  @Input() user: IUserModel = new UserModel();

  constructor(
    private _modalController: ModalController
  ) { }

  close() {
    this._modalController.dismiss();
  }

  submit() {
    this._usersChangePasswordFormRef?.submit();
  }
}