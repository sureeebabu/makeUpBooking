import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
//Provider
import { PrivacyProvider } from '../../providers/privacy';

@IonicPage()
@Component({
  selector: 'page-edit-privacy',
  templateUrl: 'edit-privacy.html'
})
export class EditPrivacyPage {

  id: any;
	prvcy:any; 
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public privacyProvider: PrivacyProvider) {
  	
    this.prvcy = params.data;
      
  }
   //*********** Edit Privacy function **************/
  editPrvcy(){
    if(this.validate()){
       this.privacyProvider.editPrivacy(this.prvcy.privacy, this.prvcy.id).then( () =>{
      		this.navCtrl.setRoot('HomePage');
       });
    }
  }


     //*********** Validate Privacy input **************/
  validate(){
     if(this.prvcy.privacy == undefined || this.prvcy.privacy == ''){
      this.errorMessage = 'Please Add Privacy';
      return false;
    }
    
    return true;
  }
  
}
