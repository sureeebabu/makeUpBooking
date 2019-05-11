import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, Content  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BlogProvider } from '../../providers/blog';
import { SocialSharing } from '@ionic-native/social-sharing';
import firebase from 'firebase';
import { Values } from '../../providers/values';
import { DataProvider } from '../../providers/data';

@IonicPage()
@Component({
  selector: 'page-blog-details',
  templateUrl: 'blog-details.html',
})
export class BlogDetailsPage {
  
  @ViewChild(Content)
  content: Content;
  headerImage:any = "";
  active: boolean;
  public getImage;
  public getTitle;
  public getAuthor;
  public getDesc;
  public getTime;
  public comments = [];
  isLoggedIn: boolean = false;
  currentUser: any;
  userProfiles: any = null;
  //public user;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private socialSharing: SocialSharing,
   public toastCtrl: ToastController, public modalCtrl: ModalController, public blogProvider: BlogProvider,
   public values: Values, public dataProvider: DataProvider) {


    this.currentUser = firebase.auth().currentUser;

     if(this.values.isLoggedIn){
      this.dataProvider.getUserProfile(this.currentUser.uid).on('value', (snapshot) =>{
       this.userProfiles = snapshot.val();

      });
    }

    //NavParams to get the product details
    this.getImage = navParams.get("downloadURL");
  	this.getTitle = navParams.get("title");
  	this.getAuthor = navParams.get("author");
    this.getDesc = navParams.get("description");
    this.getTime = navParams.get("dateTime");
    
    this.getComments(this.getTitle);
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlogDetailsPage');
  }
  
  // This is the Function to navigate to comment page
  comment(){
    if(this.values.isLoggedIn){
    let openGestureModal = this.modalCtrl.create('CommentPage',{
     blogItem: this.getTitle,
    });
    openGestureModal.present();
  }else{
    this.navCtrl.push('LoginPage'); // User have to login before comment
  }
}

  // This is the Functions to get comments from the users
  getComments(blogId){
     this.comments.length = 0;
       this.blogProvider.comment(blogId).then(snapshot=>{
        let userid = snapshot.val();
            if(userid != null){
            var keys = Object.keys(userid);
            for(var i = 0 ; i<keys.length; i++) {
              var k = keys[i];
              var myobj={}; 
                myobj = userid[k].commentDetails;
                myobj['datetime'] = userid[k].dateTime;
                myobj['profpic'] = userid[k].profilePicture;  
                this.comments.push(myobj);
            }
          }
        }
      )
    }
    
    // This is the Parallax header functions
      ngOnChanges(changes: { [propKey: string]: any }) {
        if (changes.data && changes.data.currentValue) {
            this.headerImage = changes.data.currentValue.headerImage;
        } 
        this.subscribeToIonScroll();
      }
    // This is the Social Sharing SheetShare function
      shareSheetShare() {
        this.socialSharing.share( this.getTitle, this.getImage).then(() => {
          console.log("shareSheetShare: Success");
        }).catch(() => {
          console.error("shareSheetShare: failed");
        });
      }
    //This is the Facebook social sharing function
      facebookShare() {
        this.socialSharing.shareViaFacebook("shareViaFacebook", this.getTitle, this.getImage).then(() => {
          console.log("shareViaFacebook: Success");
        }).catch(() => {
          console.error("shareViaFacebook: failed");
        });
      }
    // This is the Instagram social sharing function
      instagramShare(){
        this.socialSharing.shareViaInstagram(this.getTitle, this.getImage).then(() => {
          console.log("shareViaInstagram: Success");
        }).catch(() => {
          console.error("shareViaInstagram: failed");
        });
      }


      ngAfterViewInit() {
        this.subscribeToIonScroll();
      }
    
      isClassActive() {
        return this.active;
      }
    // This is the Parallex header function
      subscribeToIonScroll() {
        if (this.content != null && this.content.ionScroll != null) {
          this.content.ionScroll.subscribe((d) => {
            if (d.scrollTop < 200) {
              this.active = false;
              return;
            }
            this.active = true;
          });
        }
      }
    
    }
    


      

