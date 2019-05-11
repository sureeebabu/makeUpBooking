import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplaintsPage } from './complaints';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ComplaintsPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplaintsPage),
    TranslateModule.forChild()
  ],
})
export class ComplaintsPageModule {}
