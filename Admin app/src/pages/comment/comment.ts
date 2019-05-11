import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
//Provider
import { BookingProvider } from '../../providers/booking';



@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})
export class CommentPage {

  id: any;
	booking:any; 
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public bookingProvider: BookingProvider) {
  	
    this.booking = params.data;
  
  }
   //*********** Comment function **************/
  updateComment(){
    if(this.validate()){
       this.bookingProvider.sendComment(this.booking.comment, this.booking.id).then( () =>{
      		this.navCtrl.pop();
       });
    }
  }

     //*********** Validate comment input **************/
  validate(){
     if(this.booking.comment == undefined || this.booking.comment == ''){
      this.errorMessage = 'Please add comment';
      return false;
    }
    return true;
  }
  
}
