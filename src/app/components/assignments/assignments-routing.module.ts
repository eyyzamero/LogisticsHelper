import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthObservableModelObtainedGuard } from 'src/app/core/guards/auth-observable-model-obtained.guard';
import { AssignmentsComponent } from './assignments.component';
import { AssignmentsListComponent } from './components/list/assignments-list.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentsComponent,
    children: [
      {
        path: '',
        component: AssignmentsListComponent
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