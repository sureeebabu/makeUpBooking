import { Component } from '@angular/core';
import { NavController, MenuController, ToastController, NavParams, IonicPage} from 'ionic-angular';
//Providers
import { ServiceBannerProvider } from '../../providers/service-banners';
import { NotificationProvider } from '../../providers/notifications';
import { Values } from '../../providers/values';
import { TranslateService } from '@ngx-translate/core';

//Plugins
import { Storage } from '@ionic/storage';
//Firebase
import * as firebase from 'firebase';
import 'rxjs/add/operator/debounceTime';






@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'  
})
export class HomePage {

  steps = [
    {
      // Check KEY19/Key20/KEY21 at assets/i18n/en.json  
      title: this.translate.instant('KEY19'),       
      goal:  this.translate.instant('KEY20'),               
      extra: this.translate.instant('KEY21'), 
      imageUrl: 'assets/imgs/bridal.jpg'  
    },
    {
      // Check KEY22/Key23/KEY24 at assets/i18n/en.json  
      title: this.translate.instant('KEY22'), 
      goal: this.translate.instant('KEY23'),  
      extra: this.translate.instant('KEY24'),  
      imageUrl: 'assets/imgs/training.jpg'  
     },
    {
      //Check KEY25/Key26/KEY27 at assets/i18n/en.json  
      title: this.translate.instant('KEY25'), 
      goal: this.translate.instant('KEY26'),  
      extra: this.translate.instant('KEY27'),  
      imageUrl: 'assets/imgs/makmak.jpg' 
    },
    {
      //Check KEY28/Key29/KEY30 at assets/i18n/en.json  
      title: this.translate.instant('KEY28'), 
      goal: this.translate.instant('KEY29'),  
      extra: this.translate.instant('KEY30'),  
      imageUrl: 'assets/imgs/tatty.jpg' 
       },
  ]

  public cartItem;
  public member;
  data: any;
  base64: any;
  currentUser: any;
  userProfiles: any = null;
  filtereditems = [];
  temparr = [];
  serviceList: any;
  notifyList: any;
  

  constructor(public navCtrl: NavController, public storage: Storage, 
    public notification: NotificationProvider, public translate: TranslateService,
    public toastCtrl: ToastController, public values:Values,
    public menu: MenuController, public navParams: NavParams, 
    public serviceBanner: ServiceBannerProvider) {

     //get the list of services from the ServiceBannerProvider
     this.serviceBanner.getService().on('value', snapshot => {
      this.serviceList = [];
      snapshot.forEach( snap => {
        this.serviceList.push({
          id: snap.key,
          title: snap.val().title,
          downloadURL: snap.val().downloadURL,
          dateTime: snap.val().dateTime
        });

      });
    
    });
   
     //get notification from Admin
    this.notification.getNofity().on('value', snapshot => {
      this.notifyList = [];
      snapshot.forEach( snap => {
        this.notifyList.push({
          id: snap.key,
        });

      });
    
     });

   
    //To show the list in side menu 
   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.menu.enable(true, 'menu1');
      this.menu.enable(false, 'menu2');
      unsubscribe();
      
    } else {  
       this.menu.enable(true, 'menu2');
       this.menu.enable(false, 'menu1');
      unsubscribe();
    }
  });
   
  }

// This is the function that navigate to CartPage
pushToCart(){
  this.navCtrl.push('CartPage');
}
      ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
      }
    
   // This is the function that navigate to NotificationPage 
  goNotify(){
    this.navCtrl.push('NotificationsPage')
  }

  }

