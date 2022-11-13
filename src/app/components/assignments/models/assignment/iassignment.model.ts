import { IAssignmentTcModel } from "..";
import { AssignmentStatus } from "../../enums";

export interface IAssignmentModel {
  id: string;
  status: AssignmentStatus;
  tcs: Array<IAssignmentTcModel>;
}