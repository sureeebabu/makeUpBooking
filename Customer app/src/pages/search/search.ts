import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
//Providers
import { Values } from '../../providers/values';
import { DataProvider } from '../../providers/data';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  
    filtereditems = [];
    temparr = [];
  
    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
      public dataProvider: DataProvider, public values: Values) {
  
            this.dataProvider.getItem().then((res: any) => {
            this.filtereditems = res;
            this.temparr = res;
         })
        
  }
  

// Filter an item here
  searchitem(searchbar) {
    this.filtereditems = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filtereditems = this.filtereditems.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  // Get product details
  getProductDetails(id){
    this.navCtrl.push('ProductDetailsPage', {id: id});
  }

 

}