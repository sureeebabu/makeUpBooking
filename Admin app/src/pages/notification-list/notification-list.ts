import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
//Provider
import { NotificationProvider } from '../../providers/notifications';


@IonicPage()
@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html'
})
export class NotificationListPage {

  notifyList: any;
    
  constructor(public navCtrl: NavController, public params: NavParams, 
    public notification: NotificationProvider, public alertCtrl: AlertController) {

    //*********** Fetch Notification List **************/
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

  addNofity(){
    this.navCtrl.push('NotificationPage');
  }

 //*********** Delete notification **************/
  deletenotify(id){
    let confirm = this.alertCtrl.create({
       title: 'DELETE',
       message: "Are you sure you want to delete this notification?",
       buttons: [
         {
           text: 'Yes',
           handler: data => {
            this.notification.deleteNotify(id);
            this.navCtrl.pop();
             }
         },
         
         {
           text: 'No',
           handler: data => {
             console.log('Cancelled');
           }
         }


       ]
       
     });
     
     confirm.present();
   }

 
}
