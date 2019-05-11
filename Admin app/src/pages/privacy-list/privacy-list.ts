import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
//Provider
import { PrivacyProvider } from '../../providers/privacy';


@IonicPage()
@Component({
  selector: 'page-privacy-list',
  templateUrl: 'privacy-list.html'
})
export class PrivacyListPage {

  privacyList: any;
    
  constructor(public navCtrl: NavController, public params: NavParams, 
    public privacyProvider: PrivacyProvider, public alertCtrl: AlertController) {

    //*********** Fetch Privacy **************/
    this.privacyProvider.getPrivacy().on('value', snapshot => {
      this.privacyList = [];
      snapshot.forEach( snap => {
        this.privacyList.push({
          id: snap.key,
          privacy: snap.val().privacy,
          dateTime: snap.val().dateTime
        });

      });
    
     });
  }

  // Navigate to AddBlog Page
  addPrvcy(){
    this.navCtrl.push('AddPrivacyPage');
  }

// Delete Blog Function
  deletePrvcy(id){
    let confirm = this.alertCtrl.create({
       title: 'DELETE',
       message: "Are you sure you want to delete this privacy?",
       buttons: [
         {
           text: 'Yes',
           handler: data => {
            this.privacyProvider.deletePrivacy(id);
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

   // Edit Privacy
  edit(prvcy){
    this.navCtrl.push('EditPrivacyPage', prvcy);
  }

 
}
