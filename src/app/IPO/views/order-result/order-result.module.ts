import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderResultRoutingModule } from './order-result-routing.module';
import { OrderResultComponent } from './order-result.component';
import { IPOCommonModule } from '../../common/ipo-common.module';


@NgModule({
  declarations: [OrderResultComponent],
  imports: [
    CommonModule,
    OrderResultRoutingModule,
    IPOCommonModule
  ]
})
export class OrderResultModule { }
