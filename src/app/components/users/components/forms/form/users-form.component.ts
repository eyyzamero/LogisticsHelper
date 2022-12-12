import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunicationState, FormMode } from 'src/app/core/enums';
import { IUserDbRefModel, IUserRoleModel, RoleDbRefModel, UserDbRefModel } from 'src/app/core/models';
import { UserRolesObservableService } from 'src/app/core/services/observable/roles/user-roles-observable.service';
import { exactTo } from 'src/app/core/validators';
import { UserManageService } from '../../../services/manage/user-manage.service';
import { UsersMapperService } from '../../../services/mapper/users-mapper.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent {

  @ViewChild('formRef', { static: true }) formRef?: HTMLFormElement;

  @Input() set userId(value: string) {
    if (value) {
      this._mode = FormMode.EDIT;
      this._userId = value;
      this._getUser();

      setTimeout(() => {
        this.form.removeControl('email');
        this.form.removeControl('password');
        this.form.removeControl('passwordConfirm');
      });
    }
  }
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup = this._formDefinition();
  roles: Array<IUserRoleModel> = this._userRolesObservableService.observableSubjectValue.data;
  communicationState: CommunicationState = CommunicationState.LOADED;
  errorMessage: string = '';

  readonly CommunicationState = CommunicationState;

  private _mode: FormMode = FormMode.CREATE;
  private _userId: string = '';
  private _initialUser: IUserDbRefModel = new UserDbRefModel();

  constructor(
    private _usersMapperService: UsersMapperService,
    private _userManageService: UserManageService,
    private _userRolesObservableService: UserRolesObservableService
  ) { }

  submit() {
    this._clearErrorMessage();
    this.form.updateValueAndValidity();
    this.form.markAllAsTouched();

    if (this.form.valid)
      this._mode === FormMode.CREATE ? this._addUser() : this._editUser();
  }

  private _getUser() {
    this.communicationState = CommunicationState.LOADING;
    this._userManageService.getUser(
      this._userId,
      (user: IUserDbRefModel) => {
        this._initialUser = user;
        this.form.controls['nickname'].setValue(user.nickname);
        const role = this.roles.find(x => x.id === user.roleId)!;
        this.form.controls['role'].setValue(role);
        this.communicationState = CommunicationState.LOADED;
      },
      (errorMessage: string) => this.errorMessage = errorMessage
    );
  }

  private _formDefinition(): FormGroup {
    const form = new FormGroup({
      nickname: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]),
      passwordConfirm: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]),
      role: new FormControl(null, [
        Validators.required
      ])
    }, {
      validators: exactTo('password', 'passwordConfirm')
    });
    return form;
  }

  private _addUser() {
    const user = this._usersMapperService.UsersFormGroupToIUserDbRefModel(this.form, this._userId);
    this._userManageService.addUser(
      user,
      () => this.closeModal.emit(),
      (errorMessage: string) => this.errorMessage = errorMessage 
    );
  }

  private _editUser() {
    let user = this._initialUser;
    user.nickname = this.form.controls['nickname'].value;
    user.roleId = (this.form.controls['role'].value as RoleDbRefModel).id;

    this._userManageService.editUser(
      user,
      () => this.closeModal.emit(),
      (errorMessage: string) => this.errorMessage = errorMessage
    );
  }

  private _clearErrorMessage(): void {
    this.errorMessage = '';
  }
}