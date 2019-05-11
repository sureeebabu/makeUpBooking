import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController, MenuController } from 'ionic-angular';
//Provider
import { DataProvider } from '../../providers/data';


@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html'
})
export class CategoryListPage {

   categoryList: any;
   category: any;

  constructor(public nav: NavController, public params: NavParams, public dataProvider: DataProvider, 
    public alertCtrl: AlertController, public menuCtrl: MenuController) {

       //*********** Fetch Category List **************/
  	this.dataProvider.getCategoryList().on('value', snapshot => {
  	  this.categoryList = [];
  	  snapshot.forEach( snap => {
    	  this.categoryList.push({
    	  id: snap.key,
    		name: snap.val().name,
    		downloadURL: snap.val().downloadURL,
    		description: snap.val().description
    		});
  	  });
    });

  }

// Navigate to edit category page
  editCategory(category){
     this.nav.push('EditCategoryPage', category);
  }
  
  addCat(){
  	this.nav.push('AddCategoryPage');
  }

  // Delete category function
  deleteCat(id){
    let confirm = this.alertCtrl.create({
       title: 'DELETE',
       message: "Are you sure you want to delete this category?",
       buttons: [
         {
           text: 'Yes',
           handler: data => {
            this.dataProvider.delCat(id);
            this.nav.pop();
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

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'menu-right');
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(false, 'menu-right');
  }

     //*********** Search Category function **************/
  searchitem(searchbar) {
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
    this.categoryList = this.categoryList.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

}

