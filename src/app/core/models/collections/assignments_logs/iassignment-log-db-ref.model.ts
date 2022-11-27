import { AssignmentLogType } from "src/app/components/assignments/enums";

export interface IAssignmentLogDbRefModel {
  type: AssignmentLogType;
  date: string;
  text: string;
}