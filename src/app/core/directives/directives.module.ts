import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonProgressBarColorDirective } from './ion-progress-bar-color/ion-progress-bar-color.directive';

@NgModule({
  declarations: [
    IonProgressBarColorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IonProgressBarColorDirective
  ]
})
export class DirectivesModule { }