import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class PrivacyProvider {
  
   
    privacyList = firebase.database().ref('/privacy');

    constructor(public http: Http) { }
  
     //*********** send privacy function **************/
    addPrivacy(privacy:string, UserId){
      let d = new Date();
      let e = this.formatDate(d);
      return this.privacyList.push({
        privacy: privacy,
        userId: UserId,
        dateTime: e,
        reverseOrder: 0 - Date.now()
      
      }).then( newPrivacy =>{
        
           this.privacyList.child(newPrivacy.key).child('id').set(newPrivacy.key);
     }) ;
    }

     //*********** Edit privacy **************/
     editPrivacy(privacy:string, id:any){
        return this.privacyList.child(id).update({
          privacy: privacy
        }) ;
      }

   
      getPrivacy(): any {
        return this.privacyList;
      }


    deletePrivacy(id){
        return this.privacyList.child(id).remove();
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