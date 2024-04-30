import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPlacementRoutingModule } from './order-placement-routing.module';
import { OrderPlacementComponent } from './order-placement.component';
import { IPOCommonModule } from '../../common/ipo-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrderPlacementComponent],
  imports: [
    CommonModule,
    OrderPlacementRoutingModule,
    IPOCommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderPlacementModule { }
