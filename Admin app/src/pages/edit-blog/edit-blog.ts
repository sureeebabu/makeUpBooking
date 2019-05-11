import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
//Provider
import { BlogProvider } from '../../providers/blog';

@IonicPage()
@Component({
  selector: 'page-edit-blog',
  templateUrl: 'edit-blog.html'
})
export class EditBlogPage {

  id: any;
	blog:any; 
  metadata: any;
  fileName: any;
  storageRef: any;
  uploadTask: any;
  downloadURL: any;
  selectedFile: any;
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public blogprovider: BlogProvider) {
  	
    this.blog = params.data;
      
  }
   //*********** Edit Blog function **************/
  editblog(){
    if(this.validate()){
       this.blogprovider.editBlog(this.blog.title, this.blog.short_description, this.blog.description, this.blog.author, this.blog.downloadURL, this.blog.id).then( () =>{
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

   //*********** Upload image for edited blog **************/
  upLoad(){
    var fileName = this.selectedFile.name;
    var storageRef = firebase.storage().ref('Blogs Image/' + fileName);
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

          this.blog.downloadURL = uploadTask.snapshot.downloadURL;
          this.disableSubmit = false;
          console.log(this.downloadURL);
          console.log("successfully uploaded");
    });
  }

     //*********** Validate Blog input **************/
  validate(){
     if(this.blog.title == undefined || this.blog.title == ''){
      this.errorMessage = 'Please Add Blog title';
      return false;
    }
    
    if(this.blog.description == undefined || this.blog.description == ''){
      this.errorMessage = 'Please Add Description';
      return false;
    }
    if(this.blog.author == undefined || this.blog.author == ''){
      this.errorMessage = 'Please Add Author';
      return false;
    }
    if(this.blog.downloadURL == undefined || this.blog.downloadURL == ''){
      this.errorMessage = 'Please Add Image';
      return false;
    }
   
    return true;
  }
  
}
