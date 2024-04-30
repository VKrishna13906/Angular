import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSelectModule } from "ngx-select-ex";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxSelectModule,
  ],
  exports: [NgxSelectModule],
})
export class SelectDropdownModule {}
