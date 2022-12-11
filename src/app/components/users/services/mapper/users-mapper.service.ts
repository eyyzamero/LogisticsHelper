import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IRoleDbRefModel, IUserDbRefModel, UserDbRefModel } from 'src/app/core/models';
import { CryptoService } from 'src/app/core/services/crypto/crypto.service';
import { IUserModel, UserModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UsersMapperService {

  constructor(
    private _cryptoService: CryptoService
  ) { }

  ArrayOfIUserDbRefModelToArrayOfIUserModel(src: Array<IUserDbRefModel>): Array<IUserModel> {
    const dest = src?.map(x => this.IUserDbRefModelToIUserModel(x)) ?? new Array<IUserModel>();
    return dest;
  }

  IUserDbRefModelToIUserModel(src: IUserDbRefModel): IUserModel {
    const dest = new UserModel(src.id, src.nickname, src.email, src.password, src.emailVerified);
    return dest;
  }

  UsersFormGroupToIUserDbRefModel(src: FormGroup, id: string): IUserDbRefModel {
    const dest = new UserDbRefModel(
      id,
      src.controls['email'].value,
      this._cryptoService.encrypt(src.controls['password'].value),
      false,
      (src.controls['role'].value as IRoleDbRefModel).id,
      src.controls['nickname'].value
    );
    return dest;
  }
}