import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AssignmentsComponent } from './assignments.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { LoaderModule } from '../common/loader/loader.module';
import { DirectivesModule } from 'src/app/core/directives/directives.module';

@NgModule({
  declarations: [
    AssignmentsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    IonicModule,
    LoaderModule,
    DirectivesModule,
    AssignmentsRoutingModule
  ]
})
export class AssignmentsModule { }