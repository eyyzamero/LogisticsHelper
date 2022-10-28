export interface IAuthModel {
  id: string;
  name: string;
  nickname: string;
  email: string;
  emailVerified: boolean;
  avatarUrl: string | null;
  roles: Array<string>;
  permissions: Array<string>;
}