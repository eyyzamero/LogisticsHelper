import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-layout-toolbar-logo',
  templateUrl: './layout-toolbar-logo.component.html',
  styleUrls: ['./layout-toolbar-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutToolbarLogoComponent {

  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
}