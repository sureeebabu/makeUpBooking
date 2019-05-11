import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogListPage } from './blog-list';

@NgModule({
  declarations: [
    BlogListPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogListPage),
  ],
})
export class BlogListPageModule {}
