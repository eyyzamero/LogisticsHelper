import { IAssignmentTcModel } from "..";

export interface IAssignmentModel {
  id: string;
  tcs: Array<IAssignmentTcModel>;
}