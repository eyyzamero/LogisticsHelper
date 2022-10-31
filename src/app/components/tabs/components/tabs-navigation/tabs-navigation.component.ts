import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ITabModel } from '../../models';
import { TabsService } from '../../services/tabs/tabs.service';
import { TabsBase } from '../base/tabs.base';

@Component({
  selector: 'app-tabs-navigation',
  templateUrl: './tabs-navigation.component.html',
  styleUrls: ['./tabs-navigation.component.scss'],
})
export class TabsNavigationComponent extends TabsBase {

  @Output() hideSideMenu: EventEmitter<void> = new EventEmitter<void>();

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
}