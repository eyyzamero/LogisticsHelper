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
import { IUserModel } from '../../models';

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

  getUser(userId: string, onSuccess?: Function, onError?: Function): void {
    this._usersCollectionService.getByDocIdAsync(userId).then(user => {
      if (user && onSuccess)
        onSuccess(user);
      else
        onError ? onError('Something went wrong!') : null
    }).catch(() => onError ? onError('Something went wrong!') : null);
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

  editUser(user: IUserDbRefModel, onSuccess?: Function, onError?: Function): void {
    this._usersCollectionService.update(user).then(() => {
      const mappedUser = this._usersMapperService.IUserDbRefModelToIUserModel(user);
      this._usersListObservableService.editUser(mappedUser);

      if (onSuccess)
        onSuccess();
    }).catch(e => onError ? onError('Something went wrong!') : null);
  }

  deleteUser(user: IUserModel, onSuccess?: Function, onError?: Function): void {
    const appInstance = this._getSecondaryAppInstance();

    appInstance.auth().signInWithEmailAndPassword(
      user.email,
      this._cryptoService.decrypt(user.password)
    ).then(authUser => {
      authUser.user?.delete().then(() => {
        appInstance.delete();

        this._usersCollectionService.delete(user.id).then(() => {
          this._usersListObservableService.deleteUser(user.id);

          if (onSuccess)
            onSuccess();
        }).catch(() => onError ? onError('Something went wrong!') : null)
      }).catch(() => {
        appInstance.delete();

        if (onError)
          onError('Something went wrong!');
      });
    }).catch(() => {
      appInstance.delete();

      if (onError)
        onError('Something went wrong!');
    });
  }

  changeUserPassword(user: IUserModel, newPasswordNotEncrypted: string, onSuccess?: Function, onError?: Function) {
    const appInstance = this._getSecondaryAppInstance();

    appInstance.auth().signInWithEmailAndPassword(
      user.email,
      this._cryptoService.decrypt(user.password)
    ).then(authUser => {
      const newPasswordEncrypted = this._cryptoService.encrypt(newPasswordNotEncrypted);

      authUser.user?.updatePassword(newPasswordNotEncrypted).then(() => {
        this._usersCollectionService.updateProperty(user.id, 'password', newPasswordEncrypted).then(() => {
          this._usersListObservableService.updatePassword(user.id, newPasswordEncrypted);
          appInstance.delete();

          if (onSuccess)
            onSuccess();
        }).catch(() => {
          appInstance.delete();

          if (onError)
            onError('Something went wrong!');
        })
      }).catch(() => {
        appInstance.delete();

        if (onError)
          onError('Something went wrong!');
      })
    }).catch(() => {
      appInstance.delete();

      if (onError)
        onError('Something went wrong!');
    });
  }

  private _getSecondaryAppInstance(): firebase.app.App {
    const instance = firebase.initializeApp(config.firebase, 'temporary');
    return instance;
  }
}