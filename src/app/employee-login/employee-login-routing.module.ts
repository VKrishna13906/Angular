import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeLoginComponent } from './employee-login.component';

const routes: Routes = [{ path: '', component: EmployeeLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeLoginRoutingModule { }
