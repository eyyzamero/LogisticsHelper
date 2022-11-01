import { DocumentReference } from "@angular/fire/compat/firestore";
import { IAssignmentDbRefModel, IUserDbRefModel, ITcDbRefModel } from "../..";

export class AssignmentDbRefModel implements IAssignmentDbRefModel {

  constructor(
    public id: string = '',
    public user: DocumentReference<IUserDbRefModel>,
    public tcs: Array<DocumentReference<ITcDbRefModel>>
  ) { }
}