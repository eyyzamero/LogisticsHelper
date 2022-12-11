import { UserRole } from "src/app/core/enums";

export interface IUserModel {
  id: string;
  nickname: string;
  email: string;
  password: string;
  emailVerified: boolean;
  role: UserRole;
}