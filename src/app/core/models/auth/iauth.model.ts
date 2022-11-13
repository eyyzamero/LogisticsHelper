import { UserPermission, UserRole } from '../../enums';

export interface IAuthModel {
  id: string;
  name: string;
  nickname: string;
  email: string;
  emailVerified: boolean;
  avatarUrl: string | null;
  role: UserRole,
  permissions: Array<UserPermission>;
}