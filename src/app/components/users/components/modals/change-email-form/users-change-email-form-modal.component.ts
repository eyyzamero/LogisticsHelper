import { Component, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IUserModel, UserModel } from '../../../models';
import { UsersChangeEmailFormComponent } from '../../forms/change-email/users-change-email-form.component';

@Component({
  selector: 'app-users-change-email-form-modal',
  templateUrl: './users-change-email-form-modal.component.html',
  styleUrls: ['./users-change-email-form-modal.component.scss'],
})
export class UsersChangeEmailFormModalComponent {

  @ViewChild(UsersChangeEmailFormComponent, { static: false }) private _usersChangeEmailFormRef?: UsersChangeEmailFormComponent;

  @Input() title: string = '';
  @Input() user: IUserModel = new UserModel();

  constructor(
    private _modalController: ModalController
  ) { }

  close() {
    this._modalController.dismiss();
  }

  submit() {
    this._usersChangeEmailFormRef?.submit();
  }
}
