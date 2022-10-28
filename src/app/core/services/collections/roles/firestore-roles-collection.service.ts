import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { IRoleDbRefModel } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreRolesCollectionService {

  private _collection = this._firestore.collection<IRoleDbRefModel>('roles');

  constructor(
    private _firestore: AngularFirestore
  ) { }

  async getRoleByDocIdAsync(roleDocId?: string): Promise<IRoleDbRefModel | undefined> {
    if (!roleDocId)
      return undefined;

    const user = await firstValueFrom(this._collection.doc(roleDocId).get());
    return user.data();
  }
}