import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ITabModel } from '../../models';
import { TabsService } from '../../services/tabs/tabs.service';
import { TabsBase } from '../base/tabs.base';

@Component({
  selector: 'app-tabs-navigation',
  templateUrl: './tabs-navigation.component.html',
  styleUrls: ['./tabs-navigation.component.scss'],
})
export class TabsNavigationComponent extends TabsBase implements OnInit, OnDestroy {

  @Output() hideSideMenu: EventEmitter<void> = new EventEmitter<void>();

  currentRoute: string = '';

  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    router: Router,
    tabsService: TabsService,
    authService: AngularFireAuth
  ) {
    super(router, tabsService, authService);
  }

  override onTabClick(tab: ITabModel): void {
    super.onTabClick(tab);
    this.hideSideMenu.emit();
  }

  ngOnInit(): void {
    const urlSubscription = this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe({
      next: () => this.currentRoute = this._router.url
    });
    this._subscriptions.push(urlSubscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}