import { UserRole } from "src/app/core/enums";
import { IRoleDbRefModel } from "../..";

export class RoleDbRefModel implements IRoleDbRefModel {

  constructor(
    public name: UserRole = UserRole.NONE,
    public permissionIds: Array<string> = new Array<string>()
  ) { }
}