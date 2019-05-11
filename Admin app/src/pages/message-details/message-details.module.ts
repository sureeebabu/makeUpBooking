import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageDetailsPage } from './message-details';

@NgModule({
  declarations: [
    MessageDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageDetailsPage),
  ],
})
export class MessageDetailsPageModule {}
