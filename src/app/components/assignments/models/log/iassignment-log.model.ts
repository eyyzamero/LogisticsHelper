import { AssignmentLogType } from "../../enums";

export interface IAssignmentLogModel {
  id: string;
  assignmentId: string;
  type: AssignmentLogType;
  date: string;
  text: string;
}