import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//Plugin
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
//Provider
import { Values } from '../../providers/values';
import { Functions } from '../../providers/functions/functions';
import { DataProvider } from '../../providers/data';
import { TranslateService } from '@ngx-translate/core';

import firebase from 'firebase'
import QRCode from 'qrcode';




@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  buttonText:any;
  disableSubmit: boolean = false;
  currentUser: any;
  paypalPayments: any;
  form: any;
  getToken: any;
  getError: any;
  getPayments: any;
  setting: any;
  payments: any;
  userProfiles: any;
  Checkout: any;
  body: any;
  datas: any;
  ref: any;
  bitcoinaddress = null;
  currencies = []
  generated = '';
  public user;
  public orderNumber;

  //The generated Qrcode is display through this function
  displayQrCode() {
    return this.generated !== '';
  }
  
  constructor(public nav: NavController, public alertCtrl: AlertController, public translate: TranslateService, 
    public params: NavParams, public functions: Functions, public dataProvider: DataProvider, 
    public values:Values, private payPal: PayPal) {

    //The function to get current price of Bitcoin
    this.retrieve() 

    //This get bitcoin address from settings
     this.dataProvider.getSetting().on('value', snapshot =>{
      this.bitcoinaddress = snapshot.val().bitcoin_address + " ";
      this.setting  = snapshot.val();
      console.log(this.setting);
    });

    this.Checkout = "cart"
    this.payments = [];
    this.form = {}; 
    this.buttonText= "Place Order";
   
    this.currentUser = firebase.auth().currentUser;
    console.log(this.dataProvider.total);
    
    this.dataProvider.getSetting().on('value', snapshot =>{
      this.setting  = snapshot.val();
      console.log(this.setting);
    });

  }

 // Delete Product from Cart Function
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

 // Add Product to Cart Function
  addToCart(id){
 
      for(let item in this.dataProvider.cart.line_items){
        if(id == this.dataProvider.cart.line_items[item].product_id){
          this.dataProvider.cart.line_items[item].quantity += 1;
          this.dataProvider.proqty[id] += 1;
          this.dataProvider.total += parseInt(this.dataProvider.cart.line_items[item].price);
          this.values.qty += 1;
        }
      }

  }

