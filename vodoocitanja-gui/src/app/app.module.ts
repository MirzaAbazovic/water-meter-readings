import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { StreetsProvider } from '../providers/streets/streets';
import { VersionInterceptor } from './interceptors/version.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { Settings } from '../providers/settings/settings';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { ReadingsProvider } from '../providers/readings/readings';
import { Geolocation } from '@ionic-native/geolocation';

// the second parameter 'fr' is optional
registerLocaleData(localeDe, 'de');
export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    offline: false,
    apiUrl: 'https://vitkom.ba/api'
    //apiUrl: 'http://localhost:81/api'
  });
}
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    StreetsProvider,
    [ { provide: HTTP_INTERCEPTORS, useClass: VersionInterceptor, multi: true } ],
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    ReadingsProvider,
  ]
})
export class AppModule {}
