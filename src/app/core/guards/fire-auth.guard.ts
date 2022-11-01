import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireAuthGuard implements CanActivate, CanLoad {
  
  constructor(
    private _router: Router,
    private _authService: AngularFireAuth
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._isAuthenticated();
  }

  canLoad(route: Route,segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._isAuthenticated();
  }

  private _isAuthenticated(): Observable<boolean> {
    return this._authService.authState.pipe(map((user) => {
      if (!user) {
        this._router.navigate(['login']);
        return false
      }
      return true;
    }));
  }
}
