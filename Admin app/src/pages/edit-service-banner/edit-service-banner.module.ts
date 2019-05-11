import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditServiceBannerPage } from './edit-service-banner';

@NgModule({
  declarations: [
    EditServiceBannerPage,
  ],
  imports: [
    IonicPageModule.forChild(EditServiceBannerPage),
  ],
})
export class EditServiceBannerPageModule {}
