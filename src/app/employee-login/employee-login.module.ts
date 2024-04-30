import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeLoginRoutingModule } from './employee-login-routing.module';
import { EmployeeLoginComponent } from './employee-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { SharedModule } from '../shared/shared.module';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [EmployeeLoginComponent],
  imports: [
    CommonModule,
    EmployeeLoginRoutingModule,
    FormsModule,
    
    ReactiveFormsModule,
    ShowHidePasswordModule,
    SharedModule
  ],

})
export class EmployeeLoginModule { }
