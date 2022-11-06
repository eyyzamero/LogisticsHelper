import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AssignmentsComponent } from './assignments.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { LoaderModule } from '../common/loader/loader.module';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { AssignmentsListComponent } from './components/list/assignments-list.component';
import { AssignmentsListTcsComponent } from './components/list/components/tcs/assignments-list-tcs.component';
import { AssignmentFormComponent } from './components/form/assignment-form.component';

@NgModule({
  declarations: [
    AssignmentsComponent,
    AssignmentsListComponent,
    AssignmentsListTcsComponent,
    AssignmentFormComponent
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