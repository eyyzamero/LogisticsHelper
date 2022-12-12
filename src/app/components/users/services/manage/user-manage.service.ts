import { Injectable } from '@angular/core';
import { IUserDbRefModel } from 'src/app/core/models';
import firebase from 'firebase/compat/app';
import { config } from 'src/configs/config';
import { CryptoService } from 'src/app/core/services/crypto/crypto.service';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreCollection } from 'src/app/core/enums';
import { UsersMapperService } from '../mapper/users-mapper.service';
import { UsersListObservableService } from '../observable/list/users-list-observable.service';
import { FirestoreAuthErrorCode } from '../../enums';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  private _usersCollectionService: FirestoreCollectionService<IUserDbRefModel>;

  constructor(
    firestore: AngularFirestore,
    private _cryptoService: CryptoService,
    private _usersMapperService: UsersMapperService,
    private _usersListObservableService: UsersListObservableService
  ) {
    this._usersCollectionService = new FirestoreCollectionService<IUserDbRefModel>(firestore, FirestoreCollection.USERS);
  }

  addUser(user: IUserDbRefModel, onSuccess?: Function, onError?: Function): void {
    const appInstance = this._getSecondaryAppInstance();

    appInstance.auth().createUserWithEmailAndPassword(
      user.email,
      this._cryptoService.decrypt(user.password)
    ).then(authUser => {
      this._usersCollectionService.add(user, authUser.user?.uid).then(() => {
        const mappedUser = this._usersMapperService.IUserDbRefModelToIUserModel(user);
        this._usersListObservableService.addUser(mappedUser);
        appInstance.delete();

        if (onSuccess)
          onSuccess();
      });
    }).catch(e => {
      appInstance.delete();

      if (onError) {
        let errorMessage: string = '';

        switch (e.code) {
          case FirestoreAuthErrorCode.EMAIL_ALREADY_IN_USE:
            errorMessage = 'Email is already in use!';
            break;
          case FirestoreAuthErrorCode.WEAK_PASSWORD:
            errorMessage = 'Password is too weak!';
            break;
          default:
            errorMessage = 'Something went wrong!';
            break;
        }

        onError(errorMessage);
      }
    });
  }

  private _getSecondaryAppInstance(): firebase.app.App {
    const instance = firebase.initializeApp(config.firebase, "temporary");
    return instance;
  }
}