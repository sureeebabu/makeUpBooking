import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class ServiceListProvider {
  
    service_id: Array<number> = [];
    addServiceList = firebase.database().ref('/service-Lists');

    constructor(public http: Http) {}

   //*********** add service list **************/
    addserviceList(name:string){
      let d = new Date();
      let e = this.formatDate(d);
      return this.addServiceList.push({
        name: name,
        dateTime: e,
        reverseOrder: 0 - Date.now()
      
      }).then( newServiceList =>{
        
           this.addServiceList.child(newServiceList.key).child('id').set(newServiceList.key);
     }) ;
    }

    editService(name:string, id:any){
        return this.addServiceList.child(id).update({
          name: name
        }) ;
      }
  

      getService(): any {
        return this.addServiceList;
      }


    delService(id){
        return this.addServiceList.child(id).remove();
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