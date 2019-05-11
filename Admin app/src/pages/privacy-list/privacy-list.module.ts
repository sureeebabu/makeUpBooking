import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivacyListPage } from './privacy-list';

@NgModule({
  declarations: [
    PrivacyListPage,
  ],
  imports: [
    IonicPageModule.forChild(PrivacyListPage),
  ],
})
export class PrivacyListPageModule {}
