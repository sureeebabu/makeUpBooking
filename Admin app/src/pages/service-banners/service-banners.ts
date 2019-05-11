import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
//Providers
import { ServiceBannerProvider } from '../../providers/service-banners';


@IonicPage()
@Component({
  selector: 'page-service-banners',
  templateUrl: 'service-banners.html'
})
export class ServiceBannersPage {

  serviceList: any;
    
  constructor(public navCtrl: NavController, public params: NavParams, public serviceProvider: ServiceBannerProvider) {

     //*********** fetch for banner **************/
    this.serviceProvider.getService().on('value', snapshot => {
      this.serviceList = [];
      snapshot.forEach( snap => {
        this.serviceList.push({
          id: snap.key,
          title: snap.val().title,
          downloadURL: snap.val().downloadURL
        });

      });
    
     });
  }

  // navigate to add service banner page
  addService(){
    this.navCtrl.push('AddServiceBannerPage');
  }

// Delete service banner
  deleteService(id){
    this.serviceProvider.delService(id);
  }

  edit(service){
    this.navCtrl.push('EditServiceBannerPage', service);
  }
  
 
}
