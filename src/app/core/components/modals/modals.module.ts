import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    IonicModule
  ],
  exports: [
    DeleteModalComponent
  ]
})
export class CoreModalsModule { }