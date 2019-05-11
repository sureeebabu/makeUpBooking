import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
//Provider
import { GalleryProvider } from '../../providers/gallery';


@IonicPage()
@Component({
  selector: 'page-edit-gallery',
  templateUrl: 'edit-gallery.html'
})
export class EditGalleryPage {

  id: any;
	gallery:any; 
  metadata: any;
  fileName: any;
  storageRef: any;
  uploadTask: any;
  downloadURL: any;
  selectedFile: any;
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public galleryProvider: GalleryProvider) {
  	
    this.gallery = params.data;
      
  }
   //*********** Save edit gallery function **************/
  editgallery(){
    if(this.validate()){
       this.galleryProvider.editGallery(this.gallery.title, this.gallery.downloadURL, this.gallery.id).then( () =>{
      		this.navCtrl.setRoot('HomePage');
       });
    }
  }


  onChange(event){
    this.selectedFile = event.target.files[0];
    this.disableSubmit = true;
    console.log(this.selectedFile);
    this.upLoad();
  }

   //*********** upload gallery image **************/
  upLoad(){
    var fileName = this.selectedFile.name;
    var storageRef = firebase.storage().ref('Gallery Image/' + fileName);
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

          this.gallery.downloadURL = uploadTask.snapshot.downloadURL;
          this.disableSubmit = false;
          console.log(this.downloadURL);
          console.log("successfully uploaded");
    });
  }

     //*********** Validate gallery input **************/
  validate(){
     if(this.gallery.title == undefined || this.gallery.title == ''){
      this.errorMessage = 'Please Add Gallery title';
      return false;
    }
    
    if(this.gallery.downloadURL == undefined || this.gallery.downloadURL == ''){
      this.errorMessage = 'Please Add Image';
      return false;
    }
   
    return true;
  }
  
}
