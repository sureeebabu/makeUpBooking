import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
//Provider
import { BlogProvider } from '../../providers/blog';


@IonicPage()
@Component({
  selector: 'page-blog-list',
  templateUrl: 'blog-list.html'
})
export class BlogListPage {

  blogList: any;
    

  constructor(public navCtrl: NavController, public params: NavParams, 
    public service: BlogProvider, public alertCtrl: AlertController) {

    //*********** Fetch Blog List **************/
    this.service.getBlog().on('value', snapshot => {
      this.blogList = [];
      snapshot.forEach( snap => {
        this.blogList.push({
          id: snap.key,
          title: snap.val().title,
          short_description: snap.val().short_description,
          description: snap.val().description,
          author: snap.val().author,
          dateTime: snap.val().dateTime,
          downloadURL: snap.val().downloadURL
        });

      });
    
     });
  }

  // Navigate to AddBlog Page
  addBlog(){
    this.navCtrl.push('AddBlogPage');
  }

// Delete Blog Function
  deleteblog(id){
  
    let confirm = this.alertCtrl.create({
       title: 'DELETE',
       message: "Are you sure you want to delete this post?",
       buttons: [
         {
           text: 'Yes',
           handler: data => {
            this.service.deleteBlog(id);
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
   
   // Edit Blog 
  edit(blog){
    this.navCtrl.push('EditBlogPage', blog);
  }
// Search Blog function
  searchitem(searchbar) {
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
    this.blogList = this.blogList.filter((v) => {
      if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }
  
 
}
