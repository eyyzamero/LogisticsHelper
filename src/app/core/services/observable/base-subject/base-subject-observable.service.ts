import { Injectable } from '@angular/core';
import { BaseObservableMapperService } from '../../mapper';
import { BaseObservableService } from '../base-observable.service';
import { IBaseSubjectObservableService } from './ibase-subject-observable.service';

@Injectable({
  providedIn: 'root'
})
export class BaseSubjectObservableService<T> extends BaseObservableService<T> implements IBaseSubjectObservableService<T> {

  constructor(
		clearObject: T,
		baseObservableMapperService: BaseObservableMapperService
	) {
		super(clearObject, baseObservableMapperService);
	}

	protected _initSubject(): void { }
}