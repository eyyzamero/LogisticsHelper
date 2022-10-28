import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageKind } from './core/enums';
import { AppTranslateService } from './core/services/translate/app-translate.service';
import { Subscription } from 'rxjs';
import { AuthObservableService } from './core/services/observable/auth/auth-observable.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreUsersCollectionService } from './core/services/collections/users/firestore-users-collection.service';
import { FirestoreRolesCollectionService } from './core/services/collections/roles/firestore-roles-collection.service';
import { FirestorePermissionsCollectionService } from './core/services/collections/permissions/firestore-permissions-collection.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {

  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    appTranslateService: AppTranslateService,
    private _authService: AngularFireAuth,
    private _authObservableService: AuthObservableService,
    private _firestoreUsersCollectionService: FirestoreUsersCollectionService,
    private _firestoreRolesCollectionService: FirestoreRolesCollectionService,
    private _firestorePermissionsCollectionService: FirestorePermissionsCollectionService
  ) {
    appTranslateService.setDefaultLang(LanguageKind.EN);
  }

  ngOnInit(): void {
    this._initObservables();
  }

  private _initObservables(): void {
    const authStateSubscription = this._authService.authState.subscribe({
      next: (user) => {
        if (!user) {
          this._authObservableService.clear();
          return;
        };
        this._getUserFromDb(user.uid);
      }
    });
    const authSubscription = this._authObservableService.observable.subscribe({
      next: (auth) => console.log(auth)
    });
    this._subscriptions.push(authStateSubscription), authSubscription;
  }

  private async _getUserFromDb(userId: string) {
    const user = await this._firestoreUsersCollectionService.getUserByDocIdAsync(userId);
    const role = await this._firestoreRolesCollectionService.getRoleByDocIdAsync(user?.roleId)
    const permissions = await this._firestorePermissionsCollectionService.getPermissionsByDocIds(role?.permissionIds)
    
    this._authObservableService.addUserInfoWithoutNext(user);
    this._authObservableService.addRoleWithoutNext(role);
    this._authObservableService.addPermissionsWithoutNext(permissions);
    this._authObservableService.next();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}
