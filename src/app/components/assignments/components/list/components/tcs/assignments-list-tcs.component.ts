import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAssignmentTcModel } from 'src/app/components/assignments/models';

@Component({
  selector: 'app-assignments-list-tcs',
  templateUrl: './assignments-list-tcs.component.html',
  styleUrls: ['./assignments-list-tcs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignmentsListTcsComponent {

  @Input() tcs: Array<IAssignmentTcModel> = new Array<IAssignmentTcModel>()

  constructor() { }
}
