import { UserRole } from 'src/app/core/enums';

export interface IRoleDbRefModel {
  id: string;
  name: UserRole;
  permissionIds: Array<string>;
}