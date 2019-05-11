import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderListPage } from './order-list';
import { AccordionListComponent } from '../../components/accordion-list/accordion-list';

@NgModule({
  declarations: [
    OrderListPage,
    AccordionListComponent,
  ],
  imports: [
    IonicPageModule.forChild(OrderListPage),
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OrderListPageModule {}
