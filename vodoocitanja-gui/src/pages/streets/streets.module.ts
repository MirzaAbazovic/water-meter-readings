import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StreetsPage } from './streets';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StreetsPage
  ],
  imports: [
    IonicPageModule.forChild(StreetsPage),
    ComponentsModule
  ],
  exports:[
    StreetsPage
  ]
})
export class StreetsPageModule {}
