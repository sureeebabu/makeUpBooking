import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
//Provider
import { AdminProfileProvider } from '../../providers/admin-profile';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {


	loginData:any;
  buttonText: any = "Reset Password";
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController,
  public adminProfile: AdminProfileProvider) {
  	this.loginData = [];
 }

 ionViewDidLoad() {
  console.log('ionViewDidLoad PasswordResetPage');
}

// Forgotten password function
 //*********** Login user with email and password **************/
  forgotten(){ 
    if(this.validate()){
      this.disableSubmit = true;
      this.buttonText = "Sending Mail..";
      this.adminProfile.forgotPass(this.loginData.email).then(() =>{
        return this.nav.push('LoginPage');
      }).catch(err => {this.handleError(err)});
    }
    let basicAlert = this.alertCtrl.create({
      title: 'Link Sent',
      subTitle: 'Check your email to reset your password',
      buttons: ['OK']
    });
    basicAlert.present();
  }
  
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
