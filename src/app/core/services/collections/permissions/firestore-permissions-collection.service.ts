import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { documentId } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { IPermissionDbRefModel } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class FirestorePermissionsCollectionService {

  constructor(
    private _firestore: AngularFirestore
  ) { }

  async getPermissionsByDocIds(permissionsDocIds?: Array<string>): Promise<Array<IPermissionDbRefModel> | undefined> {
    if (!permissionsDocIds || !permissionsDocIds?.length)
      return undefined;

    const permissions = await firstValueFrom(this._firestore
      .collection<IPermissionDbRefModel>('permissions', ref => ref.where(documentId(), "in", permissionsDocIds))
      .valueChanges());

    return permissions;
  }
}
