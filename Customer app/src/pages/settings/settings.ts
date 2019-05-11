import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
//Plugin
import { AppRate } from '@ionic-native/app-rate';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  myBooking: boolean = true;
  comments: boolean = true;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public modalCtrl: ModalController, public appRate:AppRate) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  //These are the functions that open modal pages
  openLangModal(){
    this.openModal('LanguagePage');
  }

  openTermsModal(){
    this.openModal('TermsPrivacyPage');
  }

  openFaqModal(){
    this.openModal('FaqPage');
  }

  openAppVersionModal(){
    this.openModal('AppVersionPage');
  }

openModal(pageName) {
  this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
                .present();
}

rateApp(){
  this.appRate.preferences.storeAppURL = {
    ios: '1234567890',
    android: 'market://details?id=io.dbsmakeup.starter',  //Change this to your unique app id botfor android & ios
    windows: 'ms-windows-store://review/?ProductId=< Store_ID >'
    };

    this.appRate.promptForRating(true); 
} 






}

