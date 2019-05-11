import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data';
import { Values } from '../../providers/values';
//import firebase from 'firebase';


/**
 * Generated class for the OrderList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {

	orderList: any;
  id:any;
  //currentUser: any;
  constructor(public nav: NavController, public params: NavParams, public alertCtrl: AlertController,
    public dataProvider: DataProvider, public data: DataProvider, public values: Values) {
  
 //********** Fetch order list **************/
    	this.dataProvider.getOrderList().on('value', snapshot =>{
    		this.orderList = [];
        console.log(snapshot.val());
    			 snapshot.forEach( snap => {
      	 	 this.orderList.push({
  		    	  id: snap.key,
  		    		items: snap.val().items,
              customerDetails: snap.val().customerDetails,
              payments: snap.val().payments,
              status: snap.val().status,
              orderNumber: snap.val().orderNumber,
              dateTime: snap.val().dateTime,
              total: snap.val().total
      	   });
    	  });
      });
  }

 //*********** Delete particular order from the list **************/
  deleteOder(id){
    let confirm = this.alertCtrl.create({
       title: 'DELETE',
       message: "Are you sure you want to delete this Order?",
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

// Navigate to order details page
  getOrderDetails(id){
  	console.log(id);
   this.nav.push('OrderDetailsPage', {id: id});
  }

  // Navatigate to update order page
  update(order){
    this.nav.push('UpdateOrderPage', order);
    }
  
}

