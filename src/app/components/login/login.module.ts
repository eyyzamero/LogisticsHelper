import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LogoModule } from '../logo/logo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LogoModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    LoginRoutingModule
  ]
})
export class LoginModule { }
