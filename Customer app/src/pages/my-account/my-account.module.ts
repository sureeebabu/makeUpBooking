import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAccountPage } from './my-account';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAccountPage),
    TranslateModule.forChild(),
  ],
})
export class MyAccountPageModule {}
