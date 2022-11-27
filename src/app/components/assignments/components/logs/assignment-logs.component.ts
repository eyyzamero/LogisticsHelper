import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssignmentLogType } from '../../enums';
import { IAssignmentLogModel } from '../../models';
import { AssignmentsObservableService } from '../../services/observable/assignments-observable.service';

@Component({
  selector: 'app-assignment-logs',
  templateUrl: './assignment-logs.component.html',
  styleUrls: ['./assignment-logs.component.scss'],
})
export class AssignmentLogsComponent implements OnInit, OnDestroy {

  logs: Array<IAssignmentLogModel> = new Array<IAssignmentLogModel>();
  
  private _assignmentId: string | null = null;
  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _assignmentsObservableService: AssignmentsObservableService
  ) { }

  ngOnInit(): void {
    this._initObservables();
  }

  navigateBackToAssignment(): void {
    this._router.navigate([`assignments/form/${this._assignmentId}`]);
  }

  getIcon(type: AssignmentLogType): string {
    let icon: string = '';
    
    switch(type) {
      case AssignmentLogType.CREATED:
        icon = 'document-outline';
        break;
      case AssignmentLogType.TC_ADDED:
      case AssignmentLogType.TC_EDITED:
        icon = 'cube-outline';
        break;
      case AssignmentLogType.MOVED_TO_HISTORY:
        icon = 'book-outline';
        break;
    }
    return icon;
  }

  private _initObservables(): void {
    const routeParamsSubscription = this._activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this._assignmentId = paramMap.get('id');
      
        if (this._assignmentId) 
          this._tryToGetAssignmentLogsFromObservable();
      }
    });
    this._subscriptions.push(routeParamsSubscription);
  }

  private _tryToGetAssignmentLogsFromObservable(): void {
    const assignment = this._assignmentsObservableService.observableSubjectValue.data.find(x => x.id === this._assignmentId);

    if (assignment) 
      this.logs = assignment.logs;
    else
      this._getAssignmentLogsFromDatabase();
  }

  private _getAssignmentLogsFromDatabase() {

  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}
