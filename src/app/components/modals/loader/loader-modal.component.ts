import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader-modal',
  templateUrl: './loader-modal.component.html',
  styleUrls: ['./loader-modal.component.scss']
})
export class LoaderModalComponent {

  @Input() text: string = '';
  
  constructor() { }
}