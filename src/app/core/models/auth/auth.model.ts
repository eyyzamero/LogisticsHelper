import { IAuthModel } from '..';

export class AuthModel implements IAuthModel {

  constructor(
    public id: string = '',
    public name: string = '',
    public nickname: string = '',
    public email: string = '',
    public emailVerified: boolean = false,
    public avatarUrl: string | null = null,
    public roles: Array<string> = new Array<string>,
    public permissions: Array<string> = new Array<string>
  ) { }
}