import { Injectable } from '@angular/core';
import { ObservableMapperService } from 'src/app/core/services/mapper';
import { BaseBehaviorSubjectObservableService } from 'src/app/core/services/observable/base-behavior-subject/base-behavior-subject-observable.service';
import { AssignmentStatus } from '../../enums';
import { IAssignmentLogModel, IAssignmentModel, IAssignmentPalletModel, IAssignmentTcModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsObservableService extends BaseBehaviorSubjectObservableService<Array<IAssignmentModel>> {

  constructor(
    observableMapperService: ObservableMapperService
  ) {
    super(new Array<IAssignmentModel>(), observableMapperService);
  }
  
  addAssignment(assignment: IAssignmentModel) {
    this.observableSubjectValue.data.push(assignment);
    this.next();
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

  addPallet(assignmentId: string, tcId: string, pallet: IAssignmentPalletModel): void {
    const assignment = this.observableSubjectValue.data.find(x => x.id === assignmentId);

    if (assignment) {
      const TC = assignment.tcs.find(x => x.id === tcId);

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
        const palletsWithThisTc = pallets.filter(x => x.tcId === tc.id);
        tc.pallets = palletsWithThisTc;
      });
    }
  }

  editTc(assignmentId: string, item: IAssignmentTcModel) {
    const assignment = this.observableSubjectValue.data.find(x => x.id === assignmentId);

    if (assignment) {
      let tcIndex = assignment.tcs.findIndex(x => x.id === item.id);

      if (tcIndex !== -1) {
        assignment.tcs[tcIndex] = item;
        this.next();
      }
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

  deleteTc(assignmentId: string, tcId: string): void {
    let assignment = this.observableSubjectValue.data.find(x => x.id === assignmentId);

    if (assignment) {
      const tcIndex = assignment.tcs.findIndex(x => x.id === tcId);

      if (tcIndex !== -1) {
        assignment.tcs.splice(tcIndex, 1);
        this.next();
      }
    }
  }

  addLog(assignmentId: string, log: IAssignmentLogModel) {
    let assignment = this.observableSubjectValue.data.find(x => x.id === assignmentId);

    if (assignment) {
      assignment.logs.push(log);
      this.next();
    }
  }
}