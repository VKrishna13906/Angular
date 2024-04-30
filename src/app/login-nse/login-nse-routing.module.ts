import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginNseComponent } from './login-nse.component';

const routes: Routes = [{ path: '', component: LoginNseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginNseRoutingModule { }
