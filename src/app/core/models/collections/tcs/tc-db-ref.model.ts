import { ITcDbRefModel } from "../..";

export class TcDbRefModel implements ITcDbRefModel {

  constructor(
    public id: string = '',
    public assignmentId: string = '',
    public name: string = '',
    public width: number = 0,
    public height: number = 0,
    public inners: number = 0,
    public limit: number = 0
  ) { }
}