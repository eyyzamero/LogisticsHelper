import { TabType, UserPermission } from '../../../core/enums';

export interface ITabModel {
  type: TabType;
  icon: string;
  route: Array<string>;
  permissions: Array<UserPermission>;
}