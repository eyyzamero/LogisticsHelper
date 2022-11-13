import { TabType } from '../../../core/enums';

export interface ITabModel {
  type: TabType;
  icon: string;
  route: Array<string>;
}