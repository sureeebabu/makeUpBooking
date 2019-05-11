import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
// Providers
import { DataProvider } from '../../providers/data';
import { Values } from '../../providers/values';
import firebase from 'firebase';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage {

	currentUser: any;
	myOrderList: any;
	id:any;

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController,
  public viewCtrl: ViewController, public dataProvider: DataProvider, public values:Values, public translate: TranslateService) {

  	this.currentUser = firebase.auth().currentUser;
 // Fetch order list from server
  	this.dataProvider.getMyOrderList(this.currentUser.uid).on('value', snapshot =>{
    		this.myOrderList = [];
    			 snapshot.forEach( snap => {
      	 	 this.myOrderList.push({
  		    	  id: snap.key,
  		    		items: snap.val().items,
              deliveryDate: snap.val().deliveryDate,
              total: snap.val().total,
              orderNumber: snap.val().orderNumber,
              status: snap.val().status,
              dateTime: snap.val().dateTime
      	   });
    	  });
      });
  }

  // Delete order function
  deleteOder(id){
  
    let confirm = this.alertCtrl.create({
       title: this.translate.instant('KEY35'),  
       message: this.translate.instant('KEY37'), 
       buttons: [
         {
           text: 'Yes',
           handler: data => {
            this.dataProvider.delOrder(id);
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
  

// Get order Details
  getOrderDetails(id){
  	console.log(id);
   this.nav.push('MyOrderDetailsPage', {id: id});
  }


  closeModal() {
    this.viewCtrl.dismiss();
  }

  

}















