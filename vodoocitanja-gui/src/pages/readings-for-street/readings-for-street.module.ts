import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadingsForStreetPage } from './readings-for-street';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ReadingsForStreetPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ReadingsForStreetPage),
  ],
})
export class ReadingsForStreetPageModule {}
