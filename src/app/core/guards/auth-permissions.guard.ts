import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserPermission } from '../enums';
import { AuthObservableService } from '../services/observable/auth/auth-observable.service';

const REQUIRED_PERMISSIONS_PROPERTY_KEY = 'requiredPermissions';

@Injectable({
  providedIn: 'root'
})
export class AuthPermissionsGuard implements CanActivate, CanLoad {

  constructor(
    private _authObservableService: AuthObservableService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._checkPermissions(route);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._checkPermissions(route);
  }

  private _checkPermissions(route: ActivatedRouteSnapshot | Route): boolean {
    const requiredPermissions = route.data ? route.data[REQUIRED_PERMISSIONS_PROPERTY_KEY] as Array<UserPermission> : null;

    if (!requiredPermissions)
      return false;

    const userPermissions = this._authObservableService.observableSubjectValue.data?.permissions ?? new Array<UserPermission>;
    return requiredPermissions.every(x => userPermissions.includes(x));
  }
}