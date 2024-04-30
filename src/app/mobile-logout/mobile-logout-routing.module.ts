import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileLogoutComponent } from './mobile-logout.component';

const routes: Routes = [{ path: '', component: MobileLogoutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileLogoutRoutingModule { }
