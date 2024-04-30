import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginNseRoutingModule } from './login-nse-routing.module';
import { LoginNseComponent } from './login-nse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginNseComponent],
  imports: [
    CommonModule,
    LoginNseRoutingModule,
    FormsModule,
    
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LoginNseModule { }
