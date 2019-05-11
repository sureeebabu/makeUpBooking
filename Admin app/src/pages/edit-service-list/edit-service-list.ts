import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
//Provider
import { ServiceListProvider } from '../../providers/service-list';

@IonicPage()
@Component({
  selector: 'page-edit-service-list',
  templateUrl: 'edit-service-list.html'
})
export class EditServiceListPage {

  id: any;
	service:any; 
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public serviceList: ServiceListProvider) {
  	
    this.service = params.data;   
  }

     //*********** Save Edited service **************/ 
  editservice(){
    if(this.validate()){
       this.serviceList.editService(this.service.name, this.service.id).then( () =>{
      		this.navCtrl.setRoot('HomePage');
       });
    }
  }
   //*********** Validate service input **************/
  validate(){
     if(this.service.name == undefined || this.service.name == ''){
      this.errorMessage = 'Please Add Service Name';
      return false;
    }
    
    return true;
  }
  
}
