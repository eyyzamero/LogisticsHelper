import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { LayoutToolbarComponent } from './components/toolbar/layout-toolbar.component';
import { LayoutSideMenuComponent } from './components/side-menu/layout-side-menu.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutToolbarComponent,
    LayoutSideMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }