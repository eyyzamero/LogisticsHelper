import { Injectable } from '@angular/core';
import { ObservableMapperService } from '../../mapper';
import { BaseObservableService } from '../base-observable.service';
import { IBaseSubjectObservableService } from './ibase-subject-observable.service';

@Injectable({
  providedIn: 'root'
})
export class BaseSubjectObservableService<T> extends BaseObservableService<T> implements IBaseSubjectObservableService<T> {

  constructor(
		clearObject: T,
		observableMapperService: ObservableMapperService
	) {
		super(clearObject, observableMapperService);
	}

	protected _initSubject(): void { }
}