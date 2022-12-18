import { ILoadingModel } from '..';

export class LoadingModel implements ILoadingModel {

  constructor(
    public text: string = 'common.loading',
    public visible: boolean | null = null
  ) { }
}