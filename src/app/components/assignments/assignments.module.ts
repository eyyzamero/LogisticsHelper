import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AssignmentsComponent } from './assignments.component';

@NgModule({
  declarations: [
    AssignmentsComponent
  ],
  imports: [
    CommonModule,
    AssignmentsRoutingModule
  ]
})
export class AssignmentsModule { }