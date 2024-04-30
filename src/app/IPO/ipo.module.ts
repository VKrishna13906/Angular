import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpoRoutingModule } from './ipo-routing.module';
import { BidStatusComponent } from './bid-status/bid-status.component';
import { ApplyIpoComponent } from './ipo-prelogin-dashboard/apply-ipo/apply-ipo.component';
import { IpoOrderStatusComponent } from './ipo-prelogin-dashboard/ipo-order-status/ipo-order-status.component';
import { IpoPreloginDashboardComponent } from './ipo-prelogin-dashboard/ipo-prelogin-dashboard.component';
import { IPODashboardComponent } from './ipodashboard/ipodashboard.component';
import { IPOViewMoreComponent } from './ipoview-more/ipoview-more.component';
import { NCDViewMoreComponent } from './ncdview-more/ncdview-more.component';
import { OrderbookComponent } from './orderbook/orderbook.component';
import { ReportAllotmentPageNewComponent } from './report-allotment-page-new/report-allotment-page-new.component';
import { IpoHeaderComponent } from './ipo-header/ipo-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { NgOtpInputModule } from 'ng-otp-input';
import { IndexComponent } from './index/index.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { SsoComponent } from './sso/sso.component';
import { ApplyNowComponent } from './apply-now/apply-now.component';
import { NotAuthorizedAlertComponent } from './not-authorized-alert/not-authorized-alert.component';
import { ThnkYouUpiComponent } from './thnk-you-upi/thnk-you-upi.component';
import { IPOCommonModule } from './common/ipo-common.module';
@NgModule({
  declarations: [
    BidStatusComponent,
    IPODashboardComponent,
    IpoPreloginDashboardComponent,
    IPOViewMoreComponent,
    NCDViewMoreComponent,
    ReportAllotmentPageNewComponent,
    ApplyIpoComponent,
    IpoOrderStatusComponent,
    OrderbookComponent,
    IpoHeaderComponent,
    IndexComponent,
    ThankYouComponent,
    SsoComponent,
    ApplyNowComponent,
    NotAuthorizedAlertComponent,
    ThnkYouUpiComponent,
  ],
  imports: [
    CommonModule,
    IpoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TooltipModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgOtpInputModule,
    IPOCommonModule
  ]
})
export class IpoModule { }
