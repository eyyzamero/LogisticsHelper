import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AssignmentsButtonActionType } from './enums';

@Component({
  selector: 'app-assignments-list-actions',
  templateUrl: './assignments-list-actions.component.html',
  styleUrls: ['./assignments-list-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignmentsListActionsComponent {

  @Input() assignmentId: string = '';

  @Output() edit: EventEmitter<string> = new EventEmitter<string>();
  @Output() history: EventEmitter<string> = new EventEmitter<string>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  readonly AssignmentsButtonActionType = AssignmentsButtonActionType;

  constructor() { }

  onButtonClick(type: AssignmentsButtonActionType) {
    if (type) {
      switch (type) {
        case AssignmentsButtonActionType.EDIT:
          this.edit.emit(this.assignmentId);
          break;
        case AssignmentsButtonActionType.MOVE_TO_HISTORY:
          this.history.emit(this.assignmentId);
          break;
        case AssignmentsButtonActionType.DELETE:
          this.delete.emit(this.assignmentId);
          break;
      }
    }
  }
}