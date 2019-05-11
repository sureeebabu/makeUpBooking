import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams, 
LoadingController, AlertController } from 'ionic-angular';
//PROVIDERS
import { BookProvider } from '../../providers/booking';
import { ServiceListProvider } from '../../providers/service-list';
import { Values } from '../../providers/values';
import { DataProvider } from '../../providers/data';
//PLUGINS
import { DatePicker } from '@ionic-native/date-picker';
import { Keyboard } from '@ionic-native/keyboard';
import firebase from 'firebase';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',

})

export class BookingPage {

    userProfiles: any;
    form: any;
    errorMessage: any;
    disableSubmit: boolean = false;
    currentUser: any;
    public phoneBind;
    public fullnameBind;
    public addressBind;
    public userProfile: any;
    public user;
    appointDate : any;
    serviceList: any;
    contat: any;
   
    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
      public translate: TranslateService, public bookProvider: BookProvider, public alertCtrl: AlertController, 
      public loadingCtrl: LoadingController, public serviceListProvider: ServiceListProvider, public values:Values,  
      public dataProvider: DataProvider, public nav: NavController, public keyboard : Keyboard, 
      public datePicker : DatePicker) {

        this.form = {};

        //This Check for the authentication of the user
        this.currentUser = firebase.auth().currentUser;  
       const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
       this.user = true;
       unsubscribe();
      } 
    });

    //This is the function that fetch for the available services list
    this.serviceListProvider.getService().on('value', snapshot => {
      this.serviceList = [];
      snapshot.forEach( snap => {
        this.serviceList.push({
          id: snap.key,
          name: snap.val().name
        });

      });
    
     });
    }  

   
   //This is validation the booking input
  validate(){
    if(this.form.name == undefined || this.form.name == ''){
      this.translate.get('KEY1').subscribe(res => {
        this.contat = res; // Check KEY1 at assets/i18n/en.json
      });
     this.errorMessage = this.contat;
     return false;
   }

   if(this.form.phone == undefined || this.form.phone == ''){
    this.translate.get('KEY2').subscribe(res => {
      this.contat = res; // Check KEY2 at assets/i18n/en.json
    });
     this.errorMessage = this.contat;
     return false;
   }

   if(this.form.service == undefined || this.form.service == ''){
    this.translate.get('KEY3').subscribe(res => { // Check KEY3 at assets/i18n/en.json
      this.contat = res;
    });
    this.errorMessage = this.contat;
    return false;
  }

  if(this.form.appointDate == undefined || this.form.appointDate == ''){
    this.translate.get('KEY4').subscribe(res => {
      this.contat = res; // Check KEY4 at assets/i18n/en.json
    });
    this.errorMessage = this.contat;
    return false;
  }
  if(this.form.time == undefined || this.form.time == ''){
    this.translate.get('KEY5').subscribe(res => {
      this.contat = res; // Check KEY5 at assets/i18n/en.json
    });
    this.errorMessage = this.contat;
    return false;
  }

  if(this.form.note == undefined || this.form.note == ''){
    this.translate.get('KEY6').subscribe(res => {
      this.contat = res; // Check KEY6 at assets/i18n/en.json
    });
    this.errorMessage = this.contat;
    return false;
  }

   if(this.form.email == undefined || this.form.email == ''){
    this.translate.get('KEY7').subscribe(res => {
      this.contat = res; // Check KEY7 at assets/i18n/en.json
    });
     this.errorMessage = this.contat;
     return false;
   }
   
   return true;
 }

  //This is function that generate Random String for booking id
 stringGen(len){
    var text = " ";
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < len; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
  }

 // This is the Datepicker function
  openDatepicker(){
    this.keyboard.close();
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT 
    }).then(
      date => {
        this.form.appointDate = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()},
      err => console.log('Error occurred while getting date: ', err)
    );
  }


 //This is the Booking Submission function
  sumitbooking(form, bookingId){
      let bookingNumber = this.stringGen(10);
      let status = "pending";
      let comment = "Thank you, we have received your booking";
      let userID = firebase.auth().currentUser.uid;
      if(this.validate()){
      this.bookProvider.submitbook( this.form.name, this.form.email, this.form.phone , this.form.appointDate , this.form.time, this.form.service, this.form.note, bookingNumber, status, comment, userID).then(()=>{
       this.userProfiles
       this.nav.setRoot('TabsPage');
     });

     let basicAlert = this.alertCtrl.create({
      title: this.translate.instant('KEY8'),     // Check KEY8 at assets/i18n/en.json
      subTitle: this.translate.instant('KEY9'),    // Check KEY9 at assets/i18n/en.json
      buttons: [this.translate.instant('KEY12')]  // Check KEY12 at assets/i18n/en.json
    });
    basicAlert.present();
  }
}

// This is the Navigate function to LoginPage
goLogin(){
  this.navCtrl.push('LoginPage');
}

// This is the Navigate function to SignupPage
goSignup(){
  this.navCtrl.push('SignupPage');
}


}


      
