import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyOrderDetailsPage } from './my-order-details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyOrderDetailsPage),
    TranslateModule.forChild(),
  ],
})
export class MyOrderDetailsPageModule {}
