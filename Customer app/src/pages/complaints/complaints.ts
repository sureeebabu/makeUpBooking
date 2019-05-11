import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import firebase from 'firebase';
//Providers
import { MessagesProvider } from '../../providers/message';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-complaints',
  templateUrl: 'complaints.html'
})
export class ComplaintsPage {

	form: any;
  errorMessage: any;
  disableSubmit: boolean = false;
  contat: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService,
    public messageProvider: MessagesProvider, public alertCtrl: AlertController) {

     this.form = {};
}
  // This is the function that Send message to the ADMIN
  sendmessage(form, id){
    let userId = firebase.auth().currentUser.uid;
     if(this.validate()){
            this.messageProvider.sendMessage(this.form.title, this.form.email, this.form.message, userId)
      .then( () =>{
        this.navCtrl.pop();
      });

      let basicAlert = this.alertCtrl.create({
        title: this.translate.instant('KEY15'), // Check KEY15 at assets/i18n/en.json
        subTitle: this.translate.instant('KEY16'), // Check KEY16 at assets/i18n/en.json
        buttons: [this.translate.instant('KEY12'),]  // Check KEY12 at assets/i18n/en.json
      });
      basicAlert.present();
    }
     }  
  
// Validate Message form
  validate(){
     if(this.form.title == undefined || this.form.title == ''){
      this.translate.get('KEY17').subscribe(res => {
        this.contat = res; // Check KEY17 at assets/i18n/en.json
      });
      this.errorMessage = this.contat;  
      return false;
    }

    if(this.form.email == undefined || this.form.email == ''){
      this.translate.get('KEY7').subscribe(res => {
        this.contat = res; // Check KEY17 at assets/i18n/en.json
      });
      this.errorMessage = this.contat; 
      return false;
    }

    if(this.form.message == undefined || this.form.message == ''){
      this.translate.get('KEY18').subscribe(res => {
        this.contat = res; // Check KEY18 at assets/i18n/en.json
      });
      this.errorMessage = this.contat; 
      return false;
    }

   
    return true;
  }
  
}


