import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopPage } from './shop';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ShopPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopPage),
    TranslateModule.forChild()
  ],
})
export class ShopPageModule {}
