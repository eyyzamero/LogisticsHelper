import { IObservableErrorModel } from "..";

export class ObservableErrorModel implements IObservableErrorModel {

  constructor(
    public errorText: string = '',
    public errorId: string = '',
    public errorCode: number = 0
  ) { }
}