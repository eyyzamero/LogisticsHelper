import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageKind } from './core/enums';
import { AppTranslateService } from './core/services/translate/app-translate.service';
import { Subscription } from 'rxjs';
import { AuthObservableService } from './core/services/observable/auth/auth-observable.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {

  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    appTranslateService: AppTranslateService,
    private _router: Router,
    private _authService: AngularFireAuth,
    private _authObservableService: AuthObservableService,
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
          // this._navigateToLoginPage();
          return;
        };
        this._authObservableService.add();
        // this._navigateToHomePage();
      }
    });
    this._subscriptions.push(authStateSubscription);
  }

  private _navigateToLoginPage(): void {
    this._router.navigate(['login']);
  }

  private _navigateToHomePage(): void {
    this._router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}
