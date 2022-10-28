import { Injectable } from '@angular/core';
import { AuthModel, IAuthModel, IPermissionDbRefModel, IRoleDbRefModel, IUserDbRefModel } from 'src/app/core/models';
import { ObservableMapperService } from '../../mapper';
import { BaseBehaviorSubjectObservableService } from '../base-behavior-subject/base-behavior-subject-observable.service';
import { CommunicationState, UserPermission } from 'src/app/core/enums';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthMapperService } from '../../mapper/auth/auth-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthObservableService extends BaseBehaviorSubjectObservableService<IAuthModel> {

  constructor(
    observableMapperService: ObservableMapperService,
    private _authService: AngularFireAuth,
    private _authMapperService: AuthMapperService
  ) {
    super(new AuthModel(), observableMapperService);
  }

  override add(): void {
    this._authService.currentUser.then(user => {
      if (user) {
        const authModel = new AuthModel(user.uid, user.displayName ?? user.email!, user.displayName ?? user.email!, user.email!, user.emailVerified, user.photoURL);
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

  addUserInfoWithoutNext(userInfo?: IUserDbRefModel) {
    if (userInfo) 
      this._authMapperService.IUserDbRefModelToIAuthModel(userInfo, this.observableSubjectValue.data);
  }

  addRoleWithoutNext(role?: IRoleDbRefModel) {
    if (role) 
      this._authMapperService.IRoleDbRefModelToIAuthModel(role, this.observableSubjectValue.data);
  }

  addPermissionsWithoutNext(permissions?: Array<IPermissionDbRefModel>) {
    if (permissions) 
      this._authMapperService.ArrayOfIPermissionDbRefModelToIAuthModel(permissions, this.observableSubjectValue.data);
  }
}
