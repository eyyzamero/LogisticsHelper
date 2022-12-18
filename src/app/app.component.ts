import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirestoreCollection, LanguageKind } from './core/enums';
import { AppTranslateService } from './core/services/translate/app-translate.service';
import { Subscription } from 'rxjs';
import { AuthObservableService } from './core/services/observable/auth/auth-observable.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IPermissionDbRefModel, IRoleDbRefModel, IUserDbRefModel } from './core/models';
import { FirestoreCollectionService } from './core/services/collections/firestore-collection.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthMapperService } from './core/services/mapper/auth/auth-mapper.service';
import { UserRolesObservableService } from './core/services/observable/roles/user-roles-observable.service';
import { LoadingController } from '@ionic/angular';
import { LoadingObservableService } from './core/services/observable/loading/loading-observable.service';
import { TranslateService } from '@ngx-translate/core';

const LOADING_MODAL_ID = 'loading';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {

  authDataObtained: boolean = false;

  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  private _usersCollectionService: FirestoreCollectionService<IUserDbRefModel>;
  private _rolesCollectionService: FirestoreCollectionService<IRoleDbRefModel>;
  private _permissionsCollectionService: FirestoreCollectionService<IPermissionDbRefModel>;

  constructor(
    appTranslateService: AppTranslateService,
    firestore: AngularFirestore,
    private _authService: AngularFireAuth,
    private _authObservableService: AuthObservableService,
    private _authMapperService: AuthMapperService,
    private _userRolesObservableService: UserRolesObservableService,
    private _loadingObservableService: LoadingObservableService,
    private _loadingController: LoadingController,
    private _translateService: TranslateService
  ) {
    appTranslateService.setDefaultLang(LanguageKind.EN);

    this._usersCollectionService = new FirestoreCollectionService<IUserDbRefModel>(firestore, FirestoreCollection.USERS);
    this._rolesCollectionService = new FirestoreCollectionService<IRoleDbRefModel>(firestore, FirestoreCollection.ROLES);
    this._permissionsCollectionService = new FirestoreCollectionService<IPermissionDbRefModel>(firestore, FirestoreCollection.PERMISSIONS);
  }

  ngOnInit(): void {
    this._initObservables();
    this._getRoles();
  }

  private _initObservables(): void {
    const authStateSubscription = this._authService.authState.subscribe({
      next: (user) => {
        if (!user) {
          this._authObservableService.clear();
          return;
        } else
          this._getUserFromDb(user.uid);
      }
    });
    const loadingSubscription = this._loadingObservableService.observable.subscribe({
      next: async (value) => {
        if (value.data.visible != null)
          value.data.visible
            ? await this._showLoadingModal(value.data.text)
            : await this._hideLoadingModal();
      }
    })
    this._subscriptions.push(authStateSubscription, loadingSubscription);
  }

  private _getRoles(): void {
    this._rolesCollectionService.getAll().then(roles => {
      const mappedRoles = this._authMapperService.ArrayOfIRoleDbRefModelToArrayOfIUserRoleModel(roles);
      this._userRolesObservableService.add(mappedRoles);
    });
  }

  private async _getUserFromDb(userId: string): Promise<void> {
    const user = await this._usersCollectionService.getByDocIdAsync(userId);
    const role = await this._rolesCollectionService.getByDocIdAsync(user?.roleId)
    const permissions = await this._permissionsCollectionService.getByDocIds(role?.permissionIds);

    if (!this._authObservableService.observableSubjectValue.data)
      this._authObservableService.initModel();

    this._authObservableService.addUserInfoWithoutNext(user);
    this._authObservableService.addRoleWithoutNext(role);
    this._authObservableService.addPermissionsWithoutNext(permissions);
    this._authObservableService.next();
  }

  private async _showLoadingModal(text: string): Promise<void> {
    this._loadingController.create({
      id: LOADING_MODAL_ID,
      message: this._translateService.instant(text),
      spinner: 'lines-sharp'
    }).then(x => x.present());
  }

  private async _hideLoadingModal(): Promise<void> {
    setTimeout(() => this._loadingController.dismiss(), 500);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}