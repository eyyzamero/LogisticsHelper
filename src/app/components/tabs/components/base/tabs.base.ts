import { Directive } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { TabType } from 'src/app/core/enums';
import { ITabModel } from '../../models';
import { TabsService } from '../../services/tabs/tabs.service';

@Directive()
export class TabsBase {

  protected get tabs(): Array<ITabModel> {
    const tabs = this._tabsService.getTabs();
    return tabs;
  }

  constructor(
    protected _router: Router,
    protected _tabsService: TabsService,
    protected _authService: AngularFireAuth
  ) { }

  protected onTabClick(tab: ITabModel): void {
    switch (tab.type) {
      case TabType.LOGOUT:
        this._signOut();
        break;
      default:
        this._navigate(tab.route);
        break;
    }
  }

  private _signOut(): void {
    this._authService
      .signOut()
      .then(() => this._navigate(['logout']));
  }

  private _navigate(route: Array<string>): void {
    this._router.navigate(route);
  }
}