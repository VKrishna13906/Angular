import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPreLoginComponent } from '../header-pre-login/header-pre-login.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    HeaderPreLoginComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports:[
    HeaderPreLoginComponent,
    ConfirmationDialogComponent,
  ],
  entryComponents: [ConfirmationDialogComponent],
})
export class SharedModule { }
