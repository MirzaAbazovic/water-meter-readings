import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings } from '../settings/settings';
// import { StreetModel } from './../../model/street';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { ReadingModel } from '../../model/reading';
import { Constants } from '../../constants';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class ReadingsProvider {
  isOffline;
  token;
  constructor(public http: HttpClient, private storage: Storage, private settings: Settings, private geolocation: Geolocation) {
    this.settings.getValue('offline').then(val => this.isOffline = val);
  }

  updateReading(reading): Observable<any> {
    reading.datum_ocitanja = new Date();
    return Observable.fromPromise(this.geolocation.getCurrentPosition().then((resp) => {
      reading.lokacija_ocitanja = `lat:${resp.coords.latitude}|lon:${resp.coords.longitude}`;
      return this.saveData(reading);
    }
    ).catch(err => {
      reading.lokacija_ocitanja = '';
      return this.saveData(reading);
    })
    );
  }

  private saveData(reading: ReadingModel): Observable<any> {
    if (this.isOffline) {
      return Observable.fromPromise(this.storage.get('readings').then(readings => {
        let readingFromStorage = readings[reading.sifra_ulice].find(p => p.id == reading.id);
        readingFromStorage.ocitano_stanje = reading.ocitano_stanje;
        readingFromStorage.datum_ocitanja = reading.datum_ocitanja;
        readingFromStorage.napomena = reading.napomena;
        readingFromStorage.reset_brojila = reading.reset_brojila;
        this.storage.set('readings', readings);
      }));
    } else {
      Observable.fromPromise(this.settings.getValue(Constants.API_URL_KEY)).mergeMap(api =>
        Observable.fromPromise(this.storage.get('userData')).mergeMap((currentUser) => {
          return this.http.put(`${api}/readings/${reading.id}`,reading,{
              headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.api_token)
            })
        })
      ).subscribe();
    }
  }
}
