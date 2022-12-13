import { Injectable } from '@angular/core';
import { ITabModel } from '../../models';
import { TabsMapperService } from '../mapper/tabs-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  constructor(
    private _tabsMapperService: TabsMapperService
  ) { }

  getTabs(): Array<ITabModel> {
    let tabs = this._tabsMapperService.TabTypeToArrayOfITabModel();
    return tabs;
  }
}