import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppVersionPage } from './app-version';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppVersionPage,
  ],
  imports: [
    IonicPageModule.forChild(AppVersionPage),
    TranslateModule.forChild()
  ],
})
export class AppVersionPageModule {}
