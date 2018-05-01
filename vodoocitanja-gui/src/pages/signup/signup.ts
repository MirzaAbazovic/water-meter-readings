import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  resposeData: any;
  userData = { "username": "", "password": "","passwordConfirm": "", "email": "",
  "first_name": "", "last_name": "","role":"reader","user_id_readings":"" };
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth:AuthProvider, private storage: Storage, private toastCtrl: ToastController) {
  }
  home() {
    this.navCtrl.push('HomePage');
  }

  signup() {
    if (!(this.userData.username && this.userData.password 
      && this.userData.passwordConfirm && this.userData.email)) {
      this.presentToast("Molimo unesite podatke."); 
      return; 
    }
      if(this.userData.password != this.userData.passwordConfirm){
        this.presentToast("Lozinke se ne slazu."); 
        return; 
      }
      this.auth.singup(this.userData).subscribe((result) => {
        this.resposeData = result;
        console.log(this.resposeData);
        if(this.resposeData.status === 'success'){
          this.storage.set('userData', this.resposeData.user);
          this.navCtrl.push('ReadingsPage');  
        }
        else{
          console.error(this.resposeData.messsage);  
        }
      }, (err) => {
        let messages = JSON.stringify(JSON.parse(err.error).errors);
        this.presentToast(messages);//Connection failed message
      });
    }

  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
