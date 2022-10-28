import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { LayoutToolbarComponent } from './components/toolbar/layout-toolbar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutToolbarComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }