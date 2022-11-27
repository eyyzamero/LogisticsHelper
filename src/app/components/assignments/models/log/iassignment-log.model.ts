import { AssignmentLogType } from "../../enums";

export interface IAssignmentLogModel {
  type: AssignmentLogType;
  date: string;
  text: string;
}