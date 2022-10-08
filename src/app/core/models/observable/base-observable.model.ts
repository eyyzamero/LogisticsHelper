import { IBaseObservableModel, IObservableErrorModel } from "..";
import { CommunicationState } from "../../enums";

export class BaseObservableModel<T> implements IBaseObservableModel<T> {

  constructor(
    public error: IObservableErrorModel | null = null,
    public data: T,
    public communicationState: CommunicationState = CommunicationState.NONE
  ) { }
}