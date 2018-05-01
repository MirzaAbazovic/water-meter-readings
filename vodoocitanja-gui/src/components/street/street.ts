import { Component, Input } from '@angular/core';
import { StreetModel } from '../../model/street';

@Component({
  selector: 'street',
  templateUrl: 'street.html'
})
export class StreetComponent {

  @Input()
  street: StreetModel;

  constructor() {
  }

}
