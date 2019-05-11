import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class ServiceBannerProvider {
  
    service_id: Array<number> = [];
    addServiceBanner = firebase.database().ref('/serviceList');

    constructor(public http: Http) {}
  
     //*********** add service  **************/
    addService(title:string, downloadURL:any){
      let d = new Date();
      let e = this.formatDate(d);
      return this.addServiceBanner.push({
        title: title,
        downloadURL:downloadURL,
        dateTime: e,
        reverseOrder: 0 - Date.now()
      
      }).then( newService =>{
        
           this.addServiceBanner.child(newService.key).child('id').set(newService.key);
     }) ;
    }

     //*********** edit service **************/
    editService(title:string, downloadURL:any, id:any){
        return this.addServiceBanner.child(id).update({
          title: title,
          downloadURL:downloadURL
        }) ;
      }
  
     

      getService(): any {
        return this.addServiceBanner;
      }


    delService(id){
        return this.addServiceBanner.child(id).remove();
    }
    
     //***********date format **************/
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