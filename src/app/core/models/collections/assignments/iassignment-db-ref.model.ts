import { DocumentReference } from '@angular/fire/compat/firestore';
import { AssignmentStatus } from 'src/app/components/assignments/enums';
import { IUserDbRefModel } from '../..';

export interface IAssignmentDbRefModel {
  id :string;
  status: AssignmentStatus;
  user: DocumentReference<IUserDbRefModel>;
}