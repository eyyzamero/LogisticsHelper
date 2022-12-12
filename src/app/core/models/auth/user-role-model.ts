import { IUserRoleModel } from "..";

export class UserRoleModel implements IUserRoleModel {

  constructor(
    public id: string = '',
    public name: string = '',
    public permissionIds: Array<string> = new Array<string>()
  ) { }
}