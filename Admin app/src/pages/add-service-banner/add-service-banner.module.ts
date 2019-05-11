import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddServiceBannerPage } from './add-service-banner';

@NgModule({
  declarations: [
    AddServiceBannerPage,
  ],
  imports: [
    IonicPageModule.forChild(AddServiceBannerPage),
  ],
})
export class AddServiceBannerPageModule {}
