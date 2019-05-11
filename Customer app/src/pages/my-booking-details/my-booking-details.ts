import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
//Provider
import { BookProvider } from '../../providers/booking';

@IonicPage()
@Component({
  selector: 'page-my-booking-details',
  templateUrl: 'my-booking-details.html',
})
export class MyBookingDetailsPage {

  bookingDetails: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, 
    public bookingProvider: BookProvider) {

    //NavParams to get booking datas 
    this.bookingProvider.getBookingDetails(this.navParams.get('id')).on('value', (snapshot) => {
		  this.bookingDetails = snapshot.val();
		});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingDetailsPage');
  }


}



