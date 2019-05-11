import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingMessagePage } from './booking-message';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BookingMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(BookingMessagePage),
    TranslateModule.forChild()
  ],
})
export class BookingMessagePageModule {}
