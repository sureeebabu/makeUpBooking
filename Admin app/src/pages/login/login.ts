import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, Loading, LoadingController, 
NavController, NavParams} from 'ionic-angular';
//Provider
import { AdminProfileProvider } from '../../providers/admin-profile';
// Form builder
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  public loginForm: FormGroup;
  public loading: Loading;
   public shipping;
   
   
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
   public adminProfile: AdminProfileProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

 //*********** Validate email and password **************/
    this.loginForm = formBuilder.group ({
      email: ['',Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',Validators.compose([Validators.required,Validators.minLength(6)])
    ]
  });

   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  
 //*********** Login user with email and password **************/
  loginUser(): void{
     if(!this.loginForm.valid) {
        console.log(`Form is not valid yet, current value: ${this.loginForm.value}`);

     } else {
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
          this.adminProfile.loginUser(email, password).then(authData => {
             this.loading.dismiss().then(() => {
              this.navCtrl.setRoot('HomePage');
            });
        error => {
             this.loading.dismiss().then(() => {
             const alert: Alert = this.alertCtrl.create({
             message: error.message,
             buttons: [{text:'Ok', role:'cancel'}]
            });
        alert.present();
         });
       }
      }
      );
       this.loading = this.loadingCtrl.create();
       this.loading.present();
    }
  }

// Navigate to Reset password page
  forgotten(){
    this.navCtrl.push('ForgotPasswordPage');
  }

// Navigate to sign up page
goSignup(): void {
  this.navCtrl.push('SignupPage');
}
  
  

 
}