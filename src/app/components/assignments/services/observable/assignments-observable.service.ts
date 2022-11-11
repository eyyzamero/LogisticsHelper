import { Injectable } from '@angular/core';
import { ObservableMapperService } from 'src/app/core/services/mapper';
import { BaseBehaviorSubjectObservableService } from 'src/app/core/services/observable/base-behavior-subject/base-behavior-subject-observable.service';
import { IAssignmentModel, IAssignmentPalletModel, IAssignmentTcModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsObservableService extends BaseBehaviorSubjectObservableService<Array<IAssignmentModel>> {

  constructor(
    observableMapperService: ObservableMapperService
  ) {
    super(new Array<IAssignmentModel>(), observableMapperService);
  }

  addTc(assignmentId: string, tc: IAssignmentTcModel) {
    let assignment = this.observableSubjectValue.data.find(x => x.id === assignmentId);

    if (assignment) {
      assignment.tcs.push(tc);
      this.next();
    }
  }

  addTcsWithoutNext(assignmentId: string, tcs: Array<IAssignmentTcModel>): void {
    let assignment = this.observableSubjectValue.data.find(x => x.id === assignmentId);

    if (assignment) 
      assignment.tcs = tcs;
  }

  addPalletsToTcsWithoutNext(assignmentId: string, pallets: Array<IAssignmentPalletModel>): void {
    let assignment = this.observableSubjectValue.data.find(x => x.id === assignmentId);

    if (assignment) {
      assignment.tcs.forEach(tc => {
        const palletsWithThisTc = pallets.filter(x => x.tc === tc.name);
        tc.pallets = palletsWithThisTc;
      });
    }
  }
}