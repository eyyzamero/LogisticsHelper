import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { documentId } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { FirestoreCollection } from '../../enums';

type KeysInGenericType<T> = {
  [K in keyof T]: K
}[keyof T]

type MandatoryFieldsInGenericType = {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreCollectionService<T extends MandatoryFieldsInGenericType> {

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

  async getWhereFieldEqualsValue(field: KeysInGenericType<T>, value: string): Promise<Array<T> | undefined> {
    const collection = this._getCollection(ref => ref.where(field as string, '==', value));
    const documents = await firstValueFrom(collection.valueChanges());
    return documents;
  }

  async addMultiple(items: Array<T>): Promise<void> {
    const batch = this._firestore.firestore.batch();
    const collection = this._getCollection();

    items.forEach(item => {
      const id = this._firestore.createId();
      const docRef = collection.doc(id).ref;

      item.id = id;

      batch.set(docRef, { ...item });
    });
    await batch.commit();
  }

  private _getCollection(query?: QueryFn): AngularFirestoreCollection<T> {
    return query
      ? this._firestore.collection(this._collectionName, query)
      : this._firestore.collection(this._collectionName);
  }
}