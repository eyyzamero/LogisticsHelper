import { IAssignmentPalletModel } from '..';

export class AssignmentPalletModel implements IAssignmentPalletModel {

  constructor(
    public id: string = '',
    public assignmentId: string = '',
    public tcId: string = '',
    public inners: number = 0,
    public full: boolean = false
  ) { }
}