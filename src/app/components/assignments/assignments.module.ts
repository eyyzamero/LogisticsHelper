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
import { AssignmentsListActionsComponent } from './components/list/components/actions/assignments-list-actions.component';
import { AssignmentsFormAddTcsModalComponent } from './components/form/components/modals/add-tcs/assignments-form-add-tcs-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AssignmentsComponent,
    AssignmentsListComponent,
    AssignmentsListTcsComponent,
    AssignmentsListActionsComponent,
    AssignmentFormComponent,
    AssignmentsFormAddTcsModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    IonicModule,
    LoaderModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    AssignmentsRoutingModule
  ]
})
export class AssignmentsModule { }