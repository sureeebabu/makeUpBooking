import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGalleryPage } from './add-gallery';

@NgModule({
  declarations: [
    AddGalleryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGalleryPage),
  ],
})
export class AddGalleryPageModule {}
