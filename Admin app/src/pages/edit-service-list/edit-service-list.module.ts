import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditServiceListPage } from './edit-service-list';

@NgModule({
  declarations: [
    EditServiceListPage,
  ],
  imports: [
    IonicPageModule.forChild(EditServiceListPage),
  ],
})
export class EditServiceListPageModule {}
