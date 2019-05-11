import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
//import firebase from 'firebase';
import { ServiceBannerProvider } from '../../providers/service-banners';


/*
  Generated class for the EditProduct page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-edit-service-banner',
  templateUrl: 'edit-service-banner.html'
})
export class EditServiceBannerPage {

  id: any;
	service:any; 
  metadata: any;
  fileName: any;
  storageRef: any;
  uploadTask: any;
  downloadURL: any;
  selectedFile: any;
  categoryName: any;
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public serviceProvider: ServiceBannerProvider) {
  	
    this.service = params.data;
  
  }
     //*********** Save edited service banner function **************/
  editservice(){
    if(this.validate()){
       this.serviceProvider.editService(this.service.title, this.service.downloadUR, this.service.id).then( () =>{
      		this.navCtrl.pop();
       });
    }
  }

  
  onChange(event){
    this.selectedFile = event.target.files[0];
    this.disableSubmit = true;
    console.log(this.selectedFile);
    this.upLoad();
  }

   //*********** Upload image banner **************/
  upLoad(){
    var fileName = this.selectedFile.name;
    var storageRef = firebase.storage().ref('Services Image/' + fileName);
    var metadata = {contentType: 'image/jpeg'};
    var uploadTask = storageRef.put(this.selectedFile, metadata);
    uploadTask.on('state_changed', (snapshot) =>{
      console.log(snapshot);
      var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log('upload' + progress + '% done');
      switch(uploadTask.snapshot.state){
        case firebase.storage.TaskState.PAUSED: 
          console.log('upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('upload is running');
          break;  
      }

      }, (error) =>{
          console.log(error);
        }, () =>{

          this.service.downloadURL = uploadTask.snapshot.downloadURL;
          this.disableSubmit = false;
          console.log(this.downloadURL);
          console.log("successfully uploaded");
    });
  }
   //*********** Validate input **************/
  validate(){
     if(this.service.title == undefined || this.service.title == ''){
      this.errorMessage = 'Please Add Service Title';
      return false;
    }
    
    if(this.service.downloadURL == undefined || this.service.downloadURL == ''){
      this.errorMessage = 'Please Add Image';
      return false;
    }
   
    return true;
  }
  
}
