import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';


@Injectable()
export class BookingProvider {
  
  params:any;
  bookLists: any;
  public ref: any;  
  public bookList: any;
  public currentUser: any;   
  booking_id: Array<number> = [];
 
  public fireRef: any;
 
  constructor(public http: Http) {
    this.currentUser = firebase.auth().currentUser;
    this.bookList = firebase.database().ref('booking'); 
    
    this.fireRef = firebase.database().ref();
  
  }

  // delete booking
  delBook(id){
    return this.bookList.child(id).remove();
  }
  // Get booking list
  getBookList(){
    return this.bookList.orderByChild("reverseOrder");
  }

  // Update booking status
  updateStatus(status: number, id){
    return this.bookList.child(id).update({
      status: status
    });
  }
 
  // Send comment to a particular user booking
  sendComment(comment: string, id){
    return this.bookList.child(id).update({
      comment: comment
    });
  }


  
}
