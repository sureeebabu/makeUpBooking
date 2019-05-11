import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogPage } from './blog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BlogPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogPage),
    TranslateModule.forChild()
  ],
})
export class BlogPageModule {}
