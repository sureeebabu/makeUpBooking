import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddServiceListPage } from './add-service-list';

@NgModule({
  declarations: [
    AddServiceListPage,
  ],
  imports: [
    IonicPageModule.forChild(AddServiceListPage),
  ],
})
export class AddServiceListPageModule {}
