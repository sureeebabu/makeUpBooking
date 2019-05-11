import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
//Provider
import { DataProvider } from '../../providers/data';

@IonicPage()
@Component({
  selector: 'page-update-order',
  templateUrl: 'update-order.html'
})
export class UpdateOrderPage {

  id: any;
	order:any; 
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public dataProvider: DataProvider) {
  	
    this.order = params.data;
    
  }
 //*********** update order status function **************/
  updateStatus(){
    if(this.validate()){
       this.dataProvider.updateStatus(this.order.status, this.order.id).then( () =>{
      		this.navCtrl.pop();
       });
    }
  }

   //*********** validate input **************/
  validate(){
     if(this.order.status == undefined || this.order.status == ''){
      this.errorMessage = 'Please add status';
      return false;
    }
    return true;
  }
  
}
