import { AssignmentLogType } from "../../enums";
import { IAssignmentLogModel } from "..";

export class AssignmentLogModel implements IAssignmentLogModel {

  constructor(
    public id: string = '',
    public assignmentId: string = '',
    public type: AssignmentLogType = AssignmentLogType.NONE,
    public text: string = '',
    public datetime: string = '',
  ) { }
}