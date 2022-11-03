import { DocumentReference } from "@angular/fire/compat/firestore";
import { IAssignmentDbRefModel, IUserDbRefModel } from "../..";

export class AssignmentDbRefModel implements IAssignmentDbRefModel {

  constructor(
    public id: string = '',
    public user: DocumentReference<IUserDbRefModel>,
    public tcIds: Array<string>
  ) { }
}