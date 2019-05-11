import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
import { DataProvider } from '../../providers/data';

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html'
})
export class EditItemPage {

  id: any;
	product:any; 
  metadata: any;
  fileName: any;
  storageRef: any;
  uploadTask: any;
  downloadURL: any;
  selectedFile: any;
  categoryName: any;
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public dataProvider: DataProvider) {
  	
    this.product = params.data;
        //*********** Fetch category **************/
      this.dataProvider.getCategoryList().on('value', snapshot => {
      this.categoryName = [];
      snapshot.forEach( snap => {
        this.categoryName.push({
        id: snap.key,
        name: snap.val().name,
      
        });
      });
    });  
  }
   //*********** Save edit category function **************/
  edititem(){
    if(this.validate()){
       this.dataProvider.editPro(this.product.name, this.product.description, this.product.regular_price, this.product.sale_price, this.product.available, this.product.downloadURL, this.product.category, this.product.id).then( () =>{
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

   //*********** Upload image for product **************/
  upLoad(){
    var fileName = this.selectedFile.name;
    var storageRef = firebase.storage().ref('Products Image/' + fileName);
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

          this.product.downloadURL = uploadTask.snapshot.downloadURL;
          this.disableSubmit = false;
          console.log(this.downloadURL);
          console.log("successfully uploaded");
    });
  }
   //*********** Validate product input **************/
  validate(){
     if(this.product.name == undefined || this.product.name == ''){
      this.errorMessage = 'Please Add Product Name';
      return false;
    }
    if(this.product.category == undefined || this.product.category == ''){
      this.errorMessage = 'Please Add Category';
      return false;
    }
    if(this.product.regular_price == undefined || this.product.regular_price == ''){
      this.errorMessage = 'Please Add Regular Price';
      return false;
    }
    if(this.product.description == undefined || this.product.description == ''){
      this.errorMessage = 'Please Add Description';
      return false;
    }
    if(this.product.downloadURL == undefined || this.product.downloadURL == ''){
      this.errorMessage = 'Please Add Image';
      return false;
    }
   
    return true;
  }
  
}
