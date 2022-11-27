import { AssignmentLogType } from 'src/app/components/assignments/enums';
import { IAssignmentLogDbRefModel } from '../..';

export class AssignmentLogDbRef implements IAssignmentLogDbRefModel {

  constructor(
    public id: string = '',
    public assignmentId: string = '',
    public type: AssignmentLogType = AssignmentLogType.NONE,
    public date: string = '',
    public text: string = ''
  ) { }
}