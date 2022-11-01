import { Injectable } from '@angular/core';
import { ObservableMapperService } from 'src/app/core/services/mapper';
import { BaseBehaviorSubjectObservableService } from 'src/app/core/services/observable/base-behavior-subject/base-behavior-subject-observable.service';
import { IAssignmentAccordionModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsObservableService extends BaseBehaviorSubjectObservableService<Array<IAssignmentAccordionModel>> {

  constructor(
    observableMapperService: ObservableMapperService
  ) {
    super(new Array<IAssignmentAccordionModel>(), observableMapperService);
  }
}