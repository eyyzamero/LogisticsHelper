import { AssignmentLogType } from "../../enums";

export interface IAssignmentLogModel {
  id: string;
  type: AssignmentLogType;
  date: string;
  text: string;
}