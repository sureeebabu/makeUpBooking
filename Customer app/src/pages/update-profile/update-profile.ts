import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
// provider
import { DataProvider } from '../../providers/data';

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {

	form: any;
  currentUser: any;
  errorMessage: any;
  customer: any;
  public userProfile: any;
  downloadURL: any;
  selectedFile: any;
  public fileName: any;
  userProfiles: any = null;
  public storageRef: any;
  public uploadTask: any;
  
  constructor(public nav: NavController, public params: NavParams, public dataProvider: DataProvider) {
  	this.form = {};
    this.currentUser = firebase.auth().currentUser;
    console.log(this.currentUser);
    this.customer = params.data;

  }
// Get user profile
  ionViewDidLoad() {
    this.dataProvider.getUserProfile(this.currentUser.uid).on('value', (snapshot) =>{
      this.userProfiles = snapshot.val();
     });
  }
// Update function
  update(){
      this.dataProvider.saveCustomers(this.customer.displayName, this.customer.phoneNumber, this.customer.address, this.currentUser.uid)
      .then(() =>{
        this.nav.pop();
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
