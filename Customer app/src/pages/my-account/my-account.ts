import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, 
ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
//Providers
import { BookProvider } from '../../providers/booking';
import { NotificationProvider } from '../../providers/notifications';
import { Auth } from '../../providers/auth';
import { Values } from '../../providers/values';
import { DataProvider } from '../../providers/data';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
 
})
export class MyAccountPage {
  
  currentUser: any;
  myBookingList: any;
  notifyList: any;
  error: any;
  userID: any;
  zone: NgZone;
  userProfile: any = null;
  isLoggedIn: boolean = false;
  customerList:any;
  userProfiles: any = null;
 
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService,
    public alertCtrl: AlertController, public notification: NotificationProvider,
    public actionSheetCtrl: ActionSheetController, public values:Values,  public dataProvider: DataProvider,
    public modalCtrl: ModalController,public bookingProvider: BookProvider, public auth: Auth) {

      this.userID = firebase.auth().currentUser.uid;
      this.currentUser = firebase.auth().currentUser;

    // current user loggedin
    this.currentUser = firebase.auth().currentUser;

    this.auth = auth;
    this.customerList = firebase.database().ref('/Customer-List'); 
    this.zone = new NgZone({});

    //Function to get Booking count for the current user
  	this.bookingProvider.getMyBookList(this.currentUser.uid).on('value', snapshot =>{
      this.myBookingList = [];
      console.log(snapshot.val());
         snapshot.forEach( snap => {
          this.myBookingList.push({
          id: snap.key,
         });
      });
    });

    this.notification.getNofity().on('value', snapshot => {
      this.notifyList = [];
      snapshot.forEach( snap => {
        this.notifyList.push({
          id: snap.key,
        });

      });
    
     });
         
}

// Get user profile
  ionViewDidLoad() {
       this.dataProvider.getUserProfile(this.currentUser.uid).on('value', (snapshot) =>{
       this.userProfiles = snapshot.val();

      });
     }

  // This is the function for ModalControllers
  openProfileModal(){
    let openGestureModal = this.modalCtrl.create('MyProfilePage',{
    });
    openGestureModal.present();
  }

  openOrdersModal(){
    let openGestureModal = this.modalCtrl.create('MyOrdersPage',{
    });
    openGestureModal.present();
  }

  openBookingsModal(){
    let openGestureModal = this.modalCtrl.create('MyBookingPage',{
    });
    openGestureModal.present();
  }

  openBookingMessageModal(){
    let openGestureModal = this.modalCtrl.create('BookingMessagePage',{
    });
    openGestureModal.present();
  }

  openNotificationModal(){
    let openGestureModal = this.modalCtrl.create('NotificationsPage',{
    });
    openGestureModal.present();
  }


  // This is the Logout function
  logout(){
    let confirm = this.alertCtrl.create({
       title: this.translate.instant('KEY33'),
       message: this.translate.instant('KEY34'), 
       buttons: [
         {
           text: 'Yes',
           handler: data => {
            this.auth.logoutUser().then(() => {
              this.values.isLoggedIn = false;
            });
            this.navCtrl.setRoot('TabsPage');
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
  

  // This is the function that Navigate SettingPage
  openSettings(){
   this.navCtrl.push('SettingsPage');
  }


}
    
    

    