process() {     // Convert Bitcoin Address to QRcode 
  const qrcode = QRCode;
  const self = this;
  qrcode.toDataURL(self.bitcoinaddress, { errorCorrectionLevel: 'H' }, function (err, url) {
    self.generated = url;
  })
}

 getIcon(symbol){
    return "assets/icon/"+symbol.toLowerCase()+".png";
  }

  // Get the Price of Bitcoin 
  retrieve(){
    this.dataProvider.getData().then(
      (data:any) => {
        this.currencies = data;
      },
      (err) => {
        this.showError();
      }
    )
  }

  // This is the function that Shows error when when No Network or server is down
  showError() {
    let alert = this.alertCtrl.create({
      title: this.translate.instant('KEY10'), // Check KEY10 at assets/i18n/en.json      
      message: this.translate.instant('KEY11'),  // Check KEY11 at assets/i18n/en.json  
      buttons: [this.translate.instant('KEY12')]   // Check KEY12 at assets/i18n/en.json
    });
    alert.present();
  
}

   //This is the function that generate Random String for Order id
    stringGen(len){
      var text = " ";
      var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < len; i++ )
          text += charset.charAt(Math.floor(Math.random() * charset.length));
      return text;
    }

 // This is the order placement function
  placeOrder(item){
    this.disableSubmit = true;
    this.buttonText = "Placing Order";
        if(this.values.isLoggedIn){
         this.dataProvider.getUserProfile(this.values.id).on('value', snapshot =>{
                      this.userProfiles = snapshot.val();
                  });

            console.log(this.userProfiles);
          if(this.userProfiles.address == ''|| this.userProfiles.address == undefined){
          // If the user has not updated his address
               this.nav.push('UpdateProfilePage', this.userProfiles);
            this.disableSubmit = false;         
          }
        
          else{
           
              if( this.form.payment_method == "paypal"){
                  if(this.userProfiles.address == ''|| this.userProfiles.address == undefined ){

                       this.nav.push('UpdateProfilePage', this.userProfiles);
                        this.disableSubmit = false;
                  }

                  else{

                this.payPal.init({
                  PayPalEnvironmentProduction: this.setting.client_id,
                  PayPalEnvironmentSandbox: this.setting.environment_sandbox
                }).then(() => {
                // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
                   this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
                  // Only needed if you get an "Internal Service Error" after PayPal login!
                  //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
                })).then(() => {
                 this.disableSubmit = false;
                 let payment = new PayPalPayment(this.dataProvider.total.toString(), this.values.currency, 'Sales of Goods', 'sale');
                    this.payPal.renderSinglePaymentUI(payment).then((success) => {
                        this.paypalPayments =success;
                        this.payments.PaymentType = this.form.payment_method;
                        this.payments.id = this.paypalPayments.response.id;
                        this.payments.status = this.paypalPayments.response.state;
                        this.disableSubmit = false;
                        //this.customerDetails = this.userProfiles;
                        this.orderNumber = this.stringGen(8);
                        let status = "pending";
                        this.functions.showAlert(this.translate.instant('KEY13'),  this.translate.instant('KEY14') + this.orderNumber); // Check KEY13/KEY14 at assets/i18n/en.json  
                        this.dataProvider.addOrders( item, this.dataProvider.total, this.values.id, this.payments, this.userProfiles, this.orderNumber, status).then(()=>{
                        //  this.nav.setRoot('OrderList'); 
                          this.dataProvider.cart.line_items = []; 
                           this.values.qty = null;
                           this.dataProvider.proqty = [];
                           this.dataProvider.total = 0;
                         });
                      }, (error) => {
                        // Error or render dialog closed without being successful
                        console.log(error);
                        this.functions.showAlert('Error', error.message);
                      });

                      }, (error) => {
                      // Error in configuration
                        console.log(error);
                        this.functions.showAlert('Error', error.message);
                      });
                       }, (error) => {
                      console.log(error);
                      // Error in initialization, maybe PayPal isn't supported or something else
                      this.functions.showAlert('Error', error);
                      this.disableSubmit = false;
                  });
              }

                  }

             else if (this.form.payment_method == "cod") {

                  if(this.userProfiles.address == ''|| this.userProfiles.address == undefined ){

                       this.nav.push('UpdateProfilePage', this.userProfiles);
                        this.disableSubmit = false;
                  }

                  else{
                      this.payments.PaymentType = this.form.payment_method;
                       this.orderNumber = this.stringGen(8);
                       let status = "pending";
                      this.functions.showAlert(this.translate.instant('KEY13'),  this.translate.instant('KEY14') + this.orderNumber); // Check KEY13/KEY14 at assets/i18n/en.json  
                      this.dataProvider.addOrders( item, this.dataProvider.total, this.values.id, this.payments, this.userProfiles, this.orderNumber, status).then(()=>{
                        // this.nav.setRoot('OrderList');     
                           this.dataProvider.cart.line_items = []; 
                           this.disableSubmit = false;
                           this.values.qty = null;
                           this.dataProvider.proqty = []; 
                           this.dataProvider.total = 0;      
                      });        
                  }
              }

                 else if (this.form.payment_method == "bitcoin") {

                  if(this.userProfiles.address == ''|| this.userProfiles.address == undefined ){

                       this.nav.push('UpdateProfilePage', this.userProfiles);
                        this.disableSubmit = false;
                  }

                  else{
                      this.payments.PaymentType = this.form.payment_method;
                       this.orderNumber = this.stringGen(8);
                       let status = "pending";
                      this.functions.showAlert(this.translate.instant('KEY13'),  this.translate.instant('KEY14') + this.orderNumber); // Check KEY13/KEY14 at assets/i18n/en.json  
                      this.dataProvider.addOrders( item, this.dataProvider.total, this.values.id, this.payments, this.userProfiles, this.orderNumber, status).then(()=>{
                        // this.nav.setRoot('OrderList');     
                           this.dataProvider.cart.line_items = []; 
                           this.disableSubmit = false;
                           this.values.qty = null;
                           this.dataProvider.proqty = []; 
                           this.dataProvider.total = 0;      
                      });        
                  }

              }

          } 
      }  
  

      else{
        this.nav.parent.select(2);
          this.disableSubmit = false;
      }
  }


}
