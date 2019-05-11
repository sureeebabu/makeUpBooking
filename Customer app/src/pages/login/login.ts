import { Component, NgZone } from '@angular/core';
import { Auth } from '../../providers/auth';
import { NavController, NavParams, IonicPage, LoadingController, 
AlertController, Loading } from 'ionic-angular';
// PROVIDERS
import { Values } from '../../providers/values';
import { DataProvider } from '../../providers/data';
import firebase from 'firebase';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  
  error: any;
  zone: NgZone;
  form: any; 
  userProfile: any = null;
  isLoggedIn: boolean = false;
  customerList:any;
  currentUser: any;
  userProfiles: any = null;
  errorSigninMessage: any;
  disableLogin: boolean = false;
  public loading: Loading;
  contat: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public values:Values,  
    public dataProvider: DataProvider, public alertCtrl: AlertController, public translate: TranslateService,
    public loadingCtrl: LoadingController, public auth: Auth) {
    this.currentUser = firebase.auth().currentUser;

   // If user is loggedin get user Profile
    if(this.values.isLoggedIn){
      this.dataProvider.getUserProfile(this.currentUser.uid).on('value', (snapshot) =>{
       this.userProfiles = snapshot.val();

      });
    } 

    this.form = {};
    this.auth = auth;
    this.customerList = firebase.database().ref('/Customer-List'); 
    this.zone = new NgZone({});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // This is the Login function
  login(){
    if(this.validate()){
      this.disableLogin = true;
      let loading = this.loadingCtrl.create({
        content: this.translate.instant('KEY31'), // Check KEY31 at assets/i18n/en.json
        spinner: 'crescent',
        duration: 3000
      });
      // The user Login with email and password
        this.auth.login(this.form.email, this.form.password).then((success) =>{ 
          this.userProfile = success;
          this.values.isLoggedIn = true;
          this.disableLogin = false;
          console.log(this.values.isLoggedIn);
        // If the user has loggedin, setRoot to TabsPage and get user Profiles
          this.navCtrl.setRoot('TabsPage')
          this.dataProvider.getUserProfile(this.userProfile.uid).on('value', (snapshot) =>{
           this.userProfiles = snapshot.val();
           this.values.address = this.userProfiles.address;
            this.values.id = this.userProfile.uid;
            console.log(this.values.id);
          });

        }).catch(err => {this.handleError(err)});

        loading.onDidDismiss(() => {
          console.log('Dismissed loading');
        });
      
        loading.present();
      }
  }
  // This is the function that shows error when occur
  handleError(err){
        console.log(err.code);
        this.errorSigninMessage = err.message;
        this.disableLogin = false;
        
  }

 
// Validate the login input
  validate(){
    if(this.form.email == undefined || this.form.email == ''){
      this.translate.get('KEY7').subscribe(res => {
        this.contat = res; // Check KEY7 at assets/i18n/en.json
      });
      this.errorSigninMessage = this.contat;
      return false;
    }

    if(this.form.password == undefined || this.form.password == ''){
      this.translate.get('KEY32').subscribe(res => {
        this.contat = res; // Check KEY32 at assets/i18n/en.json
      });
      this.errorSigninMessage = this.contat;
      return false;
    }
    return true;
  }
  
 // This is the function that Navigate PasswordResetPage
  forgotten(): void {
    this.navCtrl.push('PasswordResetPage');
  }

// This is the function that Navigate SignupPage
goSignup(): void {
  this.navCtrl.push('SignupPage');
}
  
  
}



