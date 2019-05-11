import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditGalleryPage } from './edit-gallery';

@NgModule({
  declarations: [
    EditGalleryPage,
  ],
  imports: [
    IonicPageModule.forChild(EditGalleryPage),
  ],
})
export class EditGalleryPageModule {}
