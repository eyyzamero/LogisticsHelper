import { AssignmentLogType } from 'src/app/components/assignments/enums';
import { IAssignmentLogDbRefModel } from '../..';

export class AssignmentLogDbRef implements IAssignmentLogDbRefModel {

  constructor(
    public id: string = '',
    public assignmentId: string = '',
    public type: AssignmentLogType = AssignmentLogType.NONE,
    public text: string = '',
    public second_text: string = '',
    public timestamp: number = Date.now(),
  ) { }
}