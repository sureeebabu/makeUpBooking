import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Content } from 'ionic-angular';
//Provider
import { DataProvider } from '../../providers/data';
import { Values } from '../../providers/values';
//plugin
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html'
})
export class ProductDetailsPage {

  @ViewChild(Content)
  content: Content;

  productDetails: any;
  product: any;
  cartItem: any = {};
  quantity: any;
  headerImage: any = "";

  constructor(public nav: NavController, public navParams: NavParams, private socialSharing: SocialSharing, 
    public dataProvider: DataProvider, public values: Values) {

    this.quantity = "1";
  // get product Details
  	this.dataProvider.getProductDetail(this.navParams.get('id')).on('value', (snapshot) => {
		  this.productDetails = snapshot.val();
		});

    console.log(this.dataProvider.cart);
  }

  // Add Product to Cart
  addToCart(id, name, price, image){
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
  // If item is not added to cart this function shows empty cart
      if(!itemAdded){
        this.cartItem.product_id = id;
        this.cartItem.quantity = 1;
        this.dataProvider.proqty[id] = 1;
        this.cartItem.name = name;
        this.cartItem.image = image;
        this.cartItem.price = price;
        this.dataProvider.total += parseInt(price);
        this.values.qty += 1;
        this.dataProvider.cart.line_items.push(this.cartItem);
        console.log(this.dataProvider.cart.line_items);
      }

      this.cartItem = {};

  }

 // Social Sharing SheetShare function
 shareSheetShare() {
  this.socialSharing.share( this.productDetails ).then(() => {
    console.log("shareSheetShare: Success");
  }).catch(() => {
    console.error("shareSheetShare: failed");
  });
}
//This is the navigate functiom to CartPage
pushToCart(){
  this.nav.push('CartPage');
}
  
}
