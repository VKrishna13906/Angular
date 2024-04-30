import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./IPO/ipo.module').then(m => m.IpoModule) },
  { path: 'login-corp', loadChildren: () => import('./login-nse/login-nse.module').then(m => m.LoginNseModule) },
  { path: 'employee-login', loadChildren: () => import('./employee-login/employee-login.module').then(m => m.EmployeeLoginModule) },
  { path: 'mb-logout', loadChildren: () => import('./mobile-logout/mobile-logout.module').then(m => m.MobileLogoutModule) },

  //NEW
  { path: "ipo", loadChildren: () => import("./IPO/views/ipo/ipo.module").then((m) => m.IpoModule), },
  { path: 'order-result', loadChildren: () => import('./IPO/views/order-result/order-result.module').then(m => m.OrderResultModule) },
  { path: 'order-summary', loadChildren: () => import('./IPO/views/order-summary/order-summary.module').then(m => m.OrderSummaryModule) },
  { path: 'order-status', loadChildren: () => import('./IPO/views/order-status/order-status.module').then(m => m.OrderStatusModule) },
  { path: 'order-placement', loadChildren: () => import('./IPO/views/order-placement/order-placement.module').then(m => m.OrderPlacementModule) },
  { path: '**', component: PageNotFoundComponent },
  { path: 'order-placement', loadChildren: () => import('./IPO/views/order-placement/order-placement.module').then(m => m.OrderPlacementModule) },
  { path: 'order-result', loadChildren: () => import('./IPO/views/order-result/order-result.module').then(m => m.OrderResultModule) },
  { path: 'order-status', loadChildren: () => import('./IPO/views/order-status/order-status.module').then(m => m.OrderStatusModule) },
  { path: 'order-summary', loadChildren: () => import('./IPO/views/order-summary/order-summary.module').then(m => m.OrderSummaryModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
