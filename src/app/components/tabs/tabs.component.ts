import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { TabType } from 'src/app/core/enums';
import { ITabModel } from './models';
import { TabsService } from './services/tabs/tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

  @Output() hideSideMenu: EventEmitter<void> = new EventEmitter<void>();
  
  get tabs(): Array<ITabModel> {
    const tabs = this._tabsService.getTabs();
    return tabs;
  }

  constructor(
    private _router: Router,
    private _tabsService: TabsService,
    private _authService: AngularFireAuth
  ) { }

  onTabClick(tab: ITabModel): void {
    switch(tab.type) {
      case TabType.LOGOUT:
        this._signOut();
        break;
      default:
        this._navigate(tab.route);
        break;
    }
    this.hideSideMenu.emit();
  }

  private _signOut(): void {
    this._authService
    .signOut()
    .then(() => this._navigate(['logout']));
  }

  private _navigate(route: Array<string>) {
    this._router.navigate(route);
  }
}