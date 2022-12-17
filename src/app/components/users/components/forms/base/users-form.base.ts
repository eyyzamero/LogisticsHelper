import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { FirestoreCollection } from 'src/app/core/enums';
import { IUserDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { IUserModel, UserModel } from '../../../models';

@Directive()
export abstract class BaseUsersForm {

  @Input() protected _user: IUserModel = new UserModel();

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  abstract form: FormGroup;

  protected _usersCollectionService: FirestoreCollectionService<IUserDbRefModel>;
  
  constructor(
    firestore: AngularFirestore
  ) {
    this._usersCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.USERS);
  }

  abstract submit(): void;

  protected abstract _formDefinition(): void;
}