import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { I18nSwitcherProvider } from '../../providers/i18n-switcher';



@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {

 

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private i18nSwitcherProvider: I18nSwitcherProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguagePage');
  
  }

  switch(lang: string) {
    this.i18nSwitcherProvider.switchLang(lang); //Switch language from the default
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
