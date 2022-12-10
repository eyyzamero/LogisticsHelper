import { Component, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersFormComponent } from '../../forms/form/users-form.component';

@Component({
  selector: 'app-users-form-modal',
  templateUrl: './users-form-modal.component.html',
  styleUrls: ['./users-form-modal.component.scss']
})
export class UsersFormModalComponent {

  @ViewChild(UsersFormComponent, { static: false }) private _usersFormRef?: UsersFormComponent;

  @Input() title: string = '';
  @Input() userId: string = '';

  constructor(
    private _modalController: ModalController
  ) { }

  close() {
    this._modalController.dismiss();
  }

  submit() {
    this._usersFormRef?.submit();
  }
}