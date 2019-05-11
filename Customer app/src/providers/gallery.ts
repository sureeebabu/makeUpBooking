import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class GalleryProvider {
  
    addGalleryList = firebase.database().ref('/galleyList');

    constructor() {
    }
      getGallery(): any {
        return this.addGalleryList;
      }


   
  }