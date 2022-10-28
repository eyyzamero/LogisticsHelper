import { Injectable } from '@angular/core';
import { UserPermission, UserRole } from 'src/app/core/enums';
import { AuthModel, IAuthModel, IPermissionDbRefModel, IRoleDbRefModel, IUserDbRefModel } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthMapperService {

  constructor() { }

  IUserDbRefModelToIAuthModel(src: IUserDbRefModel, dest: IAuthModel = new AuthModel()): IAuthModel {
    dest.id = src.id,
    dest.email = src.email
    return dest;
  }

  IRoleDbRefModelToIAuthModel(src: IRoleDbRefModel, dest: IAuthModel = new AuthModel()): IAuthModel {
    dest.role = src.name as UserRole;
    return dest;
  }

  ArrayOfIPermissionDbRefModelToIAuthModel(src: Array<IPermissionDbRefModel>, dest: IAuthModel = new AuthModel()): IAuthModel {
    dest.permissions = src.map(x => x.name as UserPermission);
    return dest;
  }
}
