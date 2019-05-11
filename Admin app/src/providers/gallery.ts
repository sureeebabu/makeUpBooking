import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class GalleryProvider {
  
    galley_id: Array<number> = [];
    addGalleryList = firebase.database().ref('/galleyList');

    constructor(public http: Http) {
    }
  
     //*********** add gallery function **************/
    addGallery(title:string, downloadURL:any){
      return this.addGalleryList.push({
        title: title,
        downloadURL:downloadURL,
        reverseOrder: 0 - Date.now()
      
      }).then( newGallery =>{
        
           this.addGalleryList.child(newGallery.key).child('id').set(newGallery.key);
     }) ;
    }

     //*********** edit gallery **************/
    editGallery(title:string, downloadURL:any, id:any){
        return this.addGalleryList.child(id).update({
          title: title,
          downloadURL:downloadURL
        }) ;
      }
  
     
      // get gallery
      getGallery(): any {
        return this.addGalleryList;
      }


    deleteGallery(id){
        return this.addGalleryList.child(id).remove();
    }
    
    
  }