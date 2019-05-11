import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';


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
  public user: any;
  total: number = 0.00;
  proqty: Array<number> = [];
  getSecKey: any;
  users: any;
  name: any;
  chrg: any;
  prob: any;

    urlbase = "https://api.coinmarketcap.com/v1/ticker/?limit=1"; //Coinmarketcap API for bitcoin price

  constructor(public http: Http, public Httpclient: HttpClient) {

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

 

getAddress(setting){
    return this.setting.get({
      bitcoin_address: setting.bitcoin_address,
    })
  }
  
   getData(){
    return new Promise((resolve, reject) => {
      this.Httpclient.get(this.urlbase)
      .subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
      })
    })
  }
 
  getProductDetail(id): any {
    return this.addProduct.child(id);
  }

  delOrder(id){
    return this.orderList.child(id).remove();
  }

  getOrderDetail(id){
    return this.orderList.child(id);
  }


  getUserProfile(id): any {
    return this.customerList.child(id);
  }

 // Get date format
   formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

  // Get product list for search page
  getItem() {
    var promise = new Promise((resolve, reject) => {
      this.addProduct.orderByChild('id').once('value', (snapshot) => {
        let itemdata = snapshot.val();
        let temparr = [];
        for (var key in itemdata) {
          temparr.push(itemdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  addOrders(order:String, total:number, uid:String, payments:String, userProfiles:String, orderNumber:String, status:String){
    let d = new Date();
    let e = this.formatDate(d);  
    return this.orderList.push({
      email: uid,
      items: order,
      total: total,
      payments: payments,
      customerDetails: userProfiles,
      orderNumber: orderNumber,
      status: status,
      dateTime: e,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      reverseOrder: 0 - Date.now()
    }).then( newOrder => {
      this.orderList.child(newOrder.key).child('id').set(newOrder.key);
    });
  }


  getSetting(){
    return this.setting;
  }

  getMyOrderList(id){
    console.log(id);
    this.orderLists =  this.orderList.orderByChild("email").equalTo(id);//.orderByChild("timeStamp");
    return this.orderLists;
  }

  editCustomers(displayName: String, phone:String, address: String, id: any){
    return this.customerList.child(id).update({
      displayName: displayName,
      phoneNumber: phone,
      address: address
    })
  }

  saveCustomers(displayName: String, phone:String, address: String, id: any){
    return this.customerList.child(id).update({
      displayName: displayName,
      phoneNumber: phone,
      address: address,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      reverseOrder: 0 - Date.now()
    });
  }  

  saveProfilePic(downloadURL: string, id: any){
    return this.customerList.child(id).update({
      photoURL: downloadURL
    });
  }  

  }













