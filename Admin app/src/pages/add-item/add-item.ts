import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
//Provider
import { DataProvider } from '../../providers/data';



@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {

	form: any;
  fileName: any;
  metadata: any;
  uploadTask: any;
  storageRef: any;
  downloadURL: any;
  selectedFile: any;
  categoryName: any;
  errorMessage: any;
  disableSubmit: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {

     this.form = {};
     this.form.available = true;
     this.form.sale_price = "";
   
    //*********** Fetch Category List **************/
    this.dataProvider.getCategoryList().on('value', snapshot => {
      this.categoryName = [];
      snapshot.forEach( snap => {
        this.categoryName.push({
        id: snap.key,
        name: snap.val().name
      
        });
      });
    });

  }
  //*********** Add Product Function **************/
  addProduct(form, id){
     if(this.validate()){
            this.dataProvider.addPro(this.form.name, this.form.description, this.form.regular_price, this.form.sale_price, this.form.available, this.downloadURL, this.form.category)
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
 //*********** Upload Product image **************/
  upLoad(){
    var fileName = this.selectedFile.name;
    var storageRef = firebase.storage().ref('Products Image/' + fileName);
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

 //*********** Validate Product input **************/
  validate(){
     if(this.form.name == undefined || this.form.name == ''){
      this.errorMessage = 'Please Add Product Name';
      return false;
    }
    if(this.form.category == undefined || this.form.category == ''){
      this.errorMessage = 'Please Add Category';
      return false;
    }

    if(this.form.regular_price == undefined || this.form.regular_price == ''){
      this.errorMessage = 'Please Add Regular Price';
      return false;
    }
    if(this.form.description == undefined || this.form.description == ''){
      this.errorMessage = 'Please Add Description';
      return false;
    }
    if(this.downloadURL == undefined || this.downloadURL == ''){
      this.errorMessage = 'Please Add Image';
      return false;
    }
   
    return true;
  }
  
}
