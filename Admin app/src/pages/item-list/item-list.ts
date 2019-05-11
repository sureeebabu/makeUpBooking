import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
//Providers
import { Values } from '../../providers/values';
import { DataProvider } from '../../providers/data';



@IonicPage()
@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html'
})
export class ItemListPage {

  productList: any;
    
  constructor(public navCtrl: NavController, public params: NavParams, public values: Values, 
    public dataProvider: DataProvider, public alertCtrl: AlertController) {

     //*********** Fetch Product list **************/
    this.dataProvider.getProductList().on('value', snapshot => {
      this.productList = [];
      snapshot.forEach( snap => {
        this.productList.push({
          id: snap.key,
          available: snap.val().available,
          name: snap.val().name,
          downloadURL: snap.val().downloadURL,
          description: snap.val().description,
          regular_price: snap.val().regular_price,
          sale_price: snap.val().sale_price,
          category: snap.val().category
        });

      });
    
     });
  }

  add(){
    this.navCtrl.push('AddItemPage');
  }

   //*********** Delete a product from product list **************/
  deleteProduct(id){
    let confirm = this.alertCtrl.create({
       title: 'DELETE',
       message: "Are you sure you want to delete this product?",
       buttons: [
         {
           text: 'Yes',
           handler: data => {
            this.dataProvider.delPro(id);
            this.navCtrl.pop();
             }
         },
         
         {
           text: 'No',
           handler: data => {
             console.log('Cancelled');
           }
         }


       ]
       
     });
     
     confirm.present();
   }
  

  edit(product){
    this.navCtrl.push('EditItemPage', product);
  }

   //*********** Search for product function **************/
  searchitem(searchbar) {
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
    this.productList = this.productList.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

}
