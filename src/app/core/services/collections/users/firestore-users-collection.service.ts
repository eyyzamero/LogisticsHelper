import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { IUserDbRefModel } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreUsersCollectionService {

  private _collection = this._firestore.collection<IUserDbRefModel>('users');

  constructor(
    private _firestore: AngularFirestore
  ) { }

  async getUserByDocIdAsync(userDocId?: string): Promise<IUserDbRefModel | undefined> {
    if (!userDocId)
      return undefined;

    const user = await firstValueFrom(this._collection.doc(userDocId).get());
    return user.data();
  }
}