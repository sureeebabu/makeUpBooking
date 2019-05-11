import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  imageUrl = "assets/imgs/intro1.png";
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }


  goTabs(){
    this.navCtrl.setRoot('TabsPage');
  }


}
