import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditBlogPage } from './edit-blog';

@NgModule({
  declarations: [
    EditBlogPage,
  ],
  imports: [
    IonicPageModule.forChild(EditBlogPage),
  ],
})
export class EditBlogPageModule {}
