import { Injectable } from '@angular/core';
import { ObservableMapperService } from 'src/app/core/services/mapper';
import { BaseBehaviorSubjectObservableService } from 'src/app/core/services/observable/base-behavior-subject/base-behavior-subject-observable.service';
import { IUserModel } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class UsersListObservableService extends BaseBehaviorSubjectObservableService<Array<IUserModel>> {

  constructor(
    observableMapperService: ObservableMapperService
  ) {
    super(new Array<IUserModel>(), observableMapperService);
  }
}