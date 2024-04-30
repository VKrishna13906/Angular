import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderStatusRoutingModule } from './order-status-routing.module';
import { OrderStatusComponent } from './order-status.component';
import { OrderStatusStepperComponent } from './order-status-stepper/order-status-stepper.component';
import { OrderApplicationDetailsComponent } from './order-application-details/order-application-details.component';
import { IPOCommonModule } from '../../common/ipo-common.module';


@NgModule({
  declarations: [OrderStatusComponent, OrderStatusStepperComponent, OrderApplicationDetailsComponent],
  imports: [
    CommonModule,
    OrderStatusRoutingModule,
    IPOCommonModule
  ]
})
export class OrderStatusModule { }
