import { Component } from '@angular/core';
//Firebase
import firebase from 'firebase';
//Provider
import { AdminProfileProvider } from '../../providers/admin-profile';
import { Alert, AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
  
  public signupForm: FormGroup;
  public loading: Loading;
   public shipping;
   public fireAuth: any;
  
   constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
    public adminProfile: AdminProfileProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
 
     this.fireAuth = firebase.auth();
 
     this.signupForm = formBuilder.group ({
       email: ['',Validators.compose([Validators.required, EmailValidator.isValid])],
       password: ['',Validators.compose([Validators.required,Validators.minLength(6)])
     ]
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  
    signupUser(): void{
      if(!this.signupForm.valid) {
         console.log(`Form is not valid yet, current value: ${this.signupForm.value}`);
 
      } else {
         const email = this.signupForm.value.email;
         const password = this.signupForm.value.password;
           this.adminProfile.signupUser(email, password).then(authData => {
              this.loading.dismiss().then(() => {
               this.navCtrl.setRoot('HomePage');
              });
           },
         error => {
              this.loading.dismiss().then(() => {
              const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{text:'Ok', role:'cancel'}]
             });
         alert.present();
          });
        }
       
       );
        this.loading = this.loadingCtrl.create();
        this.loading.present();
     }
   }
 

  gologin() {
    this.navCtrl.push('LoginPage');
  }

  }


