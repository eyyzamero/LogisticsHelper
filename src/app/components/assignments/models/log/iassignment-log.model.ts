import { AssignmentLogType } from "../../enums";

export interface IAssignmentLogModel {
  id: string;
  assignmentId: string;
  type: AssignmentLogType;
  text: string;
  datetime: string;
}