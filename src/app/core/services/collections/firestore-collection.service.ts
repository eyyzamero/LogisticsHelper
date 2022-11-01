import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { documentId } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { FirestoreCollection } from '../../enums';

@Injectable({
  providedIn: 'root'
})
export class FirestoreCollectionService<T> {

  constructor(
    private _firestore: AngularFirestore,
    private _collectionName: FirestoreCollection
  ) { }

  async getByDocIdAsync(docId?: string): Promise<T | undefined> {
    if (!docId)
      return undefined;

    const collection = this._getCollection();
    const document = await firstValueFrom(collection.doc(docId).get());
    return document.data();
  }

  async getByDocIds(docIds?: Array<string>): Promise<Array<T> | undefined> {
    if (!docIds || !docIds?.length)
      return undefined;
    
    const collection = this._getCollection(ref => ref.where(documentId(), "in", docIds));
    const documents = await firstValueFrom(collection.valueChanges());
    return documents;
  }

  async getByUserRef(userId?: string, fieldName: string = 'user'): Promise<Array<T> | undefined> {
    if (!userId)
      return undefined;

    const userDocRef = await this._firestore.collection('users').doc(userId).ref;
    const collection = this._getCollection(ref => ref.where(fieldName, '==', userDocRef));
    const documents = await firstValueFrom(collection.valueChanges());
    return documents;
  }

  private _getCollection(query?: QueryFn): AngularFirestoreCollection<T> {
    return query
      ? this._firestore.collection(this._collectionName, query)
      : this._firestore.collection(this._collectionName);
  }
}