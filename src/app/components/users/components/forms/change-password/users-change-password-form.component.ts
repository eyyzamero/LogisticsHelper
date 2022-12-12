import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { FirestoreCollection } from 'src/app/core/enums';
import { IUserDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { CryptoService } from 'src/app/core/services/crypto/crypto.service';
import { exactTo } from 'src/app/core/validators';
import { config } from 'src/configs/config';
import { IUserModel, UserModel } from '../../../models';
import { UsersListObservableService } from '../../../services/observable/list/users-list-observable.service';

@Component({
  selector: 'app-users-change-password-form',
  templateUrl: './users-change-password-form.component.html',
  styleUrls: ['./users-change-password-form.component.scss']
})
export class UsersChangePasswordFormComponent {

  @Input() private _user: IUserModel = new UserModel();

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup = this._formDefinition();

  private _usersCollectionService: FirestoreCollectionService<IUserDbRefModel>;

  constructor(
    firestore: AngularFirestore,
    private _cryptoService: CryptoService,
    private _usersListObservableService: UsersListObservableService
  ) {
    this._usersCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.USERS);
  }

  submit(): void {
    const temporaryAppInstance = firebase.initializeApp(config.firebase, "temporary");

    const oldPasswordDecrypted = this._cryptoService.decrypt(this._user.password);
    const newPasswordNotEncrypted = this.form.controls['password'].value;
    const newPasswordEncrypted = this._cryptoService.encrypt(newPasswordNotEncrypted);

    temporaryAppInstance.auth()
      .signInWithEmailAndPassword(this._user.email, oldPasswordDecrypted)
      .then(user => {
        user.user?.updatePassword(newPasswordNotEncrypted).then(() => {
          this._usersCollectionService.updateProperty(this._user.id, 'password', newPasswordEncrypted).then(() => {
            this._usersListObservableService.updatePassword(this._user.id, newPasswordEncrypted);
            temporaryAppInstance.delete();
            this.closeModal.emit();
          });
        })
      });
  }

  private _formDefinition(): FormGroup {
    const form = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]),
      passwordConfirm: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ])
    }, { 
      validators: exactTo('password', 'passwordConfirm')
    });
    return form;
  }
}