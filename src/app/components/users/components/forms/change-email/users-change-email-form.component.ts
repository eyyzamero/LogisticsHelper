import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreCollection } from 'src/app/core/enums';
import { IUserDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { IUserModel, UserModel } from '../../../models';
import firebase from 'firebase/compat/app';
import { config } from 'src/configs/config';
import { CryptoService } from 'src/app/core/services/crypto/crypto.service';
import { UsersListObservableService } from '../../../services/observable/list/users-list-observable.service';

@Component({
  selector: 'app-users-change-email-form',
  templateUrl: './users-change-email-form.component.html',
  styleUrls: ['./users-change-email-form.component.scss'],
})
export class UsersChangeEmailFormComponent {

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
    if (this.form.valid) {
      const temporaryAppInstance = firebase.initializeApp(config.firebase, "temporary");
      const passwordDecrypted = this._cryptoService.decrypt(this._user.password);
      const email = this.form.controls['email'].value;

      temporaryAppInstance.auth()
        .signInWithEmailAndPassword(this._user.email, passwordDecrypted)
        .then(user => {
          user.user?.updateEmail(email).then(() => {
            this._usersCollectionService.updateProperty(this._user.id, 'email', email).then(() => {
              this._usersListObservableService.changeEmail(this._user.id, email);
              temporaryAppInstance.delete();
              this.closeModal.emit();
            });
          })
        });
    }
  }

  private _formDefinition(): FormGroup {
    const form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
    });
    return form;
  }
}
