import { Component, ViewChild } from '@angular/core';
import { IonicPage, PopoverController } from 'ionic-angular';
//provider
import { Values } from '../../providers/values';


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'PortfolioPage';
  tab3Root = 'BookingPage';
  tab4Root = 'ShopPage';
  tab5Root = 'BlogPage';
  
  @ViewChild('myTabs') tabRef: any;
  

  constructor(public popoverCtrl: PopoverController, public values: Values) {
  
  }
  
  selectTab() {
    this.tabRef.select(2);
  }

  
}




