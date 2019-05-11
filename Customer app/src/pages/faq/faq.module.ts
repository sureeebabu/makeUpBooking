import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqPage } from './faq';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FaqPage,
     
  ],
  imports: [
    IonicPageModule.forChild(FaqPage),
    TranslateModule.forChild()
  ],

  exports: [
    FaqPage
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class FaqPageModule {}
