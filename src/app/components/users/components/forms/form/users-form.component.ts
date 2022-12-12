import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { CommunicationState, FirestoreCollection, FormMode } from 'src/app/core/enums';
import { IRoleDbRefModel, IUserDbRefModel, RoleDbRefModel, UserDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { exactTo } from 'src/app/core/validators';
import { config } from 'src/configs/config';
import { UserManageService } from '../../../services/manage/user-manage.service';
import { UsersMapperService } from '../../../services/mapper/users-mapper.service';
import { UsersListObservableService } from '../../../services/observable/list/users-list-observable.service';

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
  roles: Array<IRoleDbRefModel> = new Array<IRoleDbRefModel>();
  communicationState: CommunicationState = CommunicationState.LOADED;
  errorMessage: string = '';

  readonly CommunicationState = CommunicationState;

  private _mode: FormMode = FormMode.CREATE;
  private _userId: string = '';
  private _initialUser: IUserDbRefModel = new UserDbRefModel();
  private _rolesCollectionService: FirestoreCollectionService<IRoleDbRefModel>;
  private _usersCollectionService: FirestoreCollectionService<IUserDbRefModel>;

  constructor(
    firestore: AngularFirestore,
    private _usersMapperService: UsersMapperService,
    private _usersListObservableService: UsersListObservableService,
    private _userManageService: UserManageService
  ) {
    this._rolesCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.ROLES);
    this._usersCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.USERS);
    this._getRoles();
  }

  submit() {
    this._clearErrorMessage();
    this.form.updateValueAndValidity();
    this.form.markAllAsTouched();

    if (this.form.valid)
      this._mode === FormMode.CREATE ? this._addUser() : this._editUser();
  }

  private _getUser() {
    this.communicationState = CommunicationState.LOADING;
    this._usersCollectionService.getByDocIdAsync(this._userId).then(user => {
      if (user) {
        this._initialUser = user;
        this.form.controls['nickname'].setValue(user.nickname);
        const role = this.roles.find(x => x.id === user.roleId)!;
        this.form.controls['role'].setValue(role);
        this.communicationState = CommunicationState.LOADED;
      }
    });
  }

  private async _getRoles() {
    const roles = await this._rolesCollectionService.getAll();

    if (roles)
      this.roles = roles;
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

  private _getSecondaryAppInstance(): firebase.app.App {
    const instance = firebase.initializeApp(config.firebase, "temporary")
    return instance;
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

    this._usersCollectionService.update(user).then(() => {
      const mappedUser = this._usersMapperService.IUserDbRefModelToIUserModel(user);
      this._usersListObservableService.editUser(mappedUser);
      this.closeModal.emit();
    });
  }

  private _clearErrorMessage(): void {
    this.errorMessage = '';
  }
}