import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Providers
import { Values } from '../../providers/values';
import { DataProvider } from '../../providers/data';


@IonicPage()
@Component({
  selector: 'page-my-order-details',
  templateUrl: 'my-order-details.html',
})
export class MyOrderDetailsPage {

	orderDetails : any;
  constructor(public navCtrl: NavController, public params: NavParams, public values: Values, public dataProvider: DataProvider) {
  	// Get user Order History from server
  	this.dataProvider.getOrderDetail(this.params.get('id')).on('value', (snapshot) => {
		  this.orderDetails = snapshot.val();
		});
  	
  }
 
}
