import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage} from 'ionic-angular';
import firebase from 'firebase';
import { DataProvider } from '../../providers/data';


/*
  Generated class for the EditCustomer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html'
})
export class EditUserPage {
  
	user: any = {};
  currentUser: any;
  errorMessage: any;
  
  constructor(public nav: NavController, public params: NavParams, 
    public dataProvider: DataProvider) {
    this.user = params.data;    
    
     this.currentUser = firebase.auth().currentUser;
  }
   //*********** Save edited User **************/
  saveUser(){
    	this.dataProvider.editCustomers(this.user.displayName, this.user.phoneNumber, this.user.address, this.user.id)
      .then(() =>{
      	this.nav.pop();
     	}).catch( (error) => {this.handleErrors(error);
        });
  }


    handleErrors(error){

  this.errorMessage = error.message;
  console.log(error);
}



}
