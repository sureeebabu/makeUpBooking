import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { AdminApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//*********** Modules **************/
import { BlogProvider } from '../providers/blog';
import { GalleryProvider } from '../providers/gallery';
import { BookingProvider } from '../providers/booking';
import { ServiceListProvider } from '../providers/service-list';
import { AdminProfileProvider } from '../providers/admin-profile';
import { DataProvider } from '../providers/data';
import { ServiceBannerProvider } from '../providers/service-banners';
import { MessageProvider } from '../providers/messages';
import { NotificationProvider } from '../providers/notifications';
import { PrivacyProvider } from '../providers/privacy';
import { Values } from '../providers/values';

//*********** Firebase **************/
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase';


var config = {
  apiKey: "AIzaSyBGZIS2w8O0h8896e_YQJDGrFbNu6I3i8I",
  authDomain: "ecommercapp.firebaseapp.com",
  databaseURL: "https://ecommercapp.firebaseio.com",
  projectId: "ecommercapp",
  storageBucket: "ecommercapp.appspot.com",
  messagingSenderId: "738419473788"
};
firebase.initializeApp(config);


@NgModule({
  declarations: [
    AdminApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(AdminApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AdminApp
  
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AdminProfileProvider,
    DataProvider,
    ServiceBannerProvider,
    ServiceListProvider,
    BookingProvider,
    NotificationProvider,
    BlogProvider,
    MessageProvider,
    Values,
    PrivacyProvider,
    GalleryProvider,
  
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
