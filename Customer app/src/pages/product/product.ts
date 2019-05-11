import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
//Providers
import { Values } from '../../providers/values';
import { DataProvider } from '../../providers/data';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

	productsList: any;
  id: any;
  quantity: any;
  cartItem: any = {};
  price: any;
  addProduct:any;
  showCategories: any;

  constructor(public nav: NavController, public params: NavParams, 
    public dataProvider: DataProvider, public values:Values ) {

    this.id = params.data;
  
    //Product list provider
    this.addProduct = firebase.database().ref('/productList');
  	this.dataProvider.getProductLists(this.id).on('value', snapshot =>{
  		this.productsList = [];

  		snapshot.forEach( snap =>{
  			this.productsList.push({
          category: snap.val().category,
  			  id: snap.key,
	        available: snap.val().available,
	        name: snap.val().name,
	        downloadURL: snap.val().downloadURL,
	        description: snap.val().description,
	        regular_price: snap.val().regular_price,
	        sale_price: snap.val().sale_price
  			});
  		});
  	});
  }
      
pushToCart(){
  this.nav.push('CartPage');
}
  // Delete product form cart
  deleteFromCart(id){
    for(let item in this.dataProvider.cart.line_items){
      if(id == this.dataProvider.cart.line_items[item].product_id){
        this.dataProvider.cart.line_items[item].quantity -= 1;
        this.dataProvider.proqty[id] -= 1;
        this.values.qty -= 1;
        this.dataProvider.total -= parseInt(this.dataProvider.cart.line_items[item].price);
        if(this.dataProvider.cart.line_items[item].quantity == 0){
          this.dataProvider.cart.line_items.splice(item, 1);
        }
      }
    }
  }

  // Add Product from cart
  addToCart(id, name, image, regularPrice, salesPrice){

    if(salesPrice){
      this.price = salesPrice;
    }else {this.price = regularPrice}

      var itemAdded = false;
      for(let item in this.dataProvider.cart.line_items){
        if(id == this.dataProvider.cart.line_items[item].product_id){
          this.dataProvider.cart.line_items[item].quantity += 1;
          this.dataProvider.proqty[id] += 1;
          this.dataProvider.total += parseInt(this.dataProvider.cart.line_items[item].price);
          this.values.qty += 1;
          var itemAdded = true;
        }
      }

      if(!itemAdded){
        this.cartItem.product_id = id;
        this.cartItem.quantity = 1;
        this.dataProvider.proqty[id] = 1;
        this.cartItem.name = name;
        this.cartItem.image = image;
        this.cartItem.price = this.price;
        this.dataProvider.total += parseInt(this.price);
        this.values.qty += 1;
        this.dataProvider.cart.line_items.push(this.cartItem);
      }

      this.cartItem = {};

  }

  getProductDetails(id){
    this.nav.push('ProductDetailsPage', {id: id});
  }
  
  // This is the Search product function
    searchitem(searchbar) {
      var q = searchbar.target.value;
      if (q.trim() == '') {
        return;
      }
  
      this.productsList = this.productsList.filter((v) => {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      })
    }
   
  
}
