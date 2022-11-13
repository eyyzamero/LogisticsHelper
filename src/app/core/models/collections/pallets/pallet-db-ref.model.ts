import { IPalletDbRefModel } from '../..';

export class PalletDbRefModel implements IPalletDbRefModel {

  constructor(
    public id: string = '',
    public assignmentId: string = '',
    public tc: string = '',
    public inners: number = 0,
    public full: boolean = false
  ) { }
}