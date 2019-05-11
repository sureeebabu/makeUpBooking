import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
//Provider
import { GalleryProvider } from '../../providers/gallery';


@IonicPage()
@Component({
  selector: 'page-add-gallery',
  templateUrl: 'add-gallery.html'
})
export class AddGalleryPage {

	form: any;
  fileName: any;
  metadata: any;
  uploadTask: any;
  storageRef: any;
  downloadURL: any;
  selectedFile: any;
  errorMessage: any;
  disableSubmit: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public galleryProvider: GalleryProvider) {

     this.form = {};
}
  //*********** Add Gallery function **************/
  addgallery(form){
     if(this.validate()){
            this.galleryProvider.addGallery(this.form.title, this.downloadURL)
      .then( () =>{
        this.navCtrl.pop();
      });
     }

    
  }

  onChange(event){
    this.selectedFile = event.target.files[0];
    this.disableSubmit = true;
    this.upLoad();
  }

  //*********** Upload Gallery image **************/
  upLoad(){
    var fileName = this.selectedFile.name;
    var storageRef = firebase.storage().ref('Gallery Image/' + fileName);
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

 //*********** Validate Gallery title **************/
  validate(){
     if(this.form.title == undefined || this.form.title == ''){
      this.errorMessage = 'Please Add Gallery title';
      return false;
    }
   
    if(this.downloadURL == undefined || this.downloadURL == ''){
      this.errorMessage = 'Please Add Blog Image';
      return false;
    }
   
    return true;
  }
  
}


