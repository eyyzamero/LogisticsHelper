import { IUserDbRefModel } from '../..';

export class UserDbRefModel implements IUserDbRefModel {

  constructor(
    public id: string = '',
    public email: string = '',
    public password: string = '',
    public emailVerified: boolean = false,
    public roleId: string = '',
    public nickname: string = ''
  ) { }
}