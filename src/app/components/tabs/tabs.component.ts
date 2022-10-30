import { Component } from '@angular/core';
import { ITabModel } from './models';
import { TabsService } from './services/tabs/tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

  get tabs(): Array<ITabModel> {
    const tabs = this._tabsService.getTabs();
    return tabs;
  }

  constructor(
    private _tabsService: TabsService
  ) { }
}