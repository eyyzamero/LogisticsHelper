import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AssignmentsComponent } from './assignments.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { LoaderModule } from '../common/loader/loader.module';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { AssignmentsListComponent } from './components/list/assignments-list.component';
import { AssignmentsTcsSummaryComponent } from './components/tcs-summary/assignments-tcs-summary.component';
import { AssignmentFormComponent } from './components/form/assignment-form.component';
import { AssignmentsListActionsComponent } from './components/list/components/actions/assignments-list-actions.component';
import { AssignmentsFormTcModalComponent } from './components/form/components/modals/add-tcs/assignments-form-tc-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentsFormAddPalletModalComponent } from './components/form/components/modals/add-pallet/assignments-form-add-pallet-modal.component';
import { AssignmentsTcsManagementPanelComponent } from './components/tcs-management-panel/assignments-tcs-management-panel.component';
import { AssignmentsTcFormComponent } from './components/tc-form/assignments-tc-form.component';
import { CoreModalsModule } from 'src/app/core/components/modals/modals.module';

@NgModule({
  declarations: [
    AssignmentsComponent,
    AssignmentsListComponent,
    AssignmentsTcsSummaryComponent,
    AssignmentsListActionsComponent,
    AssignmentFormComponent,
    AssignmentsFormTcModalComponent,
    AssignmentsFormAddPalletModalComponent,
    AssignmentsTcsManagementPanelComponent,
    AssignmentsTcFormComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    IonicModule,
    LoaderModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModalsModule,
    AssignmentsRoutingModule
  ]
})
export class AssignmentsModule { }