import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseObservableService } from '../base-observable.service';
import { IBaseBehaviorSubjectObservableService } from '..';
import { BaseObservableMapperService } from '../../mapper';

@Injectable({
  providedIn: 'root'
})
export class BaseBehaviorSubjectObservableService<T> extends BaseObservableService<T> implements IBaseBehaviorSubjectObservableService<T> {

  constructor(
		clearObject: T,
		baseObservableMapper: BaseObservableMapperService,
	) {
		super(clearObject, baseObservableMapper);
	}

	protected _initSubject(): void {
		this._subject = new BehaviorSubject(this._observableSubject);
	}
}