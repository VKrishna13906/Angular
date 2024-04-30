import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderResultComponent } from './order-result.component';

const routes: Routes = [{ path: '', component: OrderResultComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderResultRoutingModule { }
