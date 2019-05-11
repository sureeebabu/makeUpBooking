import {Component, NgZone, ViewChild} from '@angular/core';
import {Content, NavController, IonicPage} from 'ionic-angular';


declare var window;
//declare var window:any;

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  messages: any[] = [];
  text: string = "";
 

  @ViewChild(Content) content
  constructor(public navCtrl: NavController, private ngZone: NgZone) {

    
   window["ApiAIPlugin"].init(
        {
            clientAccessToken: "2b97fd1dc8f34af9a7c3f1fb670b71dd", // insert your client access key here 
            lang: "en" // set lang tag from list of supported languages 
        }, 
        function(result) { 
          alert(result);
         },
        function(error) { 
          alert(error);
         }
    );

      this.messages.push({
          text: 'Hi, how can I help you',
          sender: 'api'
      })
  }

  // This is the Send Text function send to the Artificial intellegent Agent
  sendText(){

      let message = this.text;

      this.messages.push({
        text: message,
        sender: 'me'
      })
      this.content.scrollToBottom(200);

      this.text = "";

      window['ApiAIPlugin'].requestText({
          query: message
      }, (response)=>{

          this.ngZone.run(()=> {
              this.messages.push({
                  text: response.result.fulfillment.speech,
                  sender: "api"
              })
          })
          this.content.scrollToBottom(200);
      }, (error)=>{
          console.log(error);
      },)
  }
  


}