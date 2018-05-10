import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Settings } from '../../providers/settings/settings';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  options: any;
  settingsReady = false;
  form: FormGroup;
  apis;

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    private http:HttpClient
    ) {
      this.http.get('assets/config.json').subscribe(p=>{
        console.log(p);
        debugger;
        this.apis = p['apis'];
      });
    }

  _buildForm() {
    let group: any = {
      offline: [this.options.offline],
      apiUrl: [this.options.apiUrl],
    };
    this.form = this.formBuilder.group(group);
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.settings.merge(this.form.value);
    });
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;
      this._buildForm();
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }
  home() {
    this.navCtrl.push('HomePage');
  }
}
