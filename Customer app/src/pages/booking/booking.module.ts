import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingPage } from './booking';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BookingPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingPage),
    TranslateModule.forChild()
  ],
})
export class BookingPageModule {}
