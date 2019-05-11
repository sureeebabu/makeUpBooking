import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductPage),
    TranslateModule.forChild()
  ],
})
export class ProductPageModule {}
