import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-assignments-form-tc-modal',
  templateUrl: './assignments-form-tc-modal.component.html',
  styleUrls: ['./assignments-form-tc-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignmentsFormTcModalComponent {

  @Input() title: string = '';
  @Input() assignmentId: string = '';
  @Input() tcId: string = '';
}