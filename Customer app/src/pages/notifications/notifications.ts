import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController, ViewController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notifications';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  notifyList: any;
    
  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController, 
    public notification: NotificationProvider, public alertCtrl: AlertController) {

    //Fetch Notifications from Admin
    this.notification.getNofity().on('value', snapshot => {
      this.notifyList = [];
      snapshot.forEach( snap => {
        this.notifyList.push({
          id: snap.key,
          notify: snap.val().notify,
          dateTime: snap.val().dateTime
        });

      });
    
     });
  }

  seeNofity(){
    this.navCtrl.push('TabsPage');
  }
// This the function that close modal usind ViewController
  close() {
    this.viewCtrl.dismiss();
  }
  

 
}
