import { Injectable } from '@angular/core';
import { AuthModel, IAuthModel } from 'src/app/core/models';
import { ObservableMapperService } from '../../mapper';
import { BaseBehaviorSubjectObservableService } from '../base-behavior-subject/base-behavior-subject-observable.service';
import { CommunicationState } from 'src/app/core/enums';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthObservableService extends BaseBehaviorSubjectObservableService<IAuthModel | null> {

  constructor(
    observableMapperService: ObservableMapperService,
    private _authService: AngularFireAuth
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
    this.observableSubjectValue.data = null;
    this.addCommunicationStateWithoutNext(CommunicationState.NONE);
    this.next();
  }
}
