import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EncrdecrService } from '../../Auth/encrdecr.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
import { isNullOrUndefined } from 'src/app/validation';
@Component({
  selector: 'app-not-authorized-alert',
  templateUrl: './not-authorized-alert.component.html',
  styleUrls: ['./not-authorized-alert.component.scss']
})
export class NotAuthorizedAlertComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private EncrdecrService: EncrdecrService,
    public bsModalRef: BsModalRef,private hireasdkask :  JksdgfuehdnoService) { }

  ngOnInit() {
  }
  GoToLogin(){
    debugger
    this.bsModalRef.hide();
    let ut = sessionStorage.getItem('L2D3506kIHSk3E0');
    let dat = sessionStorage.getItem('5V5uSYBoBVqAvBIBqUEBhv6ELFF');
    if (ut != undefined && ut != null) {
      let u = (ut);
      if (u == '1') {
        this.router.navigate(['/employee-login'], { relativeTo: this.route });
      }
      else if(dat != null && dat == '10')
      {
        window.location.href="https://preferred.kotaksecurities.com/trade/login"; // SSO Server
      }
      else {
        this.router.navigate(['/'], { relativeTo: this.route });
      }
    }
  }
}
