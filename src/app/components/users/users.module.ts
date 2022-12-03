import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { TranslateModule } from '@ngx-translate/core';
import { UsersFormComponent } from './components/form/users-form.component';
import { IonicModule } from '@ionic/angular';
import { UsersFormModalComponent } from './components/modals/users-form-modal/users-form-modal.component';

@NgModule({
  declarations: [
    UsersComponent,
    UsersFormComponent,
    UsersFormModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    IonicModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
