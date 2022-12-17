import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-layout-side-menu',
  templateUrl: './layout-side-menu.component.html',
  styleUrls: ['./layout-side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSideMenuComponent {

  @ViewChild('menu', { static: true }) menuRef!: IonMenu;
  
  hideSideMenu(): void {
    this.menuRef.close();
  }
}