import { DocumentReference } from "@angular/fire/compat/firestore";
import { IUserDbRefModel, ITcDbRefModel } from "../..";

export interface IAssignmentDbRefModel {
  id :string;
  user: DocumentReference<IUserDbRefModel>;
  tcs: Array<DocumentReference<ITcDbRefModel>>;
}