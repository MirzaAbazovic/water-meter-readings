import { ReadingModel } from './../../model/reading';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from './../../providers/auth/auth';
import { ReadingsProvider } from '../../providers/readings/readings';
import { StreetsProvider } from '../../providers/streets/streets';

@IonicPage()
@Component({
  selector: 'page-readings',
  templateUrl: 'readings.html',
})
export class ReadingsPage  {
  userFullName = "";
  currentReadings: ReadingModel[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    private storage: Storage, private auth: AuthProvider, private streets: StreetsProvider) {
    this.storage.get('userData').then((currentUser) => {
      this.userFullName = currentUser.last_name + ' ' + currentUser.first_name;
    });
  }

  
  goToStreets() {
    this.navCtrl.push('StreetsPage');
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  downloadStreetsData(){
    this.streets.downloadStreets();
  }
  settings(){
    this.navCtrl.push('SettingsPage');
   }
 
  uploadStreetsData() {
    this.presentToast('Trenutno nije implementirano');
  //   this.storage.get('streets').then((streetsData) => {
  //   this.streets.uploadStreets(streetsData)
  //   .subscribe(p=>{
  //     if(p.success)
  //     {
  //       this.presentToast('OK');
  //     } else{
  //       this.presentToast('ERROR')
  //     }
  //   })
  //   ,(err)=>{
  //     debugger;
  //     this.presentToast(err);
  //   }
  // });
  
}

  logout() {
    this.storage.get('userData').then((currentUser) => {
      console.log('currentUserData', currentUser);
      if (currentUser != null) {
        const token = currentUser.api_token;
        this.auth.logout(token).subscribe((resp) => {
          console.log(resp);
          //obrisi sve podatke
          this.storage.clear().then(() => {
            this.navCtrl.setRoot('HomePage');
          });
          // this.storage.remove('userData').then((result)=>
          // {
          //   console.log(result);
          //   this.navCtrl.setRoot('HomePage');
          // });
        });
      }
    });
  }

}
