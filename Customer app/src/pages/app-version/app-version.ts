import { Component } from '@angular/core';
import { NavController, ViewController, IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
 
@IonicPage()
@Component({
  selector: 'page-app-version',
  templateUrl: 'app-version.html'
})
export class AppVersionPage {
  appinfo: any[];
 
  constructor(public navCtrl: NavController, private http: Http, public viewCtrl: ViewController) {
    let localData = http.get('assets/appversion.json').map(res => res.json().app);
    localData.subscribe(data => {
      this.appinfo = data;  // Get app version from json file in assets
    })
  }
 
  close() { 
    this.viewCtrl.dismiss(); // close modal with viewController
  }

}