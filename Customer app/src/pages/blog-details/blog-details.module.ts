import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogDetailsPage } from './blog-details';
import { ElasticHeaderModule } from '../../components/elastic-header/elastic-header.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    BlogDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogDetailsPage),
    ElasticHeaderModule,
    TranslateModule.forChild()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogDetailsPageModule {}
