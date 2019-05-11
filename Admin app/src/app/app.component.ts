import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdminProfileProvider } from '../providers/admin-profile';


@Component({
  templateUrl: 'app.html'
})
export class AdminApp {  
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = 'LoginPage';

  public pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public adminProfile: AdminProfileProvider,
    public splashscreen: SplashScreen,
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      {  title: 'Home', icon: 'home', component: 'HomePage' },
      {  title: 'Products', icon: 'list', component: 'ItemListPage'},
      {  title: 'Categorys', icon: 'list', component: 'CategoryListPage' },
      {  title: 'Users', icon: 'people', component: 'UserListPage'},
      {  title: 'Blog', icon: 'logo-rss', component: 'BlogListPage'},
      {  title: 'Banner', icon: 'bookmarks', component: 'ServiceBannersPage'},
      {  title: 'Service', icon: 'bookmarks', component: 'ServiceListPage'},
      {  title: 'Gallery', icon: 'images', component: 'GalleryListPage'},
      {  title: 'Bookings', icon: 'list', component: 'BookingListPage'},
      {  title: 'Orders', icon: 'cart', component: 'OrderListPage'},
      {  title: 'Calendar', icon: 'calendar', component: 'CalendarPage'},
      {  title: 'Statistics', icon: 'stats', component: 'StatisticsPage'},
      {  title: 'Privacy', icon: 'list', component: 'PrivacyListPage'},
      {  title: 'Notification', icon: 'notifications', component: 'NotificationListPage'},
      {  title: 'Settings', icon: 'cog', component: 'SettingsPage' }
    ];
  } 
  
  initializeApp() {
    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashscreen.hide();
    });
  }
   
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
    //this.nav.push(page.component);
  }

  logout(){
    this.adminProfile.logoutUser();
    this.nav.setRoot('LoginPage');
  }

}





