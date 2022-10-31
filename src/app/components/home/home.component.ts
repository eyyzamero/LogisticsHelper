import { Component } from '@angular/core';
import { TabComponentType } from '../tabs/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  readonly TabComponentType = TabComponentType;

  constructor() { }
}