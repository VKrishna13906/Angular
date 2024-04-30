import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileLogoutRoutingModule } from './mobile-logout-routing.module';
import { MobileLogoutComponent } from './mobile-logout.component';


@NgModule({
  declarations: [MobileLogoutComponent],
  imports: [
    CommonModule,
    MobileLogoutRoutingModule
  ]
})
export class MobileLogoutModule { }
