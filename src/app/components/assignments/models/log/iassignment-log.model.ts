import { AssignmentLogType } from '../../enums';

export interface IAssignmentLogModel {
  id: string;
  assignmentId: string;
  type: AssignmentLogType;
  text: string;
  second_text: string;
  datetime: string;
}