import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Content, AlertController, ModalController } from 'ionic-angular';
import firebase from 'firebase';
//Provider
import { DataProvider } from '../../providers/data';



@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html'
})
export class UserListPage {
	userList: any;
  currentUser: any;
  user: any;
  @ViewChild(Content)
  content: Content;

  productsList: any;
  id: any;
  filter: any;
  public searchTerm: string = '';
  public searching: boolean = false;
  search: boolean    = false;
  public keyname;
 
  //filtereditems = [];
  temparr: any;  


  constructor(public nav: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController, public modalCtrl: ModalController, 
    public dataProvider: DataProvider) {

    this.filter = {};
     //*********** Fetch list of users **************/
   this.currentUser = firebase.auth().currentUser;
     this.user = firebase.auth().currentUser;
     	this.dataProvider.getCustomerList().on('value', snapshot =>{
  		this.userList = [];
  		snapshot.forEach(snap =>{
  			this.userList.push({
          id: snap.key,
          photoURL: snap.val().photoURL,
          displayName: snap.val().displayName,
          lastname: snap.val().lastname,
	  			email: snap.val().email,
          address: snap.val().address,
          phoneNumber: snap.val().phoneNumber
  			});
  		});
    });	
  }

  // NAVIGATE to edit user page
  editUser(item){
  	this.nav.push('EditUserPage', item);
  }

  
 //*********** Delete a user from the list **************/
  delUser(id){
    let confirm = this.alertCtrl.create({
       title: 'DELETE',
       message: "Are you sure you want to delete this user?",
       buttons: [
         {
           text: 'Yes',
           handler: data => {
            this.dataProvider.deleteCustomers(id);
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
  

  getUser(){
    this.nav.push('Profile');
  }

  // search for user function
  searchitem(searchbar) {
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
    this.userList = this.userList.filter((v) => {
      if (v.email.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

}
