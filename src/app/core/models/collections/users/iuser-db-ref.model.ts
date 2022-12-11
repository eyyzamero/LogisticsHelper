export interface IUserDbRefModel {
  id: string;
  email: string;
  password: string;
  emailVerified: boolean;
  roleId: string;
  nickname: string;
}