import { ILoadingModel } from '..';

export class LoadingModel implements ILoadingModel {

  constructor(
    public text: string = '',
    public visible: boolean = false
  ) { }
}