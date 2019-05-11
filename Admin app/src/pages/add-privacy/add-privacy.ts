import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
import { PrivacyProvider } from '../../providers/privacy';


@IonicPage()
@Component({
  selector: 'page-add-privacy',
  templateUrl: 'add-privacy.html'
})
export class AddPrivacyPage {

	form: any;
  errorMessage: any;
  disableSubmit: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public privacyProvider: PrivacyProvider) {

     this.form = {};
}
  //*********** Add Privacy function *************/
  addPrvcy(form, id){
    let userId = firebase.auth().currentUser.uid;
     if(this.validate()){
            this.privacyProvider.addPrivacy(this.form.privacy, userId)
      .then( () =>{
        this.navCtrl.pop();
      });
     }

    
  }

  
//*********** Privacy input validation **************/
  validate(){
     if(this.form.privacy == undefined || this.form.privacy == ''){
      this.errorMessage = 'Please Add Privacy';
      return false;
    }
   
    return true;
  }
  
}


