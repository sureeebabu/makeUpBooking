import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class ServiceBannerProvider {
  
    addServiceList = firebase.database().ref('/serviceList');

    constructor() {
     
    }
      getService(): any {
        return this.addServiceList;
      }

  }