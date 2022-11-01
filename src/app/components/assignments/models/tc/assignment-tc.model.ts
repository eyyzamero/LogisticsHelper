import { IAssignmentTcModel } from "..";

export class AssignmentTcModel implements IAssignmentTcModel {

  constructor(
    public id: string = '',
    public name: string = '',
    public width: number = 0,
    public height: number = 0,
    public inners: number = 0,
    public limit: number = 0
  ) { }
}