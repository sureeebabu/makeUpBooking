import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBookingPage } from './my-booking';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBookingPage),
    TranslateModule.forChild(),
  ],
})
export class MyBookingPageModule {}
