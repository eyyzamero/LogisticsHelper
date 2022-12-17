import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout-toolbar',
  templateUrl: './layout-toolbar.component.html',
  styleUrls: ['./layout-toolbar.component.scss'],
})
export class LayoutToolbarComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean = false;

  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private _router: Router,
    private _authService: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this._initObservables();
  }

  logout(): void {
    this._authService
      .signOut()
      .then(() => this._router.navigate(['logout']));
  }

  navigateToMainPage(): void {
    this._router.navigate(['home']);
  }

  private _initObservables(): void {
    const authStateSubscription = this._authService.authState.subscribe({
      next: (user) => this.isAuthenticated = user ? true : false 
    });
    this._subscriptions.push(authStateSubscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}