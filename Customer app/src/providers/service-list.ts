import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class ServiceListProvider {
  
    service_id: Array<number> = [];
    addServiceList = firebase.database().ref('/service-Lists');

    constructor(public http: Http) {}
  
      getService(): any {
        return this.addServiceList;
      }


  }