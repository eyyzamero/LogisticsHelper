import { IAssignmentModel, IAssignmentTcModel } from "..";
import { AssignmentStatus } from "../../enums";

export class AssignmentModel implements IAssignmentModel {

  constructor(
    public id: string = '',
    public status: AssignmentStatus = AssignmentStatus.ACTIVE,
    public tcs: Array<IAssignmentTcModel> = new Array<IAssignmentTcModel>()
  ) { }
}