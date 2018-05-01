import { NgModule } from '@angular/core';
import { ReadingListComponent } from './reading-list/reading-list';
import { ReadingComponent } from './reading/reading';
import { CommonModule } from '@angular/common';
import { StreetComponent } from './street/street';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [
        ReadingListComponent,
        ReadingComponent,
        StreetComponent],
	imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule 
    ],
	exports: [
        ReadingListComponent,
        ReadingComponent,
        StreetComponent]
})
export class ComponentsModule {}
