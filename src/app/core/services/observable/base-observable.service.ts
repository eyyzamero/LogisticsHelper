import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { CommunicationState } from 'src/app/core/enums';
import { BaseObservableModel, IBaseObservableModel } from 'src/app/core/models';
import { IBaseObservableService } from '.';
import { ObservableMapperService } from '../mapper';

@Injectable({
	providedIn: 'root'
})
export abstract class BaseObservableService<T> implements IBaseObservableService<T> {

	protected _cleanObservableSubject: T;
	protected _observableSubject: IBaseObservableModel<T>;
	protected _subject: Subject<IBaseObservableModel<T>> = new Subject();

	get observable(): Observable<IBaseObservableModel<T>> {
		return this._subject.asObservable();
	}

	get observableSubjectValue(): BaseObservableModel<T> {
		return this._observableSubject;
	}

	constructor(
		clearObject: T,
		private _observableMapperService: ObservableMapperService
	) {
		this._cleanObservableSubject = _.cloneDeep(clearObject);
		this._observableSubject = new BaseObservableModel<T>(null, clearObject);
		this._initSubject();
	}

	protected abstract _initSubject(): void;

	add(value: T): void {
		this._observableSubject.communicationState = CommunicationState.LOADED;
		this._observableSubject.data = value;
		this.next();
	}

	addWithoutNext(value: T): void {
		this._observableSubject.communicationState = CommunicationState.LOADED;
		this._observableSubject.data = value;
	}

	clear(): void {
		this._observableSubject.data = _.cloneDeep(this._cleanObservableSubject);
		this.clearErrorWithoutNext();
		this.next();
	}

	clearWithoutNext(): void {
		this._observableSubject.data = _.cloneDeep(this._cleanObservableSubject);
	}

	next(): void {
		this._subject.next(_.cloneDeep(this._observableSubject));
	}

	addCommunicationState(state: CommunicationState): void {
		this._observableSubject.communicationState = state;
		this.next();
	}

	addCommunicationStateWithoutNext(state: CommunicationState): void {
		this._observableSubject.communicationState = state;
	}
	
	addError(error: HttpErrorResponse, errorText: string = ''): void {
		this._addErrorBase(error, errorText);
		this.next();
	}

	clearErrorWithoutNext(): void {
		this._observableSubject.error = null;
	}

	protected _addErrorBase(error: HttpErrorResponse, errorText: string = ''): void {
		this._observableSubject.communicationState = CommunicationState.ERROR;
		this._observableSubject.error = this._observableMapperService.httpErrorResponseToIObservableErrorModel(error, errorText);
	}
}