import { Injectable } from '@angular/core';
import { IUserRoleModel } from 'src/app/core/models';
import { ObservableMapperService } from '../../mapper';
import { BaseBehaviorSubjectObservableService } from '../base-behavior-subject/base-behavior-subject-observable.service';

@Injectable({
  providedIn: 'root'
})
export class UserRolesObservableService extends BaseBehaviorSubjectObservableService<Array<IUserRoleModel>> {

  constructor(
    observableMapperService: ObservableMapperService
  ) {
    super(new Array<IUserRoleModel>(), observableMapperService);
  }
}
