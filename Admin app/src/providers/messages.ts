import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class MessageProvider {

   //*********** get message list from firebase **************/
    addMessageList = firebase.database().ref('/messages');

    constructor(public http: Http) {

    }
  
      getMessage(): any {
        return this.addMessageList;
      }

    deleteMessage(id){
        return this.addMessageList.child(id).remove();
    }
    
      getMessageDetail(id): any {
        return this.addMessageList.child(id);
      }

     
  }