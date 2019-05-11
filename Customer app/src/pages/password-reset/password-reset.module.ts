import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordResetPage } from './password-reset';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PasswordResetPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordResetPage),
    TranslateModule.forChild()
  ],
})
export class PasswordResetPageModule {}
