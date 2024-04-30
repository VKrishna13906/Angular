import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Auth/auth.guard';
import { BidStatusComponent } from './bid-status/bid-status.component';
import { IndexComponent } from './index/index.component';
import { ApplyIpoComponent } from './ipo-prelogin-dashboard/apply-ipo/apply-ipo.component';
import { IpoOrderStatusComponent } from './ipo-prelogin-dashboard/ipo-order-status/ipo-order-status.component';
import { IpoPreloginDashboardComponent } from './ipo-prelogin-dashboard/ipo-prelogin-dashboard.component';
import { IPODashboardComponent } from './ipodashboard/ipodashboard.component';
import { IPOViewMoreComponent } from './ipoview-more/ipoview-more.component';
import { NCDViewMoreComponent } from './ncdview-more/ncdview-more.component';
import { OrderbookComponent } from './orderbook/orderbook.component';
import { ReportAllotmentPageNewComponent } from './report-allotment-page-new/report-allotment-page-new.component';
import { SsoComponent } from './sso/sso.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ThnkYouUpiComponent } from './thnk-you-upi/thnk-you-upi.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'ipo/dashboardmain', component: IPODashboardComponent, canActivate: [AuthGuard] },
  { path: 'ipo/BidStatus', component: BidStatusComponent, canActivate: [AuthGuard] },
  { path: 'ipo/AllotmentReport', component: ReportAllotmentPageNewComponent, canActivate: [AuthGuard] },
  { path: 'ipo/ipoview-more', component: IPOViewMoreComponent, canActivate: [AuthGuard] },
  { path: 'ipo/ncdview-more', component: NCDViewMoreComponent, canActivate: [AuthGuard] },
  { path: 'ipo/dashboard', component: IpoPreloginDashboardComponent },
  { path: 'ipo/ordertradebook', component: OrderbookComponent, canActivate: [AuthGuard] },
  { path: 'ipo/orderStatus', component: IpoOrderStatusComponent },
  { path: 'ipo/applyIPO', component: ApplyIpoComponent },
  { path: 'ipo/thank-you', component: ThankYouComponent },
  { path: 'ipo/thank-you-upi', component: ThnkYouUpiComponent },
  { path: 'ipo/sso', component: SsoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpoRoutingModule { }
