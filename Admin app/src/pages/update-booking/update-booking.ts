import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { BookingProvider } from '../../providers/booking';

@IonicPage()
@Component({
  selector: 'page-update-booking',
  templateUrl: 'update-booking.html'
})
export class UpdateBookingPage {

  id: any;
	booking:any; 
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public bookingProvider: BookingProvider) {
  	
    this.booking = params.data;
  
  }
 //*********** update booking status function **************/
  updateStatus(){
    if(this.validate()){
       this.bookingProvider.updateStatus(this.booking.status, this.booking.id).then( () =>{
      		this.navCtrl.pop();
       });
    }
  }

   //*********** validate input **************/
  validate(){
     if(this.booking.status == undefined || this.booking.status == ''){
      this.errorMessage = 'Please add status';
      return false;
    }
    return true;
  }
  
}
