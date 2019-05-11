import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-booking-details',
  templateUrl: 'booking-details.html',
})
export class BookingDetailsPage {

  public getName; 
  public getEmail;
  public getService;
  public getBookingNumber; 
  public getPhone;
  public getNote;
  public getStatus; 
  public getTime; 
  public getDate; 
  public getDateTime; 
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

    
    //*********** NavParams to get the product details **************/
    this.getName = navParams.get("name");
  	this.getEmail = navParams.get("email");
  	this.getService = navParams.get("service");
    this.getBookingNumber = navParams.get("bookingNumber");
    this.getPhone = navParams.get("phone");
    this.getNote = navParams.get("note");
  	this.getStatus = navParams.get("status");
  	this.getTime = navParams.get("time");
    this.getDate = navParams.get("date");
    this.getDateTime = navParams.get("dateTime");
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingDetailsPage');
  }




}
