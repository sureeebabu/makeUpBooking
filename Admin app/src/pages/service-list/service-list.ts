import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import { ServiceListProvider } from '../../providers/service-list';

@IonicPage()
@Component({
  selector: 'page-service-list',
  templateUrl: 'service-list.html'
})
export class ServiceListPage {

  serviceList: any;
    
  constructor(public navCtrl: NavController, public params: NavParams, 
    public service: ServiceListProvider, public alertCtrl: AlertController) {

     //*********** Fetch Service list **************/
    this.service.getService().on('value', snapshot => {
      this.serviceList = [];
      snapshot.forEach( snap => {
        this.serviceList.push({
          id: snap.key,
          name: snap.val().name
        });

      });
    
     });
  }

  addService(){
    this.navCtrl.push('AddServiceListPage');
  }

 //*********** delete service form service list **************/
  deleteservice(id){
    let confirm = this.alertCtrl.create({
       title: 'DELETE',
       message: "Are you sure you want to delete this service?",
       buttons: [
         {
           text: 'Yes',
           handler: data => {
            this.service.delService(id);
            this.navCtrl.pop();
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

  edit(service){
    this.navCtrl.push('EditServiceListPage', service);
  }


 
}
