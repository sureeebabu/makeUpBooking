import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBookingDetailsPage } from './my-booking-details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyBookingDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBookingDetailsPage),
    TranslateModule.forChild(),
  ],
})
export class MyBookingDetailsPageModule {}
