import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthObservableModelObtainedGuard } from 'src/app/core/guards/auth-observable-model-obtained.guard';
import { AssignmentsComponent } from './assignments.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentsComponent,
    canActivate: [
      AuthObservableModelObtainedGuard
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