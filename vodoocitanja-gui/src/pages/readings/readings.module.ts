import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadingsPage } from './readings';

@NgModule({
  declarations: [
    ReadingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadingsPage),
    ComponentsModule
  ],
  exports:[
    ReadingsPage
  ]
})
export class ReadingsPageModule {}
