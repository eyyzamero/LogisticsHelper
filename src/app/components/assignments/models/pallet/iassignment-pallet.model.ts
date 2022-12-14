import { IAssignmentTcModel } from '../tc/iassignment-tc.model';

export interface IAssignmentPalletModel {
  id: string;
  assignmentId: string;
  tcId: string;
  inners: number;
  full: boolean;
  tc?: IAssignmentTcModel;
}