import { Injectable } from '@angular/core';
import { TabType } from 'src/app/core/enums';
import { ITabModel, TabModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class TabsMapperService {

  constructor() { }

  TabTypeToArrayOfITabModel(): Array<ITabModel> {
    const dest = Object.values(TabType).filter(x => x !== TabType.NONE).map(x => {
      const tabType = x as TabType;
      return new TabModel(tabType, this._getIconForTabType(tabType), [`/${x}`]);
    });
    return dest;
  }

  private _getIconForTabType(type: TabType): string {
    let icon = '';

    switch(type) {
      case TabType.HOME:
        icon = 'home-outline';
        break;
      case TabType.ASSIGNMENTS:
        icon = 'document-text-outline';
        break;
      case TabType.USERS:
        icon = 'people-outline';
        break;
      case TabType.BARCODES:
        icon = 'barcode-outline';
        break;
      case TabType.LOGOUT:
        icon = 'log-out-outline';
        break;
    }
    return icon;
  }
}