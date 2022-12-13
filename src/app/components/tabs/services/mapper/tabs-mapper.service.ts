import { Injectable } from '@angular/core';
import { TabType, UserPermission } from 'src/app/core/enums';
import { ITabModel, TabModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class TabsMapperService {

  constructor() { }

  TabTypeToArrayOfITabModel(): Array<ITabModel> {
    const dest = Object.values(TabType).filter(x => x !== TabType.NONE).map(x => {
      const tabType = x as TabType;
      return new TabModel(tabType, this._getIconForTabType(tabType), [`/${x}`], this._getPermissionsForTabType(tabType));
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

  private _getPermissionsForTabType(type: TabType): Array<UserPermission> {
    let permissions = new Array<UserPermission>();

    switch(type) {
      case TabType.USERS:
        permissions.push(UserPermission.USER_MANAGEMENT);
        break;
      case TabType.ASSIGNMENTS:
        permissions.push(UserPermission.ASSIGNMENTS);
        break;
    }    
    return permissions;
  }
}