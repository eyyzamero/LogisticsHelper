import { Injectable } from '@angular/core';
import { ILoadingModel, LoadingModel } from 'src/app/core/models';
import { ObservableMapperService } from '../../mapper';
import { BaseBehaviorSubjectObservableService } from '../base-behavior-subject/base-behavior-subject-observable.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingObservableService extends BaseBehaviorSubjectObservableService<ILoadingModel> {

  constructor(
    observableMapperService: ObservableMapperService
  ) {
    super(new LoadingModel(), observableMapperService);
  }

  set text(value: string) {
    this.observableSubjectValue.data.text = value;
    this.next();
  }

  show() {
    this.observableSubjectValue.data.visible = true;
    this.next();
  }

  hide() {
    this.observableSubjectValue.data.visible = false;
    this.next();
  }
}