import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
//Provider
import { DataProvider } from '../../providers/data';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

	language: any;
	form: any;
  banners: any;
  selectedFile:any;
  bannerList: any;
  brandBanners: any;
  disableSubmit: boolean = false;
  
  constructor(public nav: NavController, public navParams: NavParams, public menuCtrl: MenuController, public dataProvider: DataProvider) {
    this.selectedFile = [];
  	this.form = {};
  	this.form.currency = "USD"
    this.form.client_id = "";
    this.form.environment_sandbox = "";
    this.form.bitcoin_address ="";

    this.dataProvider.getSetting().on('value', snapshot =>{
      if(snapshot.val()){
        this.form = snapshot.val();
      }  
    });

   
  }
 //*********** Save settings function **************/
	saveSetting(){
		this.dataProvider.addSettting(this.form)
		.then(() =>{
     this.dataProvider.currency = this.form.currency;
     this.nav.setRoot('HomePage');
		});
  }

    // Only enables right side menu for this page. Testing purposes.
    ionViewWillEnter() {
      this.menuCtrl.enable(true, 'menu-right');
    }
  
    ionViewWillLeave() {
      this.menuCtrl.enable(false, 'menu-right');
    }

}

   


