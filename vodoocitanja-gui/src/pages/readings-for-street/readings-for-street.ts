import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { StreetsProvider } from '../../providers/streets/streets';
// import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@IonicPage({
  name: 'readings-for-street',
  segment: 'readings-for-street/:id'
})
@Component({
  selector: 'page-readings-for-street',
  templateUrl: 'readings-for-street.html',
})
export class ReadingsForStreetPage {
  total = 0;
  read = 0;
  unread = 0;
  streetId = '';
  streetName = '';
  readings = [];
  allReadings = [];

  // newReading$ = new Subject<{ newReading: string, reading: {zadnje_stanje: string, ocitano_stanje: boolean} }>();
  loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    private streetsProvider: StreetsProvider, public loadingCtrl: LoadingController) {
    this.streetId = this.navParams.get('id');
    console.log('this.streetId ', this.streetId);
  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.streetsProvider.getReadingsForStreet(this.streetId).subscribe((data) => {
      //console.log('data', data);
      this.loading.dismiss();
      if (data.length > 0) {
        this.readings = data
          .sort((a, b) => {
            if (a.kucni_broj === b.kucni_broj)
              return 0;
            if (a.kucni_broj > b.kucni_broj)
              return 1;
            if (a.kucni_broj < b.kucni_broj)
              return -1;
          });
        this.allReadings = JSON.parse(JSON.stringify(this.readings));
        this.streetName = this.readings[0].naziv_ulice;
      } else {
        this.presentToast('Nema aktivnih očitanja');
      }
    },
      (error) => {
        this.loading.dismiss();
      });

  }

  filterReadings(ev) {
    this.readings = JSON.parse(JSON.stringify(this.allReadings));
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.readings = this.readings.filter((reading) => {
        if (reading.naziv_korisnika !== null ) {
          //if (reading.naziv_korisnika !== null || reading.serijski_broj_vod !== null) {
          console.log(reading.naziv_korisnika);
          console.log(val);
        //  return (reading.naziv_korisnika.toLowerCase().indexOf(val.toLowerCase()) > -1 || reading.serijski_broj_vod.toLowerCase().indexOf(val.toLowerCase()) > -1);
          return (reading.naziv_korisnika.toLowerCase().indexOf(val.toLowerCase()) > -1 );
        }
      })
    }
  }

  goBack() {
    console.log(this.navCtrl);
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop().then(p => console.log('Can go back'));
    }
    else {
      this.navCtrl.push('StreetsPage')
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
