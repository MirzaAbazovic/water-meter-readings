import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  resposeData: any;
  userData = { "username": "", "password": "" };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public auth: AuthProvider, private toastCtrl: ToastController, private storage: Storage) {
  }


  login() {
    if (this.userData.username && this.userData.password) {
      this.auth.login(this.userData).subscribe((result: any) => {
        console.log(result);
        if (result.status === 'success') {
          this.storage.set('userData', result.user);
          this.navCtrl.push('ReadingsPage');
        }
        else {
          this.presentToast("Korisnički podaci nisu ispravni");
        }
      }, 
      (err) => {
        console.log(err);
        this.presentToast("GREŠKA");

      });
    }
    else {
      this.presentToast("Molimo unseite korisničko ime i lozinku");
    }

  }

  home() {
    this.navCtrl.push('HomePage');
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
