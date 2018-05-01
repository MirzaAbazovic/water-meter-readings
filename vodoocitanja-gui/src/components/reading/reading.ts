import { ReadingModel } from './../../model/reading';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { DecimalPipe } from '@angular/common';
import { ReadingsProvider } from '../../providers/readings/readings';
import { debounceTime } from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-reading',
  templateUrl: 'reading.html'
})
export class ReadingComponent implements OnInit {

  @Input()
  reading: ReadingModel;

  readingForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private readingsProvider: ReadingsProvider) { }

  ngOnInit(): void {
    this.readingForm = this.formBuilder.group({
      // aktivno : this.reading.aktivno,
      id: this.reading.id,
      kucni_broj: this.reading.kucni_broj,
      serijski_broj_vod: this.reading.serijski_broj_vod,
      naziv_korisnika: this.reading.naziv_korisnika,
      ocitano_stanje: this.reading.ocitano_stanje,
      reset_brojila: this.reading.reset_brojila,
      napomena: this.reading.napomena,
      zadnje_stanje: this.reading.zadnje_stanje,
      sifra_ulice: this.reading.sifra_ulice,
      status_ocitanja:[{value: this.reading.status_ocitanja, disabled: true}]
    });

    this.readingForm.get('ocitano_stanje').valueChanges.debounceTime(1000).subscribe(ocitano_stanje => {     
      const id: number = this.readingForm.get('id').value;
      const reset_brojila: boolean = this.readingForm.get('reset_brojila').value;
      const napomena: string = this.readingForm.get('napomena').value;
      const sifra_ulice: string = this.readingForm.get('sifra_ulice').value;
      let  status_ocitanja: boolean = this.readingForm.get('status_ocitanja').value;
      if(reset_brojila &&  parseInt(ocitano_stanje)>0){
         status_ocitanja = true;
      }
      else{
        status_ocitanja = parseInt(ocitano_stanje) > parseInt(this.readingForm.get('zadnje_stanje').value);
      }
      this.readingsProvider
      .updateReading(this.readingForm.value)
      .subscribe(v=>{
        console.log(v);
        this.readingForm.patchValue({ 'status_ocitanja': status_ocitanja });  
        //this.readingForm.patchValue({ 'status_ocitanja': parseInt(ocitano_stanje) > parseInt(this.readingForm.get('zadnje_stanje').value) });
      })
    });

    this.readingForm.get('reset_brojila').valueChanges.debounceTime(1000).subscribe(reset_brojila => {
      const id: number = this.readingForm.get('id').value;
      let ocitano_stanje: number = parseInt(this.readingForm.get('ocitano_stanje').value);
      if(ocitano_stanje==null){
        ocitano_stanje=0;
      }
      const napomena: string = this.readingForm.get('napomena').value;
      let status_ocitanja  = this.readingForm.get('status_ocitanja').value;
      if(reset_brojila &&  ocitano_stanje>0){
        status_ocitanja = true;
     }
     else{
       status_ocitanja = ocitano_stanje > parseInt(this.readingForm.get('zadnje_stanje').value);
     }
      this.readingsProvider
      .updateReading(this.readingForm.value)
      .subscribe(v=>{
        this.readingForm.patchValue({ 'status_ocitanja': status_ocitanja });  
      })
    });

    this.readingForm.get('napomena').valueChanges.debounceTime(1000).subscribe(napomena => {
      const id: number = this.readingForm.get('id').value;
      let  ocitano_stanje = this.readingForm.get('ocitano_stanje').value;
      if(ocitano_stanje==null){
        ocitano_stanje=0;
      }
      else{
        ocitano_stanje = parseInt(ocitano_stanje);
      }
      const reset_brojila: boolean = this.readingForm.get('reset_brojila').value;
      const status_ocitanja : boolean = ocitano_stanje > parseInt(this.readingForm.get('zadnje_stanje').value);
      this.readingsProvider
      .updateReading(this.readingForm.value)
      .subscribe(console.log);
    });

    // this.readingForm.get('status_ocitanja').valueChanges.debounceTime(1000).subscribe(status_ocitanja => {
    //   const id: number = this.readingForm.get('id').value;
    //   let ocitano_stanje: number = this.readingForm.get('ocitano_stanje').value;
    //   if(ocitano_stanje==null){
    //     ocitano_stanje=0;
    //   }const reset_brojila: boolean = this.readingForm.get('reset_brojila').value;
    //   const napomena: string = this.readingForm.get('napomena').value;
    //   this.readingsProvider
    //   .updateReading({'id': id, 'reset_brojila': reset_brojila ,'ocitano_stanje': ocitano_stanje ,'napomena':napomena, 'status_ocitanja': status_ocitanja})
    //   .subscribe(console.log);
    // });

  }

}
