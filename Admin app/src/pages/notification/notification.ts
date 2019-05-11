import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
//Provider
import { NotificationProvider } from '../../providers/notifications';


@IonicPage()
@Component({
  selector: 'page-notificaation',
  templateUrl: 'notification.html'
})
export class NotificationPage {

	form: any;
  errorMessage: any;
  disableSubmit: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public notification: NotificationProvider) {

     this.form = {};
}
   //*********** Send notification function **************/
  sendNotify(form, id){
    let userId = firebase.auth().currentUser.uid;
     if(this.validate()){
            this.notification.sendNotification(this.form.notify, userId)
      .then( () =>{
        this.navCtrl.setRoot('HomePage');
      });
     }  
  }

   //******* Validation function **************/
  validate(){
     if(this.form.notify == undefined || this.form.notify == ''){
      this.errorMessage = 'Please Add Notification';
      return false;
    }

    return true;
  }
  
}


