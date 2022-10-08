import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommunicationState } from 'src/app/core/enums';
import { BaseObservableModel, IBaseObservableModel } from 'src/app/core/models';

export interface IBaseObservableService<T> {
	observable: Observable<IBaseObservableModel<T>>;
	observableSubjectValue: BaseObservableModel<T>;

	add(value: T): void;
	addWithoutNext(value: T): void;
	clear(): void;
	clearWithoutNext(): void;
	next(): void;
	addCommunicationState(state: CommunicationState): void;
	addCommunicationStateWithoutNext(state: CommunicationState): void;
	addError(error: HttpErrorResponse, errorText?: string): void;
	clearErrorWithoutNext(): void;
}