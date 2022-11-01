import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthObservableService } from '../services/observable/auth/auth-observable.service';

@Injectable({
  providedIn: 'root'
})
export class AuthObservableModelObtainedGuard implements CanActivate, CanLoad {
  
  constructor(
    private _router: Router,
    private _authObservableService: AuthObservableService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._observableModelObtained();
  }

  canLoad(route: Route,segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._observableModelObtained();
  }

  private _observableModelObtained(): Observable<boolean> {
    return this._authObservableService.observable.pipe(map((auth) => {
      if (!auth.data) {
        this._router.navigate(['home']);
        return false
      }
      return true;
    }));
  }
}