import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DbsMakeup } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//*********** Plugins **************/
import { NativeStorage } from '@ionic-native/native-storage';
import { PayPal } from '@ionic-native/paypal';
import { Stripe } from '@ionic-native/stripe';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Network } from '@ionic-native/network';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppRate } from '@ionic-native/app-rate';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Keyboard } from '@ionic-native/keyboard';
import { DatePicker } from '@ionic-native/date-picker';
import { Push } from '@ionic-native/push';


//*********** Providers and Services **************/
import { I18nSwitcherProvider } from '../providers/i18n-switcher';
import { YoutubeProvider } from '../providers/youtube';
import { BookProvider } from '../providers/booking';
import { BlogProvider } from '../providers/blog';
import { ServiceBannerProvider } from '../providers/service-banners';
import { NotificationProvider } from '../providers/notifications';
import { MessagesProvider } from '../providers/message';
import { ServiceListProvider } from '../providers/service-list';
import { GalleryProvider } from '../providers/gallery';
import { PrivacyProvider } from '../providers/privacy';
import { DataProvider } from '../providers/data';
import { Values } from '../providers/values';
import { Functions } from '../providers/functions/functions';


//*********** Modules **************/
import { IonicStorageModule } from '@ionic/storage';
import { Ionic2RatingModule } from 'ionic2-rating';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QRCodeModule } from 'angular2-qrcode';
import { IonicImageViewerModule } from 'ionic-img-viewer';

//*********** Firebase **************/
import firebase from 'firebase';
import { Auth } from '../providers/auth';


// Export the language json file from assets
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

//Initialize the firebase and Angularfirebase
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
    DbsMakeup,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    Ionic2RatingModule,
    IonicImageViewerModule,
    QRCodeModule,
    IonicModule.forRoot(DbsMakeup, {
      tabsHideOnSubPages: true,
    }),
    IonicStorageModule.forRoot(),
    Ionic2RatingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DbsMakeup
  ],
  providers: [
    //Plugins
    StatusBar,
    SplashScreen,
    PayPal,
    Stripe,
    YoutubeVideoPlayer,
    Network,
    SocialSharing,
    NativeStorage,
    AppRate,
    InAppBrowser,
    Keyboard,
    DatePicker,
    Push,

    //Providers
    BookProvider,
    BlogProvider,
    ServiceBannerProvider,
    ServiceListProvider,
    MessagesProvider,
    GalleryProvider,
    I18nSwitcherProvider,
    YoutubeProvider,
    DataProvider,
    Values,
    Functions,
    NotificationProvider,
    PrivacyProvider,
    Auth,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
