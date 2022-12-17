import { UserRole } from 'src/app/core/enums';
import { IUserModel } from '..';

export class UserModel implements IUserModel {

  constructor(
    public id: string = '',
    public nickname: string = '',
    public email: string = '',
    public password: string = '',
    public emailVerified: boolean = false,
    public role: UserRole = UserRole.NONE
  ) { }
}