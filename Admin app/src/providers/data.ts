import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';


@Injectable()
export class DataProvider {
  setting: any;
  product_id: Array<number> = [];
  url: any;
  cart: any;
  params:any;
  orderLists: any;
  public ref: any;  
  productsList:any;
  customerList: any;
  public orderList: any;
  public addProduct: any;
  public addCategory: any;
  public profilePictureRef: any; 
  public currentUser: any;
  currency: any = "USD";
  public user: any;
  total: number = 0.00;
  proqty: Array<number> = [];
  users: any;
  name: any;
  chrg: any;
  prob: any;
  constructor(public http: Http) {

    this.cart = { "line_items": [], };
    this.currentUser = firebase.auth().currentUser;
    this.setting = firebase.database().ref('/Setting');
    this.orderList = firebase.database().ref('/Order-List'); 
    this.addProduct = firebase.database().ref('/productList');
    this.addCategory = firebase.database().ref('/Categorys'); 
    this.customerList = firebase.database().ref('/Customer-List' );

  }

  getCategoryList(): any {
    return this.addCategory;
  }

  getProductLists(id){
    this.productsList = this.addProduct.orderByChild("category").equalTo(id.id);
    return this.productsList;
  }


  getSetting(){
    return this.setting;
  }

  getOrderDetail(id){
    return this.orderList.child(id);
  }

 //*********** Add payment settingd **************/
  addSettting(form){
    return this.setting.set({
      cod: form.cod,
      bitcoin: form.bitcoin,
      paypal: form.paypal,
      client_id: form.client_id,
      currency: form.currency,
      environment_sandbox: form.environment_sandbox,
      bitcoin_address: form.bitcoin_address
    });
  }

   //*********** Add product here**************/
  addPro(name:string, description:string, regular_price:number, sale_price:number, available:string, downloadURL:any, category:any){
    return this.addProduct.push({
      category: category,
      name: name,
      description: description,
      regular_price: regular_price,
      sale_price:sale_price,
      downloadURL:downloadURL,
      available: available,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      reverseOrder: 0 - Date.now()

    }).then( newProduct =>{
      
         this.addProduct.child(newProduct.key).child('id').set(newProduct.key);
   }) ;
  }

   //*********** Add category **************/
  addCat(name:String, description:String, downloadURL:any){
    return this.addCategory.push({
      name: name,
      description: description,
      downloadURL: downloadURL

    }) .then( newCategory => {
        this.addCategory.child(newCategory.key).child('id').set(newCategory.key);
    });
  }

   //*********** Edit category **************/
  editCategory(name:string, description:string, id, downloadURL:any){
    return this.addCategory.child(id).update({
      name: name,
      description: description,
      downloadURL:downloadURL
    });
  }

  //*********** Edit user **************/
  editCustomers(displayName: String, phone:String, address: String, id: any){
    return this.customerList.child(id).update({
      displayName: displayName,
      phoneNumber: phone,
      address: address
    });
    
  }

   //*********** Save user profile **************/
  saveCustomers(displayName: String, phone:String, address: String, id: any){
    return this.customerList.child(id).update({
      displayName: displayName,
      phoneNumber: phone,
      address: address,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      reverseOrder: 0 - Date.now()
    });
  }

   //*********** edit product **************/
  editPro(name:string, description:any, regular_price:number, sale_price:number, available:any, downloadURL:any, category: any, id:any){
    return this.addProduct.child(id).update({
      name: name,
      description: description,
      regular_price: regular_price,
      sale_price: sale_price,
      available: available,
      downloadURL: downloadURL,
      category: category
    }) ;
  }

  getProductList(): any {
    return this.addProduct;
  }

  filterProducts(searchTerm){
    return this.addProduct.filter((item) => {
        return item.name.toLowerCase().indexOf(searchTerm.toString().toLowerCase()) > -1;
    });     

  
}

// Delete order
delOrder(id){
  return this.orderList.child(id).remove();
}

  getCustomerList(): any{
    return this.customerList;
  }

  delCat(id){
    return this.addCategory.child(id).remove();
  }

  delPro(id){
    return this.addProduct.child(id).remove();
  }
  
  deleteCustomers(id){
    return this.customerList.child(id).remove();
    
  }

  getOrderList(){
    return this.orderList.orderByChild("reverseOrder");
  }

  updateStatus(status: number, id){
    return this.orderList.child(id).update({
      status: status
    });
  }
 

}












