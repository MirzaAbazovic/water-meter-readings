import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Constants } from "../../constants";
import { Settings } from '../settings/settings';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../constants';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {

  // headers = new HttpHeaders().set("Accept", "application/x.readings.v1+json");
  
  constructor(private http: HttpClient, private settings : Settings ,private storage: Storage) { }

  singup(newUser) {

    return Observable.fromPromise(this.settings.getValue(Constants.API_URL_KEY)).mergeMap(api=>this.http.post(api + '/auth/register', newUser));
     
  }

  login(credentials) {
    return Observable.fromPromise(this.settings.getValue(Constants.API_URL_KEY)).mergeMap(api=>this.http.post(api + '/auth/login', credentials));
  }

  getUserToken() {
    return Observable.fromPromise(this.settings.getValue('userData')).map(userData=>userData.api_token);
  }

  logout(token) { return Observable.fromPromise(this.settings.getValue(Constants.API_URL_KEY)).mergeMap(api=>
    Observable.fromPromise(this.storage.get('userData')).mergeMap((currentUser) => {
     return this.http.post(`${api}/auth/logout`,{}, {
       headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.api_token),
      })
     })
   );
    // return this.http.post(Constants.HOME_URL +'/auth/logout', {}, {
    //   headers: new HttpHeaders().set('Authorization', 'Bearer ' + 'token'),
    // });
  }

}

