import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';


@Injectable()
export class BookProvider {
  
  params:any;
  bookLists: any;
  public ref: any;  
  public bookList: any;
  public currentUser: any;
  public fireRef: any;
 
  constructor(public http: Http) {
    this.currentUser = firebase.auth().currentUser;
    this.bookList = firebase.database().ref('/booking'); 
    this.fireRef = firebase.database().ref();
    
  }

  // Customer App functions

  deleteBooking(id){
    return this.bookList.child(id).remove();
  }

  getBookingDetails(id){
    return this.bookList.child(id);
  }

  /**
   * Get my booking details
   */
  getMyBookList(id){
    console.log(id);
    this.bookLists =  this.bookList.orderByChild("uid").equalTo(id);//.orderByChild("timeStamp");
    return this.bookLists;
  }

  /**
   * Send booking parameters to Admin server
   */

  submitbook (name:String, email:String, phone: number, appointDate: any, time: any, service:string, note: string, bookingNumber, status: string, comment: string, userId){

    let d = new Date();
    let e = this.formatDate(d);

    return this.bookList.push({
      name: name,
      email: email,
      phone: phone,
      date: appointDate,
      time: time,
      service: service,
      note: note,
      bookingNumber: bookingNumber,
      status: status,
      comment: comment,
      uid: userId,
      dateTime: e,
      reverseOrder: 0 - Date.now()
    }).then( newOrder => {
      this.bookList.child(newOrder.key).child('bookingId').set(newOrder.key);
    });
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