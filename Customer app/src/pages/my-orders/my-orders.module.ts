import { NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyOrdersPage } from './my-orders';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    MyOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyOrdersPage),
    TranslateModule.forChild()
  ],

})
export class MyOrdersPageModule {}
