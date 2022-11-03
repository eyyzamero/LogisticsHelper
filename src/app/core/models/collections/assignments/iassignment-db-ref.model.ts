import { DocumentReference } from "@angular/fire/compat/firestore";
import { IUserDbRefModel } from "../..";

export interface IAssignmentDbRefModel {
  id :string;
  user: DocumentReference<IUserDbRefModel>;
}