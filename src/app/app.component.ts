import { environment } from 'src/environments/environment';
// import { NavigationEnd, Router } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BnNgIdleService } from 'bn-ng-idle';
import { ClientDataService } from './services/client-data.service';
import { EncrdecrService } from './Auth/encrdecr.service';
import { LoginService } from './services/login.service';
import { CustomLoaderService } from './services/custom-loader.service';
import { TokenExpireService } from './services/token-expire.service';
import { JksdgfuehdnoService } from '../app/jksdgfuehdno.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  Companyname: string = environment.CompayName;
  CommonBaseHref: string = environment.CommonBaseHref;
  PrimaryColor: string = '';
  SecondaryColor: string = '';
  ThirdColor: string = '';
  BodyColor: string = '';
  BodyBgColor: string = '';
  BodyFooterBgColor: string = '';
  Table_Header_Bg = '';
  Table_Head_Text = '';
  fontFamily = '';
  favIcon: HTMLLinkElement = document.querySelector('#Fevicon');
  //MainLogo: HTMLImageElement = document.querySelector('#MainLogo');
  logo: string;
  loader: string;
  loaderWidth: string;
  loaderHeight: string;
  SessionTime: number = 300;
  IsMobile: boolean = false;
  ssoLogin : string;
  IsLoggedIn: boolean = false;
  constructor(private Idle: BnNgIdleService,
    private titleService: Title,
    private ClientDataService: ClientDataService,
    private EncrdecrService: EncrdecrService,
    private LoginService: LoginService,
    private router: Router,
    public Loader: CustomLoaderService,
    private Logout: TokenExpireService,
    private hireasdkask : JksdgfuehdnoService,
    private activatedRoutes: ActivatedRoute
  ) {

    this.Idle.startWatching(this.SessionTime).subscribe((res) => {
      if (res) {
        debugger
        const isLoggtedIn = this.ssoLogin = sessionStorage.getItem('5V5uSYBoBVqAvBIBqUEBhv6ELFF');
        if(this.ssoLogin != "00")
        {
          return;
        }
        if (sessionStorage.getItem('5V5uSYBoBVqAvBIBqUEBhv6ELFF') != null && sessionStorage.getItem('5V5uSYBoBVqAvBIBqUEBhv6ELFF') != undefined && sessionStorage.getItem('5V5uSYBoBVqAvBIBqUEBhv6ELFF') != "") {
          if (isLoggtedIn == "00") {
            this.IsLoggedIn = true;           
          }
          else {
            this.IsLoggedIn = false;
          }
        } else {
          this.IsLoggedIn = false;
        }
        sessionStorage.clear();
        localStorage.clear();
        switch (this.Companyname) {
          case 'Kotak':
            this.ClientDataService.SetWelcomeText('Kotak Securities');
            this.titleService.setTitle('Kotak Securities');
            sessionStorage.setItem('logo', `../../${this.CommonBaseHref}assets/images/Logo_Kotak.svg`);
            sessionStorage.setItem('Abodhj#@jdkd/%^82ncdbcnggshd!@#$', "12");
            sessionStorage.setItem('Abodhj#@jdkd/%^ysudsh&#&shdj@#$', "12");
            sessionStorage.setItem('Mnuoisns6wqgswj2$#', "0");
            break;
        }
        debugger
        let path = window.location.pathname.toLowerCase();
        $('.modal').modal('hide');
        if (this.IsLoggedIn) {
          $('#SessionModal').modal({
            backdrop: 'static',
            keyboard: false
          });

          
          
          setTimeout(() => {
            $('#SessionModal').modal('hide');
            $('#sessionbuttonid').triggerHandler('click');
            //this.router.navigateByUrl('/preipo/employee-login');
            window.location.href = '/preipo/employee-login';
            //window.location.href = '/preipo/ipo';
          }, 1000);

          let User_Type = sessionStorage.getItem("L2D3506kIHSk3E0");
          if(User_Type != '')
          {
            //this.router.navigateByUrl('/employee-login');
            window.location.href = '/preipo/employee-login';
            //window.location.href = '/preipo/ipo';
          }
          
        }       
        // else {
        //   if (path != '/index' && path != '/ipo' && path != '/ipo/' && path != '/ipo/index' && path != '/' && path != '/preipo/employee-login' && this.ssoLogin != "10") {
        //     $('#SessionModal').modal({
        //       backdrop: 'static',
        //       keyboard: false
        //     });

        //     setTimeout(() => {
        //       $('#SessionModal').modal('hide');
        //       $('#sessionbuttonid').triggerHandler('click');
        //       //this.router.navigateByUrl('/employee-login');
        //       window.location.href = '/preipo/ipo';
        //     }, 1000);

        //     let User_Type = sessionStorage.getItem("L2D3506kIHSk3E0");
        //     if (User_Type != '') {
        //       //this.router.navigateByUrl('/employee-login');
        //       window.location.href = '/preipo/ipo';
        //     }
              
        //   }
        // }
        history.pushState(null, null, window.location.href);
        history.back();
        window.onpopstate = () => history.forward();
        $('select').select2('close');
      }
    })
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.SetViewPort(event.target.innerWidth)
  }
  ngOnInit() {
    $('.modal').modal('hide');
    // $('#AlertModal').modal();
    // $('#AlertModalContent').text('test content')
    //this.getCompanyDetails();
    switch (this.Companyname) {
      case 'Kotak':
        this.PrimaryColor = '#0B4D88'; //0B4D88 //487CB6
        this.SecondaryColor = '#EF4123';
        this.ThirdColor = '#EF4123';
        this.BodyColor = '#1a1a1a';
        this.BodyBgColor = '#F6F6F6';
        this.BodyFooterBgColor = '#EF4123';
        this.Table_Header_Bg = '#fbfbfb';
        this.Table_Head_Text = '#0B4D88';
        this.fontFamily = 'Roboto';
        this.ClientDataService.SetWelcomeText('Kotak Securities');
        this.titleService.setTitle('Kotak Securities');
        this.favIcon.href = './assets/images/favicon_kotak.png';
        this.loader = `../../../${this.CommonBaseHref}assets/images/Loader_kotak.gif`;
        this.loaderWidth = '50px';
        this.loaderHeight = '50px';
        sessionStorage.setItem('logo', `../../${this.CommonBaseHref}assets/images/Logo_Kotak.svg`);
        sessionStorage.setItem('Abodhj#@jdkd/%^82ncdbcnggshd!@#$',"12");
        sessionStorage.setItem('Mnuoisns6wqgswj2$#', "0");
        break;
    }
    this.ClientDataService.SetCompanyName(this.Companyname);
    document.documentElement.style.setProperty('--primary-color', this.PrimaryColor);
    document.documentElement.style.setProperty('--secondary-color', this.SecondaryColor);
    document.documentElement.style.setProperty('--third-color', this.ThirdColor);
    document.documentElement.style.setProperty('--body-color', this.BodyColor);
    document.documentElement.style.setProperty('--body-bg-color', this.BodyBgColor);
    document.documentElement.style.setProperty('--body-footer-bg-color', this.BodyFooterBgColor);
    document.documentElement.style.setProperty('--table-header-bg-color', this.Table_Header_Bg);
    document.documentElement.style.setProperty('--table-header-text-color', this.Table_Head_Text);
    document.documentElement.style.setProperty('--font-family-regular', `${this.fontFamily}Regular`);
    document.documentElement.style.setProperty('--font-family-medium', `${this.fontFamily}Medium`);
    document.documentElement.style.setProperty('--font-family-bold', `${this.fontFamily}Bold`);
  }
  SetViewPort(w) {
    if (w <= 767) {
      this.IsMobile = true;
    }
    else {
      this.IsMobile = false;
    }
  }
  SessionExpired() {
    let LoginToken = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    this.LoginService.Logout(LoginToken).subscribe(
      (res: any) => {
        const sessionvalue = sessionStorage.getItem('nvjsd212djskd$#21ksdj');
        if (sessionvalue != undefined && sessionvalue != null && sessionvalue != '') {
          if (sessionvalue == 'C') {
            this.Logout.LogoutUser();
          }
          else if (sessionvalue == 'E') {
            //this.router.navigateByUrl('/employee-login');
            window.location.href = '/preipo/ipo';
          }
        }
        sessionStorage.clear();
        localStorage.clear();
        switch (this.Companyname) {
          case 'Kotak':

            sessionStorage.setItem('logo', `../../${this.CommonBaseHref}assets/images/Logo_Kotak.svg`);
            sessionStorage.setItem('Abodhj#@jdkd/%^82ncdbcnggshd!@#$', "12");
            sessionStorage.setItem('Abodhj#@jdkd/%^ysudsh&#&shdj@#$', "12");
            sessionStorage.setItem('Mnuoisns6wqgswj2$#', "0");
            break;
          }
      }
    );
  }
  KotakTimeOut() {
    sessionStorage.clear();
    localStorage.clear();
    if (this.IsLoggedIn) {
      
      //window.location.href = "https://preferred.kotaksecurities.com"; // UAT
      //window.location.href="http://iponewuat.kotakseconline.com/employee-login"; // UAT Server
      //window.location.href="https://ipocugwrap.kotaksecurities.online/employee-login"; // CUG Server
      //this.router.navigate(['/employee-login'], { relativeTo: this.activatedRoutes });
      //this.router.navigateByUrl('/employee-login');
      window.location.href = '/preipo/employee-login';
      // this.router.navigateByUrl('/employee-login');
      
    }
    else {
      //this.router.navigateByUrl('/'); // Local
      //this.router.navigate(['/employee-login'], { relativeTo: this.activatedRoutes });
      //this.router.navigateByUrl('/employee-login');
      window.location.href = '/preipo/ipo';
      
      //this.router.navigateByUrl('/ipo/'); // Server
    }
  }
}
// ===== Scroll to Top ====
$(window).scroll(function () {
  if ($(this).scrollTop() >= 200) {        // If page is scrolled more than 50px
    $('#return-to-top').fadeIn(200);    // Fade in the arrow
  } else {
    $('#return-to-top').fadeOut(200);   // Else fade out the arrow
  }
});
$(document).ready(function () {
  $('#return-to-top').click(function () {      // When arrow is clicked
    $('body,html').animate({
      scrollTop: 0                       // Scroll to top of body
    }, 500);
  });
});


