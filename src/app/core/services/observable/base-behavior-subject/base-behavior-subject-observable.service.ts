import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseObservableService } from '../base-observable.service';
import { IBaseBehaviorSubjectObservableService } from '..';
import { ObservableMapperService } from '../../mapper';

@Injectable({
  providedIn: 'root'
})
export class BaseBehaviorSubjectObservableService<T> extends BaseObservableService<T> implements IBaseBehaviorSubjectObservableService<T> {

  constructor(
		clearObject: T,
		observableMapper: ObservableMapperService,
	) {
		super(clearObject, observableMapper);
	}

	protected _initSubject(): void {
		this._subject = new BehaviorSubject(this._observableSubject);
	}
}