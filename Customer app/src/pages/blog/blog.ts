import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
//Provider
import { BlogProvider } from '../../providers/blog';
//Social plugin
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html'
})
export class BlogPage  {

  blogList: any;

  constructor(public navCtrl: NavController, public params: NavParams,private socialSharing: SocialSharing, 
    public blogProvider: BlogProvider) {

     //get the list of blogs from the BlogProvider
      this.blogProvider.getBlog().on('value', snapshot => {
      this.blogList = [];
      snapshot.forEach( snap => {
        this.blogList.push({
          id: snap.key,
          title: snap.val().title,
          short_description: snap.val().short_description,
          description: snap.val().description,
          author: snap.val().author,
          downloadURL: snap.val().downloadURL,
          dateTime: snap.val().dateTime
        });

      });
    
     });
   
  }

  //navigate to the blog-details with blog parameters
  blogDetailsPage(par) {
    this.navCtrl.push('BlogDetailsPage',{
      title: par.title,
      description: par.description,
      downloadURL: par.downloadURL,
      author: par.author,
      dateTime: par.dateTime
    });
  }

  //Facebook social sharing function
  facebookShare() {
    this.socialSharing.shareViaFacebook("shareViaFacebook", this.blogList).then(() => {
      console.log("shareViaFacebook: Success");
    }).catch(() => {
      console.error("shareViaFacebook: failed");
    });
  }
// Instagram social sharing function
  instagramShare(){
    this.socialSharing.shareViaInstagram("shareViaInstagram", this.blogList).then(() => {
      console.log("shareViaInstagram: Success");
    }).catch(() => {
      console.error("shareViaInstagram: failed");
    });
  }

 

}

 



