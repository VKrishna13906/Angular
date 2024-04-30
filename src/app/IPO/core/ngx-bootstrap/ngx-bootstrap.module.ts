import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from "ngx-bootstrap/tabs";
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  exports: [TabsModule, AccordionModule, ModalModule, BsDatepickerModule],
})
export class NgxBootstrapModule {}
