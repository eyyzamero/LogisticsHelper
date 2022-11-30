import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments.component';
import { AssignmentFormComponent } from './components/form/assignment-form.component';
import { AssignmentsListComponent } from './components/list/assignments-list.component';
import { AssignmentLogsComponent } from './components/logs/assignment-logs.component';
import { AssignmentPalletsComponent } from './components/pallets/assignment-pallets.component';
import { AssignmentsTcsManagementPanelComponent } from './components/tcs-management-panel/assignments-tcs-management-panel.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentsComponent,
    children: [
      {
        path: '',
        component: AssignmentsListComponent
      },
      {
        path: 'form/:id',
        component: AssignmentFormComponent
      },
      {
        path: 'form/:id/tcs',
        component: AssignmentsTcsManagementPanelComponent
      },
      {
        path: 'form/:id/logs',
        component: AssignmentLogsComponent
      },
      {
        path: 'form/:id/pallets',
        component: AssignmentPalletsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AssignmentsRoutingModule { }