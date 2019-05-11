import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import firebase from 'firebase';
//PROVIDER
import { BookProvider } from '../../providers/booking';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-my-booking',
  templateUrl: 'my-booking.html',
})
export class MyBookingPage {

	currentUser: any;
  myBookList: any;
  
  constructor(public nav: NavController, public navParams: NavParams, public bookingProvider: BookProvider, 
    public alertCtrl: AlertController, public viewCtrl: ViewController, public translate: TranslateService) {

  	this.currentUser = firebase.auth().currentUser;
   //Function to get Booking list for the current user
  	this.bookingProvider.getMyBookList(this.currentUser.uid).on('value', snapshot =>{
        this.myBookList = [];
        console.log(snapshot.val());
    			 snapshot.forEach( snap => {
      	 	 this.myBookList.push({
            id: snap.key,
            name: snap.val().name,
            email: snap.val().email,
            service: snap.val().service,
            bookingNumber: snap.val().bookingNumber,
            phone: snap.val().phone,
            note: snap.val().note,
            status: snap.val().status,
            time: snap.val().time,
            date: snap.val().date,
            dateTime: snap.val().dateTime
      	   });
    	  });
      });
  }

  //Delete booking list
  removeBook(id){
  	this.bookingProvider.deleteBooking(id);
  }

  //Get booking details
  getBookingDetails(id){
    this.nav.push('MyBookingDetailsPage', {id: id});
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  //Delete booking list
  deleteBook(id){
  
    let confirm = this.alertCtrl.create({
       title: this.translate.instant('KEY35'), 
       message: this.translate.instant('KEY36'), 
       buttons: [
         {
           text: 'Yes',
           handler: data => {
            this.bookingProvider.deleteBooking(id);
             }
         },
         
         {
           text: 'No',
           handler: data => {
             console.log('Cancelled');
           }
         }


       ]
       
     });
     
     confirm.present();
   }
  


}



