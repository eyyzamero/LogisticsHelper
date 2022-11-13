import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAssignmentTcModel } from 'src/app/components/assignments/models';

@Component({
  selector: 'app-assignments-tcs',
  templateUrl: './assignments-tcs.component.html',
  styleUrls: ['./assignments-tcs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignmentsTcsComponent {

  @Input() tcs: Array<IAssignmentTcModel> = new Array<IAssignmentTcModel>()

  constructor() { }

  getInnersCount(tc: IAssignmentTcModel): number {
    const count = tc.pallets.reduce<number>((accumulator, current) => {
      return accumulator + current.inners
    }, 0);
    return count;
  }

  getInnersCountPercentage(tc: IAssignmentTcModel): string {
    const count = this.getInnersCount(tc);
    return (count / tc.limit).toFixed(2);
  }
}
