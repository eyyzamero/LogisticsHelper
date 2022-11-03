import { Injectable } from '@angular/core';
import { ObservableMapperService } from 'src/app/core/services/mapper';
import { BaseBehaviorSubjectObservableService } from 'src/app/core/services/observable/base-behavior-subject/base-behavior-subject-observable.service';
import { IAssignmentAccordionModel, IAssignmentTcModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsObservableService extends BaseBehaviorSubjectObservableService<Array<IAssignmentAccordionModel>> {

  constructor(
    observableMapperService: ObservableMapperService
  ) {
    super(new Array<IAssignmentAccordionModel>(), observableMapperService);
  }

  setOpened(item: IAssignmentAccordionModel, value: boolean): void {
    let assignment = this.observableSubjectValue.data.find(x => x.data.id === item.data.id);

    if (assignment) {
      assignment.opened = value;
      this.next();
    }
  }

  addTcsWithoutNext(assignmentId: string, tcs: Array<IAssignmentTcModel>): void {
    let assignment = this._observableSubject.data.find(x => x.data.id === assignmentId);

    if (assignment) 
      assignment.data.tcs = tcs;
  }
}