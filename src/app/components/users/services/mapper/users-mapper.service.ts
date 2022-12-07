import { Injectable } from '@angular/core';
import { IUserDbRefModel } from 'src/app/core/models';
import { IUserModel, UserModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UsersMapperService {

  constructor() { }

  ArrayOfIUserDbRefModelToArrayOfIUserModel(src: Array<IUserDbRefModel>): Array<IUserModel> {
    const dest = src?.map(x => this.IUserDbRefModelToIUserModel(x)) ?? new Array<IUserModel>();
    return dest;
  }

  IUserDbRefModelToIUserModel(src: IUserDbRefModel): IUserModel {
    const dest = new UserModel(src.id, src.nickname, src.email, src.emailVerified);
    return dest;
  }
}