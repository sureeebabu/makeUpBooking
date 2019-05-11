import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
//Provider
import { ServiceBannerProvider } from '../../providers/service-banners';


@IonicPage()
@Component({
  selector: 'page-add-service-banner',
  templateUrl: 'add-service-banner.html'
})
export class AddServiceBannerPage {

	form: any;
  fileName: any;
  metadata: any;
  uploadTask: any;
  storageRef: any;
  downloadURL: any;
  selectedFile: any;
  errorMessage: any;
  disableSubmit: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceProvider: ServiceBannerProvider) {

     this.form = {};
  
}
   //*********** Add Banner Service **************/
  addService(form, id){
     if(this.validate()){
            this.serviceProvider.addService(this.form.title, this.downloadURL)
      .then( () =>{
        this.navCtrl.setRoot('HomePage');
      });
     }

    
  }

  
  onChange(event){
    this.selectedFile = event.target.files[0];
    this.disableSubmit = true;
    this.upLoad();
  }

  //*********** Upload Banner Image **************/
  upLoad(){
    var fileName = this.selectedFile.name;
    var storageRef = firebase.storage().ref('Services Image/' + fileName);
    var metadata = { contentType: 'image/jpeg'};
    var uploadTask = storageRef.put(this.selectedFile, metadata);
    uploadTask.on('state_changed', (snapshot) =>{
      console.log(snapshot);
      var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100 ;
        console.log('upload' + progress + '% done' );
        switch(uploadTask.snapshot.state){
          case firebase.storage.TaskState.PAUSED:   // or Paused
          console.log('upLoad is paused');
          break;
          case firebase.storage.TaskState.RUNNING:   // OR Running
          console.log('upload is running');
          break;

        }

      }, (error) =>  {
          console.log(error);

        },() =>{

          this.downloadURL = uploadTask.snapshot.downloadURL;
           this.disableSubmit = false;
          console.log(this.downloadURL);
          console.log('success');
        });

  }


  validate(){
     if(this.form.title == undefined || this.form.title == ''){
      this.errorMessage = 'Please Service Title';
      return false;
    }
    
    if(this.downloadURL == undefined || this.downloadURL == ''){
      this.errorMessage = 'Please Add Image';
      return false;
    }
   
    return true;
  }
  
}
