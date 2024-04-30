import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpoCommonRoutingModule } from './ipo-common-routing.module';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { BidCategoryComponent } from './bid-category/bid-category.component';
import { BidPriceQuantityComponent } from './bid-price-quantity/bid-price-quantity.component';
import { ClientDpIdComponent } from './client-dp-id/client-dp-id.component';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';
import { NgxBootstrapModule } from '../core/ngx-bootstrap/ngx-bootstrap.module';
import { PageHeadingComponent } from './page-heading/page-heading.component';
import { SelectDropdownModule } from '../core/select-dropdown/select-dropdown.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageDetailHeadingComponent } from './page-detail-heading/page-detail-heading.component';
import { ShowClientCodeComponent } from './show-client-code/show-client-code.component';

@NgModule({
  declarations: [
    BasicDetailsComponent,
    BidCategoryComponent,
    BidPriceQuantityComponent,
    ClientDpIdComponent,
    PaymentModeComponent,
    PageHeadingComponent,
    PageDetailHeadingComponent,
    ShowClientCodeComponent,
  ],
  imports: [
    CommonModule,
    IpoCommonRoutingModule,
    NgxBootstrapModule,
    SelectDropdownModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports: [
    BasicDetailsComponent,
    BidCategoryComponent,
    BidPriceQuantityComponent,
    ClientDpIdComponent,
    PaymentModeComponent,
    PageHeadingComponent,
    PageDetailHeadingComponent
  ],
})
export class IPOCommonModule {}