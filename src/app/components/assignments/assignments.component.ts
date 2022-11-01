import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CommunicationState, FirestoreCollection } from 'src/app/core/enums';
import { IAssignmentDbRefModel, IBaseObservableModel, ITcDbRefModel } from 'src/app/core/models';
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

  readonly CommunicationState = CommunicationState;

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

  get randomProgressBarValue(): string {
    return Math.random().toFixed(2).replace(',', '.');
  }

  getProgressBarClass(value: string) {
    const number = Number(value);
    let className: string = '';

    if (!isNaN(number)) {
      if (number <= 0.33)
        className = 'low';
      else if (number <= 0.66)
        className = 'medium';
      else if (number <= 0.99)
        className = 'high';
      else
        className = 'complete';
    }
    return className;
  }

  toggle(item: AssignmentAccordionModel) {
    const opened = !item.opened;
    this._assignmentsObservableService.setOpened(item, opened);

    if (opened) {

    }
  }

  private async _getAssignments() {
    const userId = this._authObservableService.observableSubjectValue.data?.id;
    const assignments = await this._assignmentsCollectionService.getByUserRef(userId);

    if (assignments) {
      let mappedAssignments = this._assignmentsMapperService.ArrayOfIAssignmentDbRefModelToArrayOfIAssignmentAccordionModel(assignments);

      mappedAssignments.forEach(async assignment => {
        const assignmentDbRef = assignments.find(x => x.id === assignment.assignment.id);
        console.log(assignmentDbRef);
        const tcs = await this._getTcs(assignmentDbRef!);
        assignment.assignment.tcs = this._assignmentsMapperService.ArrayOfITcDbRefToArrayOfIAssignmentTcModel(tcs);
      });
      console.log(mappedAssignments);
      this._assignmentsObservableService.add(mappedAssignments);
    }
  }

  private async _getTcs(assignment: IAssignmentDbRefModel): Promise<Array<ITcDbRefModel>> {
    // TODO Refactor this shit
    // get those tcs by document references from collection service
    const tcs = new Array<ITcDbRefModel>();

    assignment.tcs?.forEach(async tcDocRef => {
      const tc = (await tcDocRef.get()).data();

      if (tc)
        tcs.push(tc)
    });
    return tcs;
  }
}