import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class NotificationProvider {
  
    notify_id: Array<number> = [];
    
    notificationList = firebase.database().ref('/notifications');

    constructor(public http: Http) { }
  
     //*********** send notification function **************/
    sendNotification(notify:string, UserId){
      let d = new Date();
      let e = this.formatDate(d);
      return this.notificationList.push({
        notify: notify,
        userId: UserId,
        dateTime: e,
        reverseOrder: 0 - Date.now()
      
      }).then( newNotify =>{
        
           this.notificationList.child(newNotify.key).child('id').set(newNotify.key);
     }) ;
    }

   
      getNofity(): any {
        return this.notificationList;
      }


    deleteNotify(id){
        return this.notificationList.child(id).remove();
    }
    
    
     //*********** date format **************/
      formatDate(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
      }
     
  }