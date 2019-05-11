import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import firebase from 'firebase';
//PROVIDER
import { BookProvider } from '../../providers/booking';

@IonicPage()
@Component({
  selector: 'page-booking-message',
  templateUrl: 'booking-message.html',
})
export class BookingMessagePage {

	currentUser: any;
  myBookList: any;
  
  constructor(public nav: NavController, public navParams: NavParams, public bookingProvider: BookProvider, 
    public alertCtrl: AlertController, public viewCtrl: ViewController) {

  	this.currentUser = firebase.auth().currentUser;
   //This is the Function to get Booking list for the current user
  	this.bookingProvider.getMyBookList(this.currentUser.uid).on('value', snapshot =>{
        this.myBookList = [];
        console.log(snapshot.val());
    			 snapshot.forEach( snap => {
      	 	 this.myBookList.push({
            id: snap.key,
            comment: snap.val().comment,
            dateTime: snap.val().dateTime
      	   });
    	  });
      });
  }

 // This is the function that close Modal using ViewController
  closeModal() {
    this.viewCtrl.dismiss();
  }

  
  

}



