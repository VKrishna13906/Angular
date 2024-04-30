import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IpoComponent } from './ipo.component';

const routes: Routes = [{ path: '', component: IpoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpoRoutingModule { }
