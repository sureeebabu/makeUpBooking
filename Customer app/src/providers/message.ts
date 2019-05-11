import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class MessagesProvider {
  
    messageList = firebase.database().ref('/messages');
    constructor() { }
  
    /**
   * User send message to Admin
   */
    sendMessage(title:string, email:string, message:string, UserId){
      let d = new Date();
      let e = this.formatDate(d);
      return this.messageList.push({
        title: title,
        email: email,
        message: message, 
        userId: UserId,
        dateTime: e,
        reverseOrder: 0 - Date.now()
      
      }).then( newMessage =>{
        
           this.messageList.child(newMessage.key).child('id').set(newMessage.key);
     }) ;
    }
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