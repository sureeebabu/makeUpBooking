import { Injectable } from '@angular/core';


@Injectable()
export class Values {

  count: number = 0;
  currency: any = "USD";
  price: any;
  cart: Array<number> = [];
  qty: number = null;
  isLoggedIn: boolean = false;
  customerList: any;
  address: any;
  id: any;
  constructor( ) {

 }

 
changecurrency(curr){
  if(curr ==  "USD"){
    this.currency = "USD";
  }

  else if(curr == "INR"){
    this.currency = "INR";
  }

  else if(curr == "EUR"){
    this.currency = "EUR";
  }

  else if(curr == "KWD"){
    this.currency = "KWD";
  }

  
}



}