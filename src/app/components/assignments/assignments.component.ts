import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FirestoreCollection } from 'src/app/core/enums';
import { IAssignmentDbRefModel, IBaseObservableModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { AuthObservableService } from 'src/app/core/services/observable/auth/auth-observable.service';
import { AssignmentAccordionModel } from './models';
import { AssignmentsMapperService } from './services/mapper/assignments-mapper.service';
import { AssignmentsObservableService } from './services/observable/assignments-observable.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignmentsComponent {

  assignments$: Observable<IBaseObservableModel<Array<AssignmentAccordionModel>>> = this._assignmentsObservableService.observable;

  private _assignmentsCollectionService: FirestoreCollectionService<IAssignmentDbRefModel>
  
  constructor(
    firestore: AngularFirestore,
    private _authObservableService: AuthObservableService,
    private _assignmentsObservableService: AssignmentsObservableService,
    private _assignmentsMapperService: AssignmentsMapperService
  ) {
    this._assignmentsCollectionService = new FirestoreCollectionService(firestore, FirestoreCollection.ASSIGNMENTS);
    this._getAssignments();
  }

  private async _getAssignments() {
    const userId = this._authObservableService.observableSubjectValue.data?.id;
    const assignments = await this._assignmentsCollectionService.getByUserRef(userId);

    if (assignments) {
      const mappedAssignments = this._assignmentsMapperService.ArrayOfIAssignmentDbRefModelToArrayOfIAssignmentAccordionModel(assignments);
      this._assignmentsObservableService.add(mappedAssignments);
    }
  }
}