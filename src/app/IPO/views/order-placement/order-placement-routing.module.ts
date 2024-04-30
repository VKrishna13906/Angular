import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderPlacementComponent } from './order-placement.component';

const routes: Routes = [{ path: '', component: OrderPlacementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderPlacementRoutingModule { }
