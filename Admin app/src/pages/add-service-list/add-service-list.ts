import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
//Provider
import { ServiceListProvider } from '../../providers/service-list';


@IonicPage()
@Component({
  selector: 'page-add-service-list',
  templateUrl: 'add-service-list.html'
})
export class AddServiceListPage {

	form: any;
  errorMessage: any;
  disableSubmit: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceList: ServiceListProvider) {

     this.form = {};
}
   //*********** Add service function **************/
  addService(form){
     if(this.validate()){
            this.serviceList.addserviceList(this.form.name)
      .then( () =>{
        this.navCtrl.pop();
      });
     }

    
  }

  //*********** Validate Service input **************/
  validate(){
     if(this.form.name == undefined || this.form.name == ''){
      this.errorMessage = 'Please Add Service Name';
      return false;
    }
   
    return true;
  }
  
}


