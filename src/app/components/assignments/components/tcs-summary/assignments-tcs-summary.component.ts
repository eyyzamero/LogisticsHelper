import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAssignmentTcModel } from 'src/app/components/assignments/models';

@Component({
  selector: 'app-assignments-tcs-summary',
  templateUrl: './assignments-tcs-summary.component.html',
  styleUrls: ['./assignments-tcs-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignmentsTcsSummaryComponent {

  @Input() tcs: Array<IAssignmentTcModel> = new Array<IAssignmentTcModel>()

  constructor() { }

  getInnersCount(tc: IAssignmentTcModel): number {
    const count = tc.pallets.reduce<number>((accumulator, current) => {
      return accumulator + current.inners
    }, 0);
    return count;
  }

  getInnersCountPercentage(tc: IAssignmentTcModel): number {
    const count = this.getInnersCount(tc);
    return Number((count / tc.limit).toFixed(2));
  }
}
