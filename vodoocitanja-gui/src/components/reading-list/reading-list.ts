import { ReadingModel } from './../../model/reading';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'reading-list',
  templateUrl: 'reading-list.html'
})
export class ReadingListComponent {
  
  @Input()
  readings:ReadingModel[];

  constructor() {
    console.log('Hello ReadingListComponent Component');
  }

}
