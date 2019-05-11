import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import { GalleryProvider } from '../../providers/gallery';


@IonicPage()
@Component({
  selector: 'page-gallery-list',
  templateUrl: 'gallery-list.html'
})
export class GalleryListPage {

  galleryList: any;
    

  constructor(public navCtrl: NavController, public params: NavParams, 
    public galleryProvider: GalleryProvider, public alertCtrl: AlertController) {

      //*********** Fetch Gallery List **************/
    this.galleryProvider.getGallery().on('value', snapshot => {
      this.galleryList = [];
      snapshot.forEach( snap => {
        this.galleryList.push({
          id: snap.key,
          title: snap.val().title,
          downloadURL: snap.val().downloadURL
        });

      });
    
     });
    }

// Navigate to Add Gallery Page
  addGallery(){
    this.navCtrl.push('AddGalleryPage');
  }


   //*********** Delete image from gallery function **************/
  deletegallery(id){
    let confirm = this.alertCtrl.create({
       title: 'DELETE',
       message: "Are you sure you want to delete this image?",
       buttons: [
         {
           text: 'Yes',
           handler: data => {
            this.galleryProvider.deleteGallery(id);
            this.navCtrl.pop();
             }
         },
         
         {
           text: 'No',
           handler: data => {
             console.log('Cancelled');
           }
         }


       ]
       
     });
     
     confirm.present();
   }

// Navigate to edit gallery page
  edit(gallery){
    this.navCtrl.push('EditGalleryPage', gallery);
  }

  
}
