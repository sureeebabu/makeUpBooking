import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsPrivacyPage } from './terms-privacy';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    TermsPrivacyPage,
  ],
  imports: [
    IonicPageModule.forChild(TermsPrivacyPage),
    TranslateModule.forChild()
  ],
})
export class TermsPrivacyPageModule {}
