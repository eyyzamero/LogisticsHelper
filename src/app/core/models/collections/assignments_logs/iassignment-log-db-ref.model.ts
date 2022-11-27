import { AssignmentLogType } from "src/app/components/assignments/enums";

export interface IAssignmentLogDbRefModel {
  id: string;
  type: AssignmentLogType;
  date: string;
  text: string;
}