import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments.component';
import { AssignmentFormComponent } from './components/form/assignment-form.component';
import { AssignmentsListComponent } from './components/list/assignments-list.component';

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