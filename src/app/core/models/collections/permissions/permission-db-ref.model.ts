import { IPermissionDbRefModel } from '../..';

export class PermissionDbRefModel implements IPermissionDbRefModel {

  constructor(
    public id: string = '',
    public name: string = ''
  ) { }
}