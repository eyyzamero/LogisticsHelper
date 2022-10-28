import { IPermissionDbRefModel } from "../..";

export class PermissionDbRefModel implements IPermissionDbRefModel {

  constructor(
    public name: string = ''
  ) { }
}