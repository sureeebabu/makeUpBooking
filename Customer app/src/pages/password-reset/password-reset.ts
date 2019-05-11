import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { TranslateService } from '@ngx-translate/core';
//Providers


@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {


	loginData:any;
  buttonText: any = "Reset Password";
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController,
  public auth: Auth, public translate: TranslateService) {
  	this.loginData = [];
 }

 ionViewDidLoad() {
  console.log('ionViewDidLoad PasswordResetPage');
}

// Forgotten password function
  forgotten(){ 
    if(this.validate()){
      this.disableSubmit = true;
      this.buttonText = "Sending Mail..";
      this.auth.forgotPass(this.loginData.email).then(() =>{
        return this.nav.push('LoginPage');
      }).catch(err => {this.handleError(err)});
    }
    let basicAlert = this.alertCtrl.create({
      title:  this.translate.instant('KEY38'), // Check KEY38/39/12 at assets/i18n/en.json
      subTitle:  this.translate.instant('KEY39'), 
      buttons: [ this.translate.instant('KEY12')]
    });
    basicAlert.present();
  }
  // error handler
  handleError(err){
        this.disableSubmit = false;
        this.buttonText = "Reset Password";
        console.log(err.code);
        this.errorMessage = err.message;
        this.disableSubmit = false;
  }

  //Form validations
  validate(){
    if(this.loginData.email == undefined || this.loginData.email == ''){
      this.errorMessage = 'Please enter email';
      return false;
    }
    return true;
  }
  
}
