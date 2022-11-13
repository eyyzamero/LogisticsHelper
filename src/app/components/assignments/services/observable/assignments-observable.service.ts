import { Injectable } from '@angular/core';
import { ObservableMapperService } from 'src/app/core/services/mapper';
import { BaseBehaviorSubjectObservableService } from 'src/app/core/services/observable/base-behavior-subject/base-behavior-subject-observable.service';
import { AssignmentStatus } from '../../enums';
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

  addTc(assignmentId: string, tc: IAssignmentTcModel): void {
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

  addPallet(assignmentId: string, tc: string, pallet: IAssignmentPalletModel): void {
    const assignment = this.observableSubjectValue.data.find(x => x.id === assignmentId);

    if (assignment) {
      const TC = assignment.tcs.find(x => x.name === tc);

      if (TC) {
        TC.pallets.push(pallet);
        this.next();
      }
    }
  }

  addPalletsToTc(assignmentId: string, tc: string, pallets: Array<IAssignmentPalletModel>): void {
    let assignment = this.observableSubjectValue.data.find(x => x.id === assignmentId);

    if (assignment) {
      const TC = assignment.tcs.find(x => x.name === tc);

      if (TC) {
        TC.pallets.push(...pallets);
        this.next();
      }
    }
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

  setStatus(assignmentId: string, status: AssignmentStatus): void {
    let assignment = this.observableSubjectValue.data.find(x => x.id === assignmentId);

    if (assignment) {
      assignment.status = status;
      this.next();
    }
  }

  delete(assignmentId: string): void {
    let assignment = this.observableSubjectValue.data.find(x => x.id === assignmentId);

    if (assignment) {
      this.observableSubjectValue.data = this.observableSubjectValue.data.filter(x => x.id !== assignmentId);
      this.next();
    }
  }
}