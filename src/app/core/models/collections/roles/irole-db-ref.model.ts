import { UserRole } from "src/app/core/enums";

export interface IRoleDbRefModel {
  name: UserRole;
  permissionIds: Array<string>;
}