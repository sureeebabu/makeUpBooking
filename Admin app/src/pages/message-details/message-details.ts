import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageProvider } from '../../providers/messages';

/**
 * Generated class for the MessageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-details',
  templateUrl: 'message-details.html',
})
export class MessageDetailsPage {

  messageDetails: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public messageProvider: MessageProvider) {

     //*********** Get message details **************/
    this.messageProvider.getMessageDetail(this.navParams.get('id')).on('value', (snapshot) => {
		  this.messageDetails = snapshot.val();
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailsPage');
  }

}
