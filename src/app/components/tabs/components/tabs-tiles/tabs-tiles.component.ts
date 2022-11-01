import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { TabType } from 'src/app/core/enums';
import { ITabModel } from '../../models';
import { TabsService } from '../../services/tabs/tabs.service';
import { TabsBase } from '../base/tabs.base';

@Component({
  selector: 'app-tabs-tiles',
  templateUrl: './tabs-tiles.component.html',
  styleUrls: ['./tabs-tiles.component.scss'],
})
export class TabsTilesComponent extends TabsBase {

  override get tabs(): ITabModel[] {
    const tabs = super.tabs;
    return tabs.filter(x => x.type !== TabType.HOME);
  }
  
  constructor(
    router: Router,
    tabsService: TabsService,
    authService: AngularFireAuth
  ) {
    super(router, tabsService, authService);
  }
}