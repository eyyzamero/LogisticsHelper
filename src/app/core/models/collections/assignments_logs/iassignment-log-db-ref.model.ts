import { AssignmentLogType } from 'src/app/components/assignments/enums';

export interface IAssignmentLogDbRefModel {
  id: string;
  assignmentId: string;
  type: AssignmentLogType;
  text: string
  second_text: string;
  timestamp: number;
}