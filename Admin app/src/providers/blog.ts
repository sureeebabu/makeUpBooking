import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class BlogProvider {
  
   
    blog_id: Array<number> = [];
    addBlogList = firebase.database().ref('/blogList');

    constructor(public http: Http) {  
     
    }
  
     //*********** Add blog function **************/
    addBlog(title:string, short_description:string, description:string, author:string, downloadURL:any, score:number, UserId){
      let d = new Date();
      let e = this.formatDate(d);
      return this.addBlogList.push({
        title: title,
        short_description: short_description,
        description: description,
        author: author,
        downloadURL:downloadURL,
        score: 0,
        userId: UserId,
        dateTime: e,
        reverseOrder: 0 - Date.now()
      
      }).then( newBlog =>{
        
           this.addBlogList.child(newBlog.key).child('id').set(newBlog.key);
     }) ;
    }

    //*********** Edit blog **************/
    editBlog(title:string, short_description:string, description:string, author:string, downloadURL:any, id:any){
        return this.addBlogList.child(id).update({
          title: title,
          short_description: short_description,
          description: description,
          author: author,
          downloadURL:downloadURL
        }) ;
      }
  
    
      getBlog(): any {
        return this.addBlogList;
      }

  // Delete a blog
    deleteBlog(id){
        return this.addBlogList.child(id).remove();
    }
    
      getBlogDetail(id): any {
        return this.addBlogList.child(id);
      }

     //*********** date format **************/
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