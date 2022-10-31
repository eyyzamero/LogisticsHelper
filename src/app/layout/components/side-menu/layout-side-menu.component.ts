import { Component, ViewChild } from '@angular/core';
import { IonMenu } from '@ionic/angular';
import { TabComponentType } from 'src/app/components/tabs/enums';

@Component({
  selector: 'app-layout-side-menu',
  templateUrl: './layout-side-menu.component.html',
  styleUrls: ['./layout-side-menu.component.scss'],
})
export class LayoutSideMenuComponent {

  @ViewChild('menu', { static: true }) menuRef!: IonMenu;

  readonly TabComponentType = TabComponentType;

  constructor() { }

  hideSideMenu() {
    this.menuRef.close();
  }
}