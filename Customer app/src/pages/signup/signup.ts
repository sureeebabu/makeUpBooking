  import { Component, NgZone } from '@angular/core';
  import { Auth } from '../../providers/auth';
  import { LoadingController, AlertController} from 'ionic-angular';
  import { NavController, NavParams, IonicPage } from 'ionic-angular';
  // Providers
  import { Values } from '../../providers/values';
  import { Functions } from '../../providers/functions/functions';
  import { DataProvider } from '../../providers/data'; 
  import firebase from 'firebase';
  import { TranslateService } from '@ngx-translate/core';
  
 
  @IonicPage()
  @Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
  })
  export class SignupPage {
  
    error: any;
    zone: NgZone;
    form: any;
    isLoggedIn: boolean = false;
    customerList:any;
    currentUser: any;
    userProfiles: any = null;
    errorRegisterMessage: any;
    disableRegister: boolean = false;
    buttonText: any = "Register Account";
    contat: any;

    constructor(public nav: NavController, public navParams: NavParams, public functions: Functions, public auth: Auth, 
      public loadingCtrl: LoadingController, public alertCtrl:AlertController, public values:Values, 
       public dataProvider: DataProvider, public translate:  TranslateService) {
      
      this.form = {};
      this.auth = auth;
      this.customerList = firebase.database().ref('/Customer-List'); 
      this.zone = new NgZone({});
    
    }
  // Signup function here
    register() {
      if(this.validateRegister(this.form)){
        this.disableRegister = true;
        let loading = this.loadingCtrl.create({
          content: this.translate.instant('KEY31'), 
          spinner: 'crescent',
          duration: 3000
        });
        this.buttonText = "Registering...";
        this.auth.register(this.form.email, this.form.password, this.form.firstName, this.form.lastName)
        .then(() => {
          this.nav.setRoot('LoginPage');
          this.currentUser = firebase.auth().currentUser;
            this.dataProvider.getUserProfile(this.currentUser.uid).on('value', (snapshot) =>{
             this.userProfiles = snapshot.val(); 
        });
          
          this.disableRegister = false;
          this.buttonText = "Register Account";
        }).catch(err => {this.handleRegisterError(err)});
        
        loading.onDidDismiss(() => {
          console.log('Dismissed loading');
        });
      
        loading.present();
      
      } 

    }


    handleRegisterError(err){
      console.log(err.code);
      this.errorRegisterMessage = err.message;
      this.disableRegister = false;
      this.buttonText = "Register Account";
    }

    //Form Validation here
    validateRegister(form){
      if(this.form.firstName == undefined || this.form.firstName == ''){
        this.translate.get('KEY40').subscribe(res => {
          this.contat = res;// Check KEY40 at assets/i18n/en.json
        });
        this.errorRegisterMessage = this.contat;
        return false;
      }
      if(this.form.lastName == undefined || this.form.lastName == ''){
        this.translate.get('KEY41').subscribe(res => {
          this.contat = res; // Check KEY41 at assets/i18n/en.json
        });
        this.errorRegisterMessage = this.contat;
        return false;
      }
      if(this.form.email == undefined || this.form.email == ''){
        this.translate.get('KEY7').subscribe(res => {
          this.contat = res; // Check KEY7 at assets/i18n/en.json
        });
        this.errorRegisterMessage = this.contat;
        return false;
      }
      if(this.form.password == undefined || this.form.password == ''){
        this.translate.get('KEY32').subscribe(res => {
          this.contat = res; // Check KEY32 at assets/i18n/en.json
        });
        this.errorRegisterMessage = this.contat;
        return false;
      }
      return true;
    }
  
  gologin(){
    this.nav.push('LoginPage')
  }
  
  }
  