import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { TabsTilesComponent } from './components/tabs-tiles/tabs-tiles.component';
import { TabsNavigationComponent } from './components/tabs-navigation/tabs-navigation.component';

@NgModule({
  declarations: [
    TabsComponent,
    TabsNavigationComponent,
    TabsTilesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  exports: [
    TabsComponent
  ]
})
export class TabsModule { }
