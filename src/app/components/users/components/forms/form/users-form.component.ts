import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormMode } from 'src/app/core/enums';
import { IUserDbRefModel, IUserRoleModel, RoleDbRefModel, UserDbRefModel } from 'src/app/core/models';
import { LoadingObservableService } from 'src/app/core/services/observable/loading/loading-observable.service';
import { UserRolesObservableService } from 'src/app/core/services/observable/roles/user-roles-observable.service';
import { exactTo } from 'src/app/core/validators';
import { UserManageService } from '../../../services/manage/user-manage.service';
import { UsersMapperService } from '../../../services/mapper/users-mapper.service';
import { BaseUsersForm } from '../base/users-form.base';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent extends BaseUsersForm {

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

  form: FormGroup = this._formDefinition();
  roles: Array<IUserRoleModel> = this._userRolesObservableService.observableSubjectValue.data;

  private _mode: FormMode = FormMode.CREATE;
  private _userId: string = '';
  private _initialUser: IUserDbRefModel = new UserDbRefModel();

  constructor(
    firestore: AngularFirestore,
    private _usersMapperService: UsersMapperService,
    private _userManageService: UserManageService,
    private _userRolesObservableService: UserRolesObservableService,
    private _loadingObservableService: LoadingObservableService
  ) {
    super(firestore);
  }

  submit(): void {
    this._clearErrorMessage();
    this.form.updateValueAndValidity();
    this.form.markAllAsTouched();

    if (this.form.valid)
      this._mode === FormMode.CREATE ? this._addUser() : this._editUser();
  }

  private _getUser(): void {
    this._loadingObservableService.show();
    this._userManageService.getUser(
      this._userId,
      (user: IUserDbRefModel) => {
        this._initialUser = user;
        this.form.controls['nickname'].setValue(user.nickname);
        const role = this.roles.find(x => x.id === user.roleId)!;
        this.form.controls['role'].setValue(role);
        this._loadingObservableService.hide();
      },
      (errorMessage: string) => {
        this._loadingObservableService.hide();
        this.errorMessage = errorMessage;
      }
    );
  }

  protected _formDefinition(): FormGroup {
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
        Validators.minLength(this.PASSWORD_MIN_LENGTH),
        Validators.maxLength(this.PASSWORD_MAX_LENGTH)
      ]),
      passwordConfirm: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.PASSWORD_MIN_LENGTH),
        Validators.maxLength(this.PASSWORD_MAX_LENGTH)
      ]),
      role: new FormControl(null, [
        Validators.required
      ])
    }, {
      validators: exactTo('password', 'passwordConfirm')
    });
    return form;
  }

  private _addUser(): void {
    const user = this._usersMapperService.UsersFormGroupToIUserDbRefModel(this.form, this._userId);
    this._loadingObservableService.show();
    this._userManageService.addUser(
      user,
      () => {
        this._loadingObservableService.hide();
        this.closeModal.emit();
      },
      (errorMessage: string) => {
        this._loadingObservableService.hide();
        this.errorMessage = errorMessage;
      }
    );
  }

  private _editUser(): void {
    let user = this._initialUser;
    user.nickname = this.form.controls['nickname'].value;
    user.roleId = (this.form.controls['role'].value as RoleDbRefModel).id;

    this._loadingObservableService.show();
    this._userManageService.editUser(
      user,
      () => {
        this._loadingObservableService.hide();
        this.closeModal.emit();
      },
      (errorMessage: string) => {
        this._loadingObservableService.hide();
        this.errorMessage = errorMessage;
      }
    );
  }

  private _clearErrorMessage(): void {
    this.errorMessage = '';
  }
}