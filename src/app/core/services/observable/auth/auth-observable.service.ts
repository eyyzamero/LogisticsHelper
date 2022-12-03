import { Injectable } from '@angular/core';
import { AuthModel, IAuthModel, IPermissionDbRefModel, IRoleDbRefModel, IUserDbRefModel } from 'src/app/core/models';
import { ObservableMapperService } from '../../mapper';
import { BaseBehaviorSubjectObservableService } from '../base-behavior-subject/base-behavior-subject-observable.service';
import { CommunicationState } from 'src/app/core/enums';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthMapperService } from '../../mapper/auth/auth-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthObservableService extends BaseBehaviorSubjectObservableService<IAuthModel | null> {

  constructor(
    observableMapperService: ObservableMapperService,
    private _authService: AngularFireAuth,
    private _authMapperService: AuthMapperService
  ) {
    super(null, observableMapperService);
  }

  override add(): void {
    this._authService.currentUser.then(user => {
      if (user) {
        const authModel = new AuthModel(
          user.uid,
          user.displayName ?? user.email ?? '',
          user.email ?? '',
          user.emailVerified,
          user.photoURL
        );
        super.add(authModel);
      }
    });
  }

  override clear(): void {
    this.clearErrorWithoutNext();
    this.clearWithoutNext();
    this.addCommunicationStateWithoutNext(CommunicationState.NONE);
    this.next();
  }

  initModel(): void {
    const model = new AuthModel();
    this.addWithoutNext(model);
  }

  addUserInfoWithoutNext(userInfo?: IUserDbRefModel): void {
    if (userInfo)
      this._authMapperService.IUserDbRefModelToIAuthModel(userInfo, this.observableSubjectValue.data!);
  }

  addRoleWithoutNext(role?: IRoleDbRefModel): void {
    if (role)
      this._authMapperService.IRoleDbRefModelToIAuthModel(role, this.observableSubjectValue.data!);
  }

  addPermissionsWithoutNext(permissions?: Array<IPermissionDbRefModel>): void {
    if (permissions)
      this._authMapperService.ArrayOfIPermissionDbRefModelToIAuthModel(permissions, this.observableSubjectValue.data!);
  }
}
