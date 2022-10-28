import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseObservableModel } from 'src/app/core/models';
import { BaseObservableService } from '../base-observable.service';
import { IBaseBehaviorSubjectLocalStorageObservableService } from '..';
import { ObservableMapperService } from '../../mapper';

@Injectable({
	providedIn: 'root'
})
export class BaseBehaviorSubjectLocalStorageObservableService<T> extends BaseObservableService<T> implements IBaseBehaviorSubjectLocalStorageObservableService<T> {

	override get observableSubjectValue(): BaseObservableModel<T> {
		const localStorageItem = localStorage.getItem(this._localStoreName) ?? 'null';
		this._observableSubject.data = JSON.parse(localStorageItem) as T;
		return this._observableSubject;
	}

	constructor(
		clearObject: T,
		observableMapperService: ObservableMapperService,
		private _localStoreName: string
	) {
		super(clearObject, observableMapperService);

		if (!this.observableSubjectValue.data)
			this._setLocalStorageItem(clearObject);
	}

	override add(value: T): void {
		this._setLocalStorageItem(value);
		super.add(value);
	}

	override addWithoutNext(value: T): void {
		this._setLocalStorageItem(value);
		super.addWithoutNext(value);
	}

	override clear(): void {
		this._setLocalStorageItem(this._cleanObservableSubject);
		super.clear();
	}

	override clearWithoutNext(): void {
		this._setLocalStorageItem(this._cleanObservableSubject);
		super.clearWithoutNext();
	}

	protected _initSubject(): void {
		this._subject = new BehaviorSubject(this._observableSubject);
	}

	private _setLocalStorageItem(value: T): void {
		localStorage.setItem(this._localStoreName, JSON.stringify(value));
	}
}