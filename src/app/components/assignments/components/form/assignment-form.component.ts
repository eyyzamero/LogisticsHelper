import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssignmentModel, IAssignmentModel } from '../../models';
import { AssignmentsObservableService } from '../../services/observable/assignments-observable.service';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.scss'],
})
export class AssignmentFormComponent implements OnInit, OnDestroy {

  assignment: IAssignmentModel = new AssignmentModel();

  private _assignmentId: string | null = null;
  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _assignmentsObservableService: AssignmentsObservableService
  ) { }

  ngOnInit(): void {
    this._initObservables();
  }

  private _initObservables(): void {
    const routeParamsSubscription = this._activatedRoute.paramMap.subscribe({
      next: (paramMap) => this._assignmentId = paramMap.get('id')
    });
    const assignmentsSubscription = this._assignmentsObservableService.observable.subscribe({
      next: (value) => {
        if (this._assignmentId) 
          this._checkIfAssignmentIsInObservable(value.data);
      }
    });
    this._subscriptions.push(routeParamsSubscription, assignmentsSubscription);
  }

  private _checkIfAssignmentIsInObservable(assignments: Array<IAssignmentModel>): void {
    const assignment = assignments.find(x => x.id === this._assignmentId);

    if (assignment)
      this.assignment = assignment;
    else
      this._getAssignment();
  }

  private async _getAssignment(): Promise<void> {

  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}