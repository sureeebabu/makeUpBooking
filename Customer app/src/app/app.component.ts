import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController} from 'ionic-angular';

//PLUGINS
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TranslateService} from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Push, PushObject, PushOptions} from '@ionic-native/push';
import firebase from 'firebase';


//PROVIDERS
import {I18nSwitcherProvider} from '../providers/i18n-switcher';
import {Subscription} from 'rxjs/Subscription';


@Component({
 templateUrl: 'app.html',
})
export class DbsMakeup {
  
 @ViewChild(Nav) nav: Nav;
 rootPage: any;
 private i18nSubscription: Subscription;
 public activePage: any;
 headerImage = "assets/imgs/dbstudio.jpg";


 public pages: Array<{title: string, component: any, icon: string}>;
 public userPages: Array<{title: string, component: any, icon: string}>;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    menu: MenuController, private translate: TranslateService, 
    private i18nSwitcherProvider: I18nSwitcherProvider, public storage: Storage, 
    public push: Push, public alertCtrl:AlertController) {

  
    // menu list navigation 
        this.pages = [
          { title: 'Home', component: 'TabsPage', icon:"home" },
          { title: 'Login', component: 'LoginPage', icon:"log-in" },
          { title: 'Register', component: 'SignupPage', icon:"person-add" },
          { title: 'About us', component: 'AboutUsPage', icon:"person-add" },
          { title: 'Chat', component: 'ChatPage', icon:"chatbubbles" },
          { title: 'Settings', component: 'SettingsPage', icon:"cog" }
        
     ];
      // menu list navigation when user Login
     this.userPages = [
          { title: 'Home', component: 'TabsPage', icon:"home" },
          { title: 'My Account', component: 'MyAccountPage', icon:"person" },
          { title: 'Chat', component: 'ChatPage', icon:"chatbubbles" },
          { title: 'About us', component: 'AboutUsPage', icon:"person-add" },
          { title: 'Settings', component: 'SettingsPage', icon:"cog" },
        
               
     ];
    // Authenticate the user
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        menu.enable(true, 'menu1');
        menu.enable(false, 'menu2');
        unsubscribe();
        
      } else {  
         menu.enable(true, 'menu2');
         menu.enable(false, 'menu1');
        unsubscribe();
      }   
 });
       
    

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.storage.get('intro-done').then(done => {
        if (!done) {
          this.storage.set('intro-done', true);
          this.rootPage = 'IntroPage';
        } else {
          this.rootPage = 'TabsPage';
        }
      });
    });

  this.storage.get('AppLangcode')
  .then((AppLangcode) => {
    if(AppLangcode==null){
      translate.setDefaultLang('en');
    }else{
      translate.setDefaultLang(AppLangcode);
    }
  })
  
   // Setting up the Default language and switchers to other language
  
    translate.setDefaultLang('en');
    let userLang = navigator.language.split('-')[0];
    userLang = /(ar|de|en|es|hi|zh)/gi.test(userLang) ? userLang : 'en';
    translate.use(userLang);
    this.i18nSubscription = this.i18nSwitcherProvider.watch().subscribe((lang: string) => {
    this.translate.use(lang);
    });
  
  }
 
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
       this.nav.push(page.component);
       this.activePage = page;
  }

  checkActive(page){
    return page == this.activePage;
  }

//ngOnDestroy() lifecycle hook for a component / directive and we use this hook to unsubscribe the observables.
  ngOnDestroy() : void {
    if (this.i18nSubscription != null) {
      this.i18nSubscription.unsubscribe();
    }
  } 

  // Push Notifications function
  pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: '738419473788'
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };

  const pushObject: PushObject = this.push.init(options);

  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: 'New Push notification',
        message: notification.message
      });
      youralert.present();
    }
  });

  pushObject.on('registration').subscribe((registration: any) => {
     //do whatever you want with the registration ID
  });

  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }

  }




  



