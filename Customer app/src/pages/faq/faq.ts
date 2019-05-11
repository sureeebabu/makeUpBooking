import { Component } from '@angular/core';
import { NavController, ViewController, IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
 
@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})
export class FaqPage {
  faq: any[];  //faq array from json file
 
  constructor(public navCtrl: NavController, private http: Http, public viewCtrl: ViewController) {
    // Change faq questions in assets/faq.json
    let localData = http.get('assets/faq.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.faq = data;
    })
  }
 
  toggleSection(i) {
    this.faq[i].open = !this.faq[i].open;
  }
 
  toggleItem(i, j) {
    this.faq[i].children[j].open = !this.faq[i].children[j].open;
  }
 
  //This is the function that close modal using viewController
  close() { 
    this.viewCtrl.dismiss();
  }

}