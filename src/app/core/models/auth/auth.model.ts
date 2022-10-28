import { IAuthModel } from '..';
import { UserPermission, UserRole } from '../../enums';

export class AuthModel implements IAuthModel {

  constructor(
    public id: string = '',
    public name: string = '',
    public nickname: string = '',
    public email: string = '',
    public emailVerified: boolean = false,
    public avatarUrl: string | null = null,
    public role: UserRole = UserRole.NONE,
    public permissions: Array<UserPermission> = new Array<UserPermission>
  ) { }
}