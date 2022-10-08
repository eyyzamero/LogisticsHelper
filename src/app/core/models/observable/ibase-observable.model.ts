import { IObservableErrorModel } from "..";
import { CommunicationState } from "../../enums";

export interface IBaseObservableModel<T> {
  error: IObservableErrorModel | null;
  data: T,
  communicationState: CommunicationState
}