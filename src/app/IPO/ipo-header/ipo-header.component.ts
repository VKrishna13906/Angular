import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ClientDataService } from '../../services/client-data.service';
import { EncrdecrService } from '../../Auth/encrdecr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApplyNowComponent } from '../apply-now/apply-now.component';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-ipo-header',
  templateUrl: './ipo-header.component.html',
  styleUrls: ['./ipo-header.component.scss']
})
export class IpoHeaderComponent implements OnInit {
  logo: string;
  logoWidth: string;
  logoHeight: string;
  CompanyName: string;
  NavHeight: string;
  G_UserType: any = '';
  IsLoggedIn: boolean = false;
  CommonBaseHref = environment.CommonBaseHref;
  modalRef?: BsModalRef;
  CompanyLogo: string;
  showCompanyImg: boolean = false;
  IsMobile: boolean = false;
  constructor(private ClientDataService: ClientDataService,
    private EncrdecrService: EncrdecrService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private hireasdkask :  JksdgfuehdnoService,
    private LoginService: LoginService) { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.SetViewPort(event.target.innerWidth)
  }
  ngOnInit() {
    //
    this.logo = sessionStorage.getItem('logo');
    this.CompanyName = this.ClientDataService.GetCompanyName();
    this.logoWidth = '150px';
    this.logoHeight = '49px';
    this.NavHeight = '62px';
    this.SetViewPort(window.innerWidth);
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    if (token != null && token != undefined && token != '') {
      this.IsLoggedIn = true;
      let u = sessionStorage.getItem('L2D3506kIHSk3E0');
      this.G_UserType = parseInt((u));
    }
    else {
      this.IsLoggedIn = false;
    }
    /* guest loging queryString */
    //
    let logo = sessionStorage.getItem('Adjfsjhgfjhse3@@34737');
    if (logo != undefined && logo != null && logo != '' && this.G_UserType != 1 && this.IsLoggedIn == false) {
      this.CompanyLogo = (logo);
      console.log(`CompanyLogo => ${this.CompanyLogo}`)
      this.showCompanyImg = true;
    } else {
      sessionStorage.removeItem('Adjfsjhgfjhse3@@34737');
      this.showCompanyImg = false;
    }
    /////////


  }
  SetViewPort(w) {
    if (w <= 767) {
      this.IsMobile = true;
    }
    else {
      this.IsMobile = false;
    }
  }
  OnClickDashboard() {
    switch (this.G_UserType) {
      case 1:
        this.router.navigate(['/ipo/dashboardmain'], { relativeTo: this.route });
        break;
      case 2:
        this.router.navigate(['/ipo/dashboardmain'], { relativeTo: this.route });
        break;
      case 3:
        this.router.navigate(['/ipo'], { relativeTo: this.route });
        break;
      default:
        this.router.navigate(['/'], { relativeTo: this.route });
        break;
    }
  }
  Logout() {
    debugger
    
    let LoginToken = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    this.LoginService.Logout(LoginToken).subscribe(
      (res: any) => {
      });
    sessionStorage.clear();
    localStorage.clear();
    //this.router.navigate(['/employee-login'], { relativeTo: this.route });
    window.location.href = '/preipo/employee-login';
  }
  openModal() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalRef = this.modalService.show(ApplyNowComponent, ngbModalOptions); //Object.assign("", { class: "filter-popup-wrapper" })
  }
}
