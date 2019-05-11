import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { InAppBrowserOptions, InAppBrowser  } from '@ionic-native/in-app-browser';

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

headerImage = "assets/imgs/dbstudio.jpg";

  abouts = [
    {  // Change this to your information
      imageUrl: 'assets/imgs/logo2.jpg',
      title: 'DBS STUDIO',
      subtitle: 'We design and build an awesome Hybrid mobile app for Android, iOS and Windows'
    }
  ];

  @ViewChild('map') mapRef:ElementRef;
  constructor(public navCtrl: NavController, private iab: InAppBrowser,
     public navParams: NavParams, public modalCtrl: ModalController) {
     
    }
    
    ionViewDidLoad() {
      this.DisplayMap();
    }

    DisplayMap() { // This is function that display map

      const location = new google.maps.LatLng(40.728157, //Change the Latitude and Longitude to yours
        -74.077642);

      const options = {
        center:location,
        zoom:10,
        streetViewControl:true,
        mapTypeId: 'roadmap'       //Other options 'hybrid' ,'satelite'
      };

      const map = new google.maps.Map(this.mapRef.nativeElement,options);

      this.addMarker(location,map);  
    }

    addMarker(position,map) {    // This shows maker function on the Map
      return new google.maps.Marker({
        position,
        map
      });
    }

    // This is navigate function to ComplaintsPage
    goMessage(){
      this.navCtrl.push('ComplaintsPage');
    }

    // This is navigate function to ChatPage
    goChat(){
      this.navCtrl.push('ChatPage');
    }

    // This is modal controller function to TermsPrivacyPage
    openTermsModal(){
      this.openModal('TermsPrivacyPage');
    }
  
     // This is modal controller function 
    openModal(pageName) {
      this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
                    .present();
    }

     // This is navigation to facebook through inApp Browser
    public openFacebookUrl(url : string){
      let target = "_blank";
      this.iab.create(url,target,this.options);
  }

    // This is navigation to Twitter through inApp Browser
  public openTwitterUrl(url : string){
    let target = "_blank";
    this.iab.create(url,target,this.options);
}

  // This is navigation to Instagram through inApp Browser
public openInstagramUrl(url : string){
  let target = "_blank";
  this.iab.create(url,target,this.options);
}

  // This is navigation to Youtube Channel through inApp Browser
public openYoutubeUrl(url : string){
  let target = "_blank";
  this.iab.create(url,target,this.options);

}


    }






















    

  