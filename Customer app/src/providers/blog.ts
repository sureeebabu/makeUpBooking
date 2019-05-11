import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class BlogProvider {
  
    blog_id: Array<number> = [];
    public blogComment: any;
    public fireRef: any;
    addBlogList = firebase.database().ref('/blogList');

    constructor(public http: Http) {
      this.blogComment = firebase.database().ref('blog-comment');
      this.fireRef = firebase.database().ref();
    }
  
      getBlog(): any {
        return this.addBlogList;
      }

      getBlogDetail(id): any {
        return this.addBlogList.child(id);
      }
      // User comment for blog
      comment(blog){
        let blogRef = this.blogComment.child(blog);
        return blogRef.once("value");
      }

      blogCommt(title, data, profpic){

        //GET A KEY FOR A NEW POST
        let newPostKey = this.blogComment.push().key;
        let d = new Date();
        let e = this.formatDate(d);
    
        let comment = {
         commentDetails: data,
         profilePicture: profpic,
         dateTime: e
        }
    
        let updatePath = {};
        updatePath['/blog-comment/' + title + "/" + newPostKey] = comment;
    
        //UPDATE  TABLE
          return this.fireRef.update(updatePath);
      } 

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
     
  }