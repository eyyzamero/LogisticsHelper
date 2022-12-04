import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { FirestoreCollection, FormMode } from 'src/app/core/enums';
import { IRoleDbRefModel, IUserDbRefModel, UserDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { config } from 'src/configs/config';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  @ViewChild('formRef', { static: true }) formRef?: HTMLFormElement;

  @Input() userId: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup = this._formDefinition();
  roles: Array<IRoleDbRefModel> = new Array<IRoleDbRefModel>();

  private _mode: FormMode = FormMode.CREATE;
  private _rolesCollectionService: FirestoreCollectionService<IRoleDbRefModel>;
  private _usersCollectionService: FirestoreCollectionService<IUserDbRefModel>;

  constructor(
    firestore: AngularFirestore
  ) {
    this._rolesCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.ROLES);
    this._usersCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.USERS);
  }

  ngOnInit(): void {
    this._getRoles();
  }

  submit() {
    if (this.form.valid) 
      this._mode === FormMode.CREATE ? this._addUser() : this._editUser(this.userId);
  }

  private async _getRoles() {
    const roles = await this._rolesCollectionService.getAll();

    if (roles)
      this.roles = roles;
  }

  private _formDefinition(): FormGroup {
    return new FormGroup({
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
    const dbUser = new UserDbRefModel(
      newUser.user?.uid,
      this.form.controls['email'].value,
      (this.form.controls['role'].value as IRoleDbRefModel).id
    );
    await this._usersCollectionService.add(dbUser, newUser.user?.uid);
    this.closeModal.emit();
    appInstance.delete();
  }

  private _editUser(userId: string) {

  }
}