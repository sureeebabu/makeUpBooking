import { Component, NgZone } from '@angular/core';
import { Auth } from '../../providers/auth';
import { LoadingController, AlertController, ViewController, 
  NavController, NavParams, IonicPage } from 'ionic-angular';
// Providers
import { Values } from '../../providers/values';
import { DataProvider } from '../../providers/data';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  
  error: any;
  zone: NgZone;
  userProfile: any = null;
  isLoggedIn: boolean = false;
  customerList:any;
  currentUser: any;
  userProfiles: any = null;
  form: any;
  errorMessage: any;
  downloadURL: any;
  selectedFile: any;
  public fileName: any;
  public storageRef: any;
  public uploadTask: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public values:Values,  public dataProvider: DataProvider, 
    public alertCtrl: AlertController, public viewCtrl: ViewController,
    public loadingCtrl: LoadingController, public auth: Auth) {

 //Get Current Customer
    this.currentUser = firebase.auth().currentUser;
    this.auth = auth;
    this.customerList = firebase.database().ref('/Customer-List'); 
    this.zone = new NgZone({});

  }

  ionViewDidLoad() {
    this.dataProvider.getUserProfile(this.currentUser.uid).on('value', (snapshot) =>{
      this.userProfiles = snapshot.val();
     });
  }
    
  // Update user profile function
  update(item){
    console.log(item)
    this.navCtrl.push('UpdateProfilePage', item)
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  savePic(){
    this.dataProvider.saveProfilePic(this.downloadURL, this.currentUser.uid)
    .then(() =>{
      this.navCtrl.pop();
    });
}

onChange(event){
  this.selectedFile = event.target.files[0];
  console.log(this.selectedFile);
  this.upLoadImg();
}

upLoadImg(){
  // Create a root reference
  var fileName = this.selectedFile.name;
  var metadata = { contentType: 'image/jpeg'};
  var storageRef = firebase.storage().ref('/images/' + fileName);
  var uploadTask = storageRef.put(this.selectedFile, metadata);
    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot);
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (uploadTask.snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, (error) => {
    // Handle unsuccessful uploads
  },() => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
   this.downloadURL = uploadTask.snapshot.downloadURL;
      console.log(this.downloadURL);
    console.log("successful");
  });
}



}



