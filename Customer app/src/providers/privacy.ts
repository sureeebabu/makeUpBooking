import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class PrivacyProvider {
  
    privacy_id: Array<number> = [];
    
    privacyList = firebase.database().ref('/privacy');

    constructor() { }
  
      getPrivacy(): any {
        return this.privacyList;
      }


 

      
     
  }