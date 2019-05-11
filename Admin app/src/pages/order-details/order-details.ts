import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Providers
import { Values } from '../../providers/values';
import { DataProvider } from '../../providers/data';


@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {

	orderDetails : any;
  constructor(public navCtrl: NavController, public params: NavParams, public values: Values, public dataProvider: DataProvider) {
  	// Get user Order History
  	this.dataProvider.getOrderDetail(this.params.get('id')).on('value', (snapshot) => {
		  this.orderDetails = snapshot.val();
		});
  	
  }
 
}
