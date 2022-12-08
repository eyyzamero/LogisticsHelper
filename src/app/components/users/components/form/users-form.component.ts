import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { CommunicationState, FirestoreCollection, FormMode } from 'src/app/core/enums';
import { IRoleDbRefModel, IUserDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { config } from 'src/configs/config';
import { UsersMapperService } from '../../services/mapper/users-mapper.service';

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

  readonly CommunicationState = CommunicationState;

  private _mode: FormMode = FormMode.CREATE;
  private _userId: string = '';
  private _rolesCollectionService: FirestoreCollectionService<IRoleDbRefModel>;
  private _usersCollectionService: FirestoreCollectionService<IUserDbRefModel>;

  constructor(
    firestore: AngularFirestore,
    private _usersMapperService: UsersMapperService
  ) {
    this._rolesCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.ROLES);
    this._usersCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.USERS);
    this._getRoles();
  }

  submit() {
    if (this.form.valid) 
      this._mode === FormMode.CREATE ? this._addUser() : this._editUser(this.userId);
  }

  private _getUser() {
    this.communicationState = CommunicationState.LOADING;
    this._usersCollectionService.getByDocIdAsync(this._userId).then(user => {
      if (user) {
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
        Validators.required
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
    });
    return form;
  }

  private _getSecondaryAppInstance(): firebase.app.App  {
    const instance = firebase.initializeApp(config.firebase, "temporary")
    return instance;
  }

  private async _addUser() {
    const appInstance = this._getSecondaryAppInstance();

    const newUser = await appInstance.auth().createUserWithEmailAndPassword(
      this.form.controls['email'].value,
      this.form.controls['password'].value
    );
    const dbUser = this._usersMapperService.UsersFormGroupToIUserDbRefModel(this.form, newUser.user?.uid);
    await this._usersCollectionService.add(dbUser, newUser.user?.uid);
    this.closeModal.emit();
    appInstance.delete();
  }

  private _editUser(userId: string) {
    // const user = this._usersMapperService.UsersFormGroupToIUserDbRefModel(this.form);
    // this._usersCollectionService.update()
  }
}