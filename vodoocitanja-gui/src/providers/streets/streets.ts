import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Constants } from '../../constants';
import { StreetModel } from './../../model/street';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/flatMap';
import { ReadingModel } from '../../model/reading';
import { Settings } from '../settings/settings';
import { Constants } from '../../constants';
import { ToastController } from 'ionic-angular';

interface StreetsResponse {
  success: boolean;
  errors: string;
  readings_by_street: StreetModel[];
}

// interface ReadingsResponse {
//   readings: ReadingModel[];
// }

@Injectable()
export class StreetsProvider {
  isOffline;
  constructor(private http: HttpClient, private storage: Storage, private settings: Settings, private toastCtrl: ToastController) {
    this.settings.getValue('offline').then(p => { this.isOffline = p })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  downloadStreets() {
    Observable.fromPromise(this.settings.getValue(Constants.API_URL_KEY)).mergeMap(api =>
      Observable.fromPromise(this.storage.get('userData')).mergeMap((currentUser) => {
        return this.http.get<StreetsResponse>(`${api}/readings/streets`, {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.api_token),
        })
      })
    ).subscribe(streets => {
      this.storage.set('streets', streets);
      console.log('streets =>', streets);
      this.presentToast('Podaci za ulice skinuti');
    },
      err => {
        console.error(err);
      });

    Observable.fromPromise(this.settings.getValue(Constants.API_URL_KEY)).mergeMap(api =>
      Observable.fromPromise(this.storage.get('userData')).mergeMap((currentUser) => {
        return this.http.get<any>(`${api}/readings`, {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.api_token),
        })
      })
    ).subscribe(data => {
      
      const readingsGroups = data.readings.reduce(function (groups, item) {
        var val = item['sifra_ulice'];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
      }, {});
      console.log(readingsGroups);
      this.storage.set('readings', readingsGroups);

      this.presentToast('Podaci o očitanjima skinuti');
      //  console.log('readings =>',readings);
    },
      err => {
        console.error(err);
      });

  }
  uploadStreets(streetsData) {

    return Observable.fromPromise(this.settings.getValue(Constants.API_URL_KEY)).mergeMap(api =>
      Observable.fromPromise(this.storage.get('userData')).mergeMap((currentUser) => {
        return this.http.post<StreetsResponse>(`${api}/readings/streets`, streetsData, {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.api_token),
        })
      })
    );
  }

  getStreets(): Observable<any> {
    return Observable.fromPromise(this.settings.getValue('offline')).mergeMap(p => {
      this.isOffline = p
      if (this.isOffline) {
        return Observable.fromPromise(this.storage.get('streets'));
      }
      else {
        
        return Observable.fromPromise(this.settings.getValue(Constants.API_URL_KEY)).mergeMap(api =>
          Observable.fromPromise(this.storage.get('userData')).mergeMap((currentUser) => {
            return this.http.get<StreetsResponse>(`${api}/readings/streets`, {
              headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.api_token),
            })
          })
        );
      }
    });
  }


  getReadingsForStreet(streetId): Observable<any> {
    return Observable.fromPromise(this.settings.getValue('offline')).mergeMap(p => {
      this.isOffline = p
      if (this.isOffline) {
        
        return Observable.fromPromise(this.storage.get('readings')).map(p => {
          return p[streetId]
        });
      }
      else {
        
        return Observable.fromPromise(this.settings.getValue(Constants.API_URL_KEY)).mergeMap(api =>
          Observable.fromPromise(this.storage.get('userData')).mergeMap((currentUser) => {
            return this.http.get<any>(`${api}/readings/street/${streetId}`, {
              headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.api_token),
            }).map(p => p.readings)
          })
        );
      }
    });


    // return Observable.fromPromise(this.settings.getValue(Constants.API_URL_KEY)).mergeMap(api =>
    //   Observable.fromPromise(this.storage.get('userData')).mergeMap((currentUser) => {
    //     return this.http.get<ReadingsResponse>(`${api}/readings/street/${streetId}`, {
    //       headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.api_token),
    //     })
    //   })
    // );

  }

}
