import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBlogPage } from './add-blog';

@NgModule({
  declarations: [
    AddBlogPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBlogPage),
  ],
})
export class AddBlogPageModule {}
