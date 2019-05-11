import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//PROVIDERS
import { DataProvider } from '../../providers/data';
import { Values } from '../../providers/values';
import { BlogProvider } from '../../providers/blog';

import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
	
	public writtenForm: FormGroup;
	public submitAttempt: boolean = false;
  public fullnameBind;
  public userProfile: any;
  public profilePic: any;
  public item;
  currentUser: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, 
  public formBuilder: FormBuilder, public blogProvider: BlogProvider, public dataProvider: DataProvider,
  public values:Values) {
    
    //Get the blog title
    this.item = this.navParams.get("blogItem");
    
    //Validate the comment form input
  	this.writtenForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        comment:['', Validators.compose([Validators.maxLength(50), Validators.required])],
           
    });


  }

  //get the user profile from profile provider
  ionViewDidLoad() {
    this.currentUser = firebase.auth().currentUser;
    this.dataProvider.getUserProfile(this.currentUser.uid).on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.fullnameBind = userProfileSnapshot.val().displayName;
      this.profilePic = userProfileSnapshot.val().photoURL
  });

}

//This is the function that close modal using viewController
  closeModal() {
    this.viewCtrl.dismiss({title:this.item});
  }

// This is the function that Submit comment
  writeComment(){
    this.submitAttempt = true;
    let profpic = this.profilePic
  	if(!this.writtenForm.valid){
     return;
    }else{
      this.blogProvider.blogCommt(this.item,this.writtenForm.value, profpic);
      this.viewCtrl.dismiss({title:this.item});
    }
  }
}


