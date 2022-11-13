import { DocumentReference } from '@angular/fire/compat/firestore';
import { AssignmentStatus } from 'src/app/components/assignments/enums';
import { IAssignmentDbRefModel, IUserDbRefModel } from '../..';

export class AssignmentDbRefModel implements IAssignmentDbRefModel {

  constructor(
    public id: string = '',
    public status: AssignmentStatus = AssignmentStatus.ACTIVE,
    public user: DocumentReference<IUserDbRefModel>
  ) { }
}