import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { StreetsProvider } from '../../providers/streets/streets';
import { StreetModel } from '../../model/street';

@IonicPage()
@Component({
  selector: 'page-streets',
  templateUrl: 'streets.html',
})
export class StreetsPage {
  userFullName = "";
  loading;
  streets: StreetModel[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    private streetsProvider: StreetsProvider, public loadingCtrl: LoadingController) { }

  ionViewDidEnter() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.streetsProvider.getStreets().subscribe(
      (data) => {
        this.loading.dismiss();
        if (data == null || data.readings_by_street.length == 0) {
          this.presentToast('Nema aktivnih očitanja');
        }
        else {
          this.streets = data.readings_by_street;
        }

      },
      (error) => {
        this.loading.dismiss();
      });

  }
  streetSelected(street) {
    this.navCtrl.push('readings-for-street', { 'id': street.sifra_ulice })
    console.log(street);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
