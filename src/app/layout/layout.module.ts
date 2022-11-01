import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { LayoutToolbarComponent } from './components/toolbar/layout-toolbar.component';
import { LayoutSideMenuComponent } from './components/side-menu/layout-side-menu.component';
import { IonicModule } from '@ionic/angular';
import { TabsModule } from '../components/tabs/tabs.module';
import { LayoutToolbarLogoComponent } from './components/toolbar/components/toolbar-logo/layout-toolbar-logo.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutToolbarLogoComponent,
    LayoutToolbarComponent,
    LayoutSideMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TabsModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }