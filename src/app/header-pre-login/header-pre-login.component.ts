import { Component, HostListener, OnInit } from '@angular/core';
import { ClientDataService } from './../services/client-data.service';
@Component({
  selector: 'app-header-pre-login',
  templateUrl: './header-pre-login.component.html',
  styleUrls: ['./header-pre-login.component.scss']
})
export class HeaderPreLoginComponent implements OnInit {
  logo : string;
  IsMobile:boolean = false;
  logoWidth:string;
  logoHeight:string;
  CompanyName: string ;
  NavHeight:string;
  constructor(private ClientDataService : ClientDataService) { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.SetViewPort(event.target.innerWidth)
  }
  ngOnInit() {
    this.SetViewPort(window.innerWidth);
    this.logo = sessionStorage.getItem('logo');
    this.CompanyName= this.ClientDataService.GetCompanyName();
    if(this.CompanyName == 'Mahindra'){
      if(this.IsMobile){
        this.logo = '../../assets/images/MahindraLogoSquareWhite.webp';
        this.logoWidth = '125px';
        this.logoHeight= '25px';
      }
      else{
        this.logoWidth = '330px';
        this.logoHeight= '120px';
      }
      this.NavHeight = '40px';
    }
    else if(this.CompanyName == 'YesSecurities'){
      this.logoWidth = '150px';
      this.logoHeight= '60px';
      this.NavHeight = '62px';
    }
    else if(this.CompanyName == 'SPA'){
      this.logoWidth = '150px';
      this.logoHeight= '60px';
      this.NavHeight = '62px';
    }
    else if(this.CompanyName == 'investedu'){
      this.logoWidth = '190px';
      this.logoHeight= '55px';
      this.NavHeight = '62px';
    }
  }
  SetViewPort(w){
    if(w <= 767){
      this.IsMobile = true;
      if(this.CompanyName == 'Mahindra'){
        this.logo = '../../assets/images/MahindraLogoSquareWhite.webp';
        this.logoWidth = '125px';
        this.logoHeight= '25px';
      }
    }
    else{
      this.IsMobile = false;
      if(this.CompanyName == 'Mahindra'){
        this.logo = sessionStorage.getItem('logo');
        this.logoWidth = '330px';
        this.logoHeight= '120px';
      }
    }
  }
}
