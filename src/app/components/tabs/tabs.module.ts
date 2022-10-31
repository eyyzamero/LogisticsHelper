import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { TabsTilesComponent } from './components/tabs-tiles/tabs-tiles.component';
import { TabsNavigationComponent } from './components/tabs-navigation/tabs-navigation.component';

@NgModule({
  declarations: [
    TabsNavigationComponent,
    TabsTilesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  exports: [
    TabsNavigationComponent,
    TabsTilesComponent
  ]
})
export class TabsModule { }
