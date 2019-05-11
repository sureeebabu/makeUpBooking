import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceBannersPage } from './service-banners';

@NgModule({
  declarations: [
    ServiceBannersPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceBannersPage),
  ],
})
export class ServiceBannersPageModule {}
