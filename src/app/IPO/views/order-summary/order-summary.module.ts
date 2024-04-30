import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderSummaryRoutingModule } from './order-summary-routing.module';
import { OrderSummaryComponent } from './order-summary.component';
import { OrderSummaryDetailsComponent } from './order-summary-details/order-summary-details.component';
import { IPOCommonModule } from '../../common/ipo-common.module';


@NgModule({
  declarations: [OrderSummaryComponent, OrderSummaryDetailsComponent],
  imports: [
    CommonModule,
    OrderSummaryRoutingModule,
    IPOCommonModule
  ]
})
export class OrderSummaryModule { }
