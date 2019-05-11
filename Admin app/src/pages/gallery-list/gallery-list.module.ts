import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryListPage } from './gallery-list';

@NgModule({
  declarations: [
    GalleryListPage,
  ],
  imports: [
    IonicPageModule.forChild(GalleryListPage),
  ],
})
export class GalleryListPageModule {}
