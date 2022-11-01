import { IAssignmentModel, IAssignmentTcModel } from "..";

export class AssignmentModel implements IAssignmentModel {

  constructor(
    public id: string = '',
    public tcs: Array<IAssignmentTcModel> = new Array<IAssignmentTcModel>()
  ) { }
}