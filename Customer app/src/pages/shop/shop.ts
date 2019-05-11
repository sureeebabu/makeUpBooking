import { Component, OnInit} from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
//Provider
import { DataProvider } from '../../providers/data';
import { NativeStorage } from '@ionic-native/native-storage';
import { Values } from '../../providers/values';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html'
})
export class ShopPage implements OnInit{

	categoryList: any;
  firebasedata: any;
  addProduct: any;
  data: any;
  products: any;
  loadedPoductList:any;
  poductList: any;
  base64: any;

constructor(public values:Values, private nativeStorage: NativeStorage, 
  public nav: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
    
  // This fetch product list for each categories
  this.addProduct = firebase.database().ref('/productList');
  this.categoryList = [];
  this.firebasedata = [];
  console.log('data');

  this.addProduct.on('value', poductList => {
  let products = [];
  poductList.forEach( product => {
    products.push(product.val());
    return false;
  });

  this.poductList = products;
  this.loadedPoductList = products;
});


}

ngOnInit(){
console.log('data');

  this.nativeStorage.getItem('firebasedatacategories')
    .then(
      data => this.handlecategories(data),
      error => console.error(error)
  );
// Category Provider Here
  this.dataProvider.getCategoryList().on('value', snapshot =>{
    
    this.categoryList = [];
    this.saveCategories(snapshot.val());
    snapshot.forEach( snap =>{
        this.categoryList.push({
          id: snap.key,
          name: snap.val().name,
          downloadURL: snap.val().downloadURL,
          description: snap.val().description
        });  
      });
    });


   // This fetch the settings from admin on currency
    this.dataProvider.getSetting().on('value', snapshot =>{
      if(snapshot.val()){
        this.values.currency = snapshot.val().currency;
      }
      
    });
     
  }

// Navigation function to get Product Details
  getProducts(id){
    this.nav.push('ProductPage', {id:id});
  }

  // This push to searchPage on click toggle button
  toggleSearch() {
    this.nav.push('SearchPage');
   }

pushToCart(){
  this.nav.push('CartPage');
}

  saveCategories(catsnap){
    this.nativeStorage.setItem('firebasedatacategories', catsnap)
    .then(
      () => console.log('Saved'),
      error => console.log('Error')
    );
  }

  // Categories Handlers
  handlecategories(data){
    this.categoryList = [];
    for(let item in data){
      this.categoryList.push({
          id: data[item].id,
          name: data[item].name,
          downloadURL: data[item].downloadURL,
          description: data[item].description
        });
    }  
    
  }


}

