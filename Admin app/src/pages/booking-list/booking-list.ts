import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
//Provider
import { BookingProvider } from '../../providers/booking';


@IonicPage()
@Component({
  selector: 'page-booking-list',
  templateUrl: 'booking-list.html',
})
export class BookingListPage {

  bookingList: any;
  id:any;
  bookingNum: any;
  
  public users = [];  
    
  constructor(public nav: NavController, public params: NavParams, public bookProvider: BookingProvider,
    public alertCtrl: AlertController, public modalCtrl: ModalController) {
 
         //*********** Fetch Booking List **************/
    	this.bookProvider.getBookList().on('value', snapshot =>{
    		this.bookingList = [];
             console.log(snapshot.val());
    			 snapshot.forEach( snap => {
      	 	 this.bookingList.push({
              id: snap.key,
              uid: snap.key,  
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

     //*********** function to delete booking **************/
  deleteBook(id){
    let confirm = this.alertCtrl.create({
       title: 'DELETE',
       message: "Are you sure you want to delete this booking?",
       buttons: [
         {
           text: 'Yes',
           handler: data => {
            this.bookProvider.delBook(id);
            this.nav.pop();
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
  
  
 
// Navigate to comment page
 comment(booking){
  this.nav.push('CommentPage', booking);
  }

// Navigate to update page
update(booking){
this.nav.push('UpdateBookingPage', booking);
}

// Navigate to Booking Details
bookingDetailsPage(par) {
  this.nav.push('BookingDetailsPage',{
    name: par.name,
    email: par.email,
    service: par.service,
    bookingNumber: par.bookingNumber,
    phone: par.phone,
    note: par.note,
    status: par.status,
    time: par.time,
    date: par.date,
    dateTime: par.dateTime
  });
}


}
  

