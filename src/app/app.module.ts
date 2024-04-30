import { MobileLogoutModule } from './mobile-logout/mobile-logout.module';
import { LoginNseModule } from './login-nse/login-nse.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BnNgIdleService } from 'bn-ng-idle';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { DisabledRightClickDirective } from './directive/disabled-right-click.directive';
import { ApplyNowComponent } from './IPO/apply-now/apply-now.component';
import { NotAuthorizedAlertComponent } from './IPO/not-authorized-alert/not-authorized-alert.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AutocompleteoffDirective } from './directive/autocompleteoff.directive';
import { DemoServiceService } from './demo-service.service';
import { JksdgfuehdnoService } from './jksdgfuehdno.service';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DisabledRightClickDirective,
    AutocompleteoffDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginNseModule,
    MobileLogoutModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    ConfirmationDialogService,
    DatePipe,
    BnNgIdleService,
    DemoServiceService,
    JksdgfuehdnoService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpResponseTimeLogger,
    //   multi: true
    // }
  ],
  entryComponents: [ApplyNowComponent,NotAuthorizedAlertComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
