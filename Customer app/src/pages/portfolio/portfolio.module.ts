import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PortfolioPage } from './portfolio';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    PortfolioPage,
      
  ],
  imports: [
    IonicPageModule.forChild(PortfolioPage),
    TranslateModule.forChild()
  ],
 

})
export class PortfolioPageModule {}





