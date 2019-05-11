import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController, ViewController } from 'ionic-angular';
//Provider
import {  PrivacyProvider } from '../../providers/privacy';

@IonicPage()
@Component({
  selector: 'page-terms-privacy',
  templateUrl: 'terms-privacy.html',
})
export class TermsPrivacyPage {

  privacyList: any;
    
  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController, 
    public privacyProvider: PrivacyProvider, public alertCtrl: AlertController) {
    
    /**
   * fetch Privacy
   */
    this.privacyProvider.getPrivacy().on('value', snapshot => {
      this.privacyList = [];
      snapshot.forEach( snap => {
        this.privacyList.push({
          id: snap.key,
          privacy: snap.val().privacy,
          dateTime: snap.val().dateTime
        });

      });
    
     });
  }

  seeNofity(){
    this.navCtrl.push('TabsPage');
  }

  // This close modal with ViewController
  close() {
    this.viewCtrl.dismiss();
  }
  

 
}
