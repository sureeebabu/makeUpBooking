import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class NotificationProvider {
  
    notificationList = firebase.database().ref('/notifications');

    constructor() { }
  
      getNofity(): any {
        return this.notificationList;
      }  
  }