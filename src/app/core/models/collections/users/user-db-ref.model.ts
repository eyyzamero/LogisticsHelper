import { IUserDbRefModel } from "../..";

export class UserDbRefModel implements IUserDbRefModel {

  constructor(
    public id: string = '',
    public email: string = '',
    public roleId: string = ''
  ) { }
}