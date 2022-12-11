import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { TranslateModule } from '@ngx-translate/core';
import { UsersFormComponent } from './components/forms/form/users-form.component';
import { IonicModule } from '@ionic/angular';
import { UsersFormModalComponent } from './components/modals/users-form/users-form-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersListComponent } from './components/list/users-list.component';
import { UsersListTableComponent } from './components/list/components/table/users-list-table.component';
import { UsersListAccordionsComponent } from './components/list/components/accordions/users-list-accordions.component';
import { LoaderModule } from '../common/loader/loader.module';
import { UsersChangePasswordFormModalComponent } from './components/modals/users-change-password/users-change-password-form-modal.component';
import { UsersChangePasswordFormComponent } from './components/forms/change-password/users-change-password-form.component';
import { UsersChangeEmailFormComponent } from './components/forms/change-email/users-change-email-form.component';
import { UsersChangeEmailFormModalComponent } from './components/modals/change-email-form/users-change-email-form-modal.component';

@NgModule({
  declarations: [
    UsersComponent,
    UsersFormComponent,
    UsersFormModalComponent,
    UsersListComponent,
    UsersListTableComponent,
    UsersListAccordionsComponent,
    UsersChangePasswordFormComponent,
    UsersChangePasswordFormModalComponent,
    UsersChangeEmailFormComponent,
    UsersChangeEmailFormModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
