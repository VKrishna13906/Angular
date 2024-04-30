import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IpoRoutingModule } from './ipo-routing.module';

import { NgxBootstrapModule } from '../../core/ngx-bootstrap/ngx-bootstrap.module';

import { IpoComponent } from './ipo.component';

import { IPOCommonModule } from '../../common/ipo-common.module';
import { IpoBannerComponent } from './ipo-banner/ipo-banner.component';
import { IpoAccordionComponent } from './ipo-accordion/ipo-accordion.component';
import { IpoOngoingComponent } from './ipo-accordion/ipo-ongoing/ipo-ongoing.component';
import { IpoUpcomingComponent } from './ipo-accordion/ipo-upcoming/ipo-upcoming.component';
import { IpoApplicationsComponent } from './ipo-accordion/ipo-applications/ipo-applications.component';
import { IpoRecentListComponent } from './ipo-accordion/ipo-recent-list/ipo-recent-list.component';
import { ReportsComponent } from './reports/reports.component';
import { FilterPopupComponent } from '../../widgets/filter-popup/filter-popup.component';
import { FilterPipe } from './reports/filter.pipe';
import { FormsModule } from '@angular/forms';
import { IpoMyApplicationPipe } from 'src/app/filters/ipo-my-application.pipe';



@NgModule({
  declarations: [
    IpoComponent,
    IpoBannerComponent,
    IpoAccordionComponent,
    IpoOngoingComponent,
    IpoUpcomingComponent,
    IpoApplicationsComponent,
    IpoRecentListComponent,
    ReportsComponent,
    FilterPopupComponent,
    FilterPipe,
    IpoMyApplicationPipe
  ],
  imports: [
    CommonModule,
    IpoRoutingModule,
    NgxBootstrapModule,
    IPOCommonModule,
    FormsModule
  ],
  exports: [IpoComponent],
  entryComponents: [FilterPopupComponent],
})
export class IpoModule {}
