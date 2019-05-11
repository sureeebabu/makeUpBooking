import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentPage } from './comment';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CommentPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentPage),
    TranslateModule.forChild()
  ],
})
export class CommentPageModule {}
