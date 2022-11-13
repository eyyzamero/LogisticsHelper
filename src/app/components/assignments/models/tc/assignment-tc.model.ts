import { IAssignmentPalletModel, IAssignmentTcModel } from '..';

export class AssignmentTcModel implements IAssignmentTcModel {

  constructor(
    public id: string = '',
    public assignmentId: string = '',
    public name: string = '',
    public width: number = 0,
    public height: number = 0,
    public inners: number = 0,
    public limit: number = 0,
    public pallets: Array<IAssignmentPalletModel> = new Array<IAssignmentPalletModel>()
  ) { }
}