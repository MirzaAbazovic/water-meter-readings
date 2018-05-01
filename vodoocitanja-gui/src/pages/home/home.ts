import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Settings } from '../../providers/settings/settings';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private settingsProvider: Settings) {
    this.settingsProvider.load().then(curentSettings => console.log(curentSettings));
    this.storage.get('userData').then((currentUser) => {
      console.log('currentUserData', currentUser);
      if(currentUser!=null){
        this.navCtrl.setRoot('ReadingsPage');
      }
    });
  }

  login(){
    this.navCtrl.push('LoginPage');
   }
 
   signup(){
    this.navCtrl.push('SignupPage');
   }

   settings(){
    this.navCtrl.push('SettingsPage');
   }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
