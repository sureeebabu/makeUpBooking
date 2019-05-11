import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, ActionSheetController, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';
// PROVIDERS
import { AdminProfileProvider } from '../../providers/admin-profile';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
 
})
export class ProfilePage {
  
  public userProfile: any;
  downloadURL: any;
  selectedFile: any;
  public fileName: any;
  public storageRef: any;
  public uploadTask: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public adminProfile: AdminProfileProvider,
     public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

}

  ionViewDidLoad() {
      this.adminProfile.getUserProfile().on("value",userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.val();  
      });
     }

   //*********** Update user profiles **************/  
  saveProfile() {
    this.adminProfile.updatePicture(this.downloadURL)
    .then(() => {
      this.navCtrl.setRoot('HomePage');
      let basicAlert = this.alertCtrl.create({
        subTitle: 'Save successful',
        buttons: ['OK']
      });
    
      basicAlert.present();
    })
  
  }
    
  closeModal() {
    this.viewCtrl.dismiss();
  }


  updateName(): void {
        const alert: Alert = this.alertCtrl.create({
          title:"Edit your Names",
          cssClass:'alert-danger',
        inputs: [
            {
            name:"firstname", 
            placeholder: "Your first name",
            value: this.userProfile.firstname
            },
          {
            name:"lastname",
            placeholder:"Your last name",
            value: this.userProfile.lastName
          }
        ],
        buttons: [
         {text:"Cancel"},
        {
          text:"Save",
            handler: data => {
             this.adminProfile.updateName(data.firstname, data.lastname);
                 }
              }
          ]
        });
          alert.present();
        }

        updatePhone(): void {
          const alert: Alert = this.alertCtrl.create({
              title:"Edit phone number",
              cssClass:'alert-danger',
          inputs: [
              {
              name:"phone", 
              placeholder: "Your phone number",
              value: this.userProfile.phone
              }
          ],
          buttons: [
           {text:"Cancel"},
          {
            text:"Save",
              handler: data => {
               this.adminProfile.updatePhone(data.phone);
                   }
                }
            ]
          });
            alert.present();
          }


          updateAddress(): void {
            const alert: Alert = this.alertCtrl.create({
                title:"Edit your Address",
                cssClass:'alert-danger',
            inputs: [
                {
                name:"address", 
                placeholder: "Your Address",
                value: this.userProfile.address
                }
            ],
            buttons: [
             {text:"Cancel"},
            {
              text:"Save",
                handler: data => {
                 this.adminProfile.updateAddress(data.address);
                     }
                  }
              ]
            });
              alert.present();
            }


      

      updateEmail(): void {
           let alert: Alert = this.alertCtrl.create({
            title:"Edit your Email",
            cssClass:'alert-danger',
           inputs: [{
                name:'newEmail',
                placeholder:'Your new email'},
              {
                name:'password',
                placeholder:'Your password',
                type:'password'
              }],
             buttons: 
             [{ text:'Cancel'},
             { text:'Save', 
             handler: data=> {
              this.adminProfile.updateEmail(data.newEmail, data.password)
              .then(() => {
                 console.log('Email Changed Successfully'); })
              .catch(error => {
                console.log('ERROR:'+ error.message); });
           }}]
        });
       alert.present();
      }

      updatePassword():void {
            let alert: Alert = this.alertCtrl.create({
              title:"Change Your password",
              cssClass:'alert-danger',
               inputs: [{
                   name:'newPassword',
                   placeholder:'New password',
                   type:'password'
                  },
                 {
                   name:'oldPassword',
                   placeholder:'Old password',
                   type:'password'
                }],
               buttons: 
               [{text:'Cancel'},
                {text:'Save',
                handler: data=> {
           this.adminProfile.updatePassword(data.newPassword,data.oldPassword);
                }
    }
  ]
});

alert.present();

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

    
