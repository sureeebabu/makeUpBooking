import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateBookingPage } from './update-booking';

@NgModule({
  declarations: [
    UpdateBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateBookingPage),
  ],
})
export class UpdateBookingPageModule {}
