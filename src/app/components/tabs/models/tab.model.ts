import { TabType, UserPermission } from 'src/app/core/enums';
import { ITabModel } from '.';

export class TabModel implements ITabModel {

  constructor(
    public type: TabType = TabType.NONE,
    public icon: string = '',
    public route: Array<string> = new Array<string>,
    public permissions: Array<UserPermission> = new Array<UserPermission>()
  ) { }
}