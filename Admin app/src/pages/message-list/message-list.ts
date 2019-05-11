import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Provider
import { MessageProvider } from '../../providers/messages';


@IonicPage()
@Component({
  selector: 'page-message-list',
  templateUrl: 'message-list.html',
})
export class MessageListPage {

  messageList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public messageProvider: MessageProvider) {

     //*********** Fetch Message list **************/
    this.messageProvider.getMessage().on('value', snapshot => {
      this.messageList = [];
      snapshot.forEach( snap => {
        this.messageList.push({
          id: snap.key,
          title: snap.val().title,
          email: snap.val().email,
          message: snap.val().message,
          dateTime: snap.val().dateTime
        });

      });
    
     });
  }

// Delete a message from message list
  deletemessage(id){
    this.messageProvider.deleteMessage(id);
  }

 // Navigate to message details
  messageDetailsPage(id){
    this.navCtrl.push('MessageDetailsPage', {id: id});
  }

}
