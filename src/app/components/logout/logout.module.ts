import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutComponent } from './logout.component';
import { LogoModule } from '../logo/logo.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LogoutComponent
  ],
  imports: [
    CommonModule,
    LogoModule,
    TranslateModule.forChild(),
    LogoutRoutingModule
  ]
})
export class LogoutModule { }