import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
import { BlogProvider } from '../../providers/blog';


@IonicPage()
@Component({
  selector: 'page-add-blog',
  templateUrl: 'add-blog.html'
})
export class AddBlogPage {

	form: any;
  fileName: any;
  metadata: any;
  uploadTask: any;
  storageRef: any;
  downloadURL: any;
  selectedFile: any;
  errorMessage: any;
  disableSubmit: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: BlogProvider) {

     this.form = {};
}
  //*********** Add Blog function *************/
  addblog(form, id){
    let userId = firebase.auth().currentUser.uid;
    let score = 1;
     if(this.validate()){
            this.service.addBlog(this.form.title, this.form.short_description, this.form.description, this.form.author, this.downloadURL, score, userId)
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

//*********** Upload Blog Image function **************/
  upLoad(){
    var fileName = this.selectedFile.name;
    var storageRef = firebase.storage().ref('Blogs Image/' + fileName);
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

//*********** Blog input validation **************/
  validate(){
     if(this.form.title == undefined || this.form.title == ''){
      this.errorMessage = 'Please Add Blog title';
      return false;
    }
   
    if(this.form.description == undefined || this.form.description == ''){
      this.errorMessage = 'Please Add Blog Description';
      return false;
    }
    if(this.form.author == undefined || this.form.author == ''){
      this.errorMessage = 'Please Add Blog Author';
      return false;
    }
    
    if(this.downloadURL == undefined || this.downloadURL == ''){
      this.errorMessage = 'Please Add Blog Image';
      return false;
    }
   
    return true;
  }
  
}


