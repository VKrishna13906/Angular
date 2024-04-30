import { IsValidPassword } from './../validation';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLoaderService } from '../services/custom-loader.service';
import { EncrdecrService } from './../Auth/encrdecr.service';
import { LoginService } from '../services/login.service';
import { ClientDataService } from '../services/client-data.service';
import { formatDate } from '@angular/common';
import { JksdgfuehdnoService } from '../jksdgfuehdno.service';
declare var $: any;

@Component({
  selector: 'app-login-nse',
  templateUrl: './login-nse.component.html',
  styleUrls: ['./login-nse.component.scss']
})
export class LoginNseComponent implements OnInit {

  InvalidCaptcha: boolean = false;
  InValidAttemptCount: number = 0;
  IsInValidAttempt: boolean = false;
  CaptchaText: string = "";
  UserPassword: string = "";
  txtLength = 0;
  IsInvestor: boolean = false;
  LoginForm: FormGroup;
  LoginSubmitted: boolean = false;
  UserType: number = 3;
  IsShowLoginOption: boolean = true;
  WelcomeText: any = '';
  CompanyName: string = '';
  logo: string;
  NavHeight: string;
  IsMobile: boolean = false;
  logoWidth: string;
  logoHeight: string;
  IsAllowLogin: boolean = true;
  constructor(private LoginService: LoginService,
    private EncrdecrService: EncrdecrService,
    private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private Loader: CustomLoaderService,
    private ClientDataService: ClientDataService,
    private hireasdkask : JksdgfuehdnoService) {
    this.LoginForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password1: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.pattern(IsValidPassword)]],
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.SetViewPort(event.target.innerWidth)
  }
  ngOnInit() {
    this.SetViewPort(window.innerWidth);
    sessionStorage.setItem('nvjsd212djskd$#21ksdj', 'C')
    this.WelcomeText = this.ClientDataService.GetWelcomeText();
    this.logo = sessionStorage.getItem('logo');
    this.CompanyName = this.ClientDataService.GetCompanyName();
    if (this.CompanyName == 'Mahindra') {
      this.logoWidth = '330px';
      this.logoHeight = '120px';
      this.NavHeight = '40px';
      $('.MainOuter').css('min-height', window.innerHeight - 72);
    }
    else if (this.CompanyName == 'AU') {
      this.logoWidth = '130px';
      this.logoHeight = '60px';
      this.NavHeight = '62px';
      $('.MainOuter').css('min-height', window.innerHeight - 0);
      $('.LoginOuter').css('min-height', '100vh');
    }
    else if (this.CompanyName == 'YesSecurities') {
      this.logoWidth = '150px';
      this.logoHeight = '60px';
      this.NavHeight = '62px';
      $('.MainOuter').css('min-height', window.innerHeight - 75);
    }
    let brow = this.myBrowser();

    let version = this.getBrowserVersion();
    // ////
    // let tempPath = (location.pathname).split('/');
    // if (tempPath[2] == 'investor') {
    //   this.UserType = 3;
    //   this.IsInvestor = true;
    //   this.IsShowLoginOption = false;
    // }
    // else {
    //   this.UserType = 2;
    //   this.IsInvestor = false;
    //   this.IsShowLoginOption = true;
    // }
    //this.getCompanyDetails();
    this.generateCaptcha();
    const CorporateFag = sessionStorage.getItem('Vbhs@#%LMKIo=');
    ////
    if (CorporateFag == 'C') {
      //$('.MainOuter').css('min-height', window.innerHeight - 75);

      sessionStorage.removeItem('F44sGAGh2xwkpUL'); // Session_SubBrokerId
      sessionStorage.removeItem('Hldq31TLYwRbLJ8'); // Session_SubBrokerCode
      sessionStorage.removeItem('UZT6qHaDZSz66kx'); // Session_ClientBasicInfoId
      sessionStorage.removeItem('N1QJHdOkO7Hz8QC'); // Session_ClientBasicInfoId
      sessionStorage.removeItem('L2D3506kIHSk3E0'); // Session_UserType
      sessionStorage.removeItem('pOWgAF62qFXnZMn'); // Session_Razor
      sessionStorage.removeItem('W113TKilrF1u1gL'); // ucc code - client
      sessionStorage.removeItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
      sessionStorage.removeItem('nbj%98LS74nkjsn~@&4njrkd`!kd*294');
      sessionStorage.removeItem('hn0bHyGhfpGtrPe'); // family id
      sessionStorage.removeItem('E#$%#XCha7%*=');
      // sessionStorage.removeItem('Vbhs@#%LMKIo=');

      if (sessionStorage.getItem('Mnuoisns6wqgswj2$#') != null &&
    sessionStorage.getItem('Mnuoisns6wqgswj2$#')!= "")
    {
      if(sessionStorage.getItem('Mnuoisns6wqgswj2$#').toString() == "1")
      {
          this.IsAllowLogin = false;
        }
        else {
          this.IsAllowLogin = true;
        }

      }

    } else {
      return this.router.parseUrl("**");
    }
  }
  SetViewPort(w) {
    if (w <= 767) {
      this.IsMobile = true;
    }
    else {
      this.IsMobile = false;
    }
  }
  ngAfterViewInit() {

    $('.passwordtxt').on('input', (e: any) => this.ontypePassword(e));

  };
  ontypePassword(e) {
    //console.log(e.target.value);

    var getPassVal = e.target.value;


    if (this.txtLength > getPassVal.length) {
      if (getPassVal.length == 0) {
        this.UserPassword = "";
        this.txtLength = 0;
        this.LoginForm.controls['Password'].setValue(this.UserPassword);
      }
      else {
        this.txtLength = getPassVal.length;
        this.UserPassword = this.UserPassword.slice(0, -1);
        this.LoginForm.controls['Password'].setValue(this.UserPassword);
      }
    }
    else {
      this.txtLength = getPassVal.length;
      var OneWord = getPassVal[getPassVal.length - 1]
      this.UserPassword = this.UserPassword + OneWord;
      this.LoginForm.controls['Password'].setValue(this.UserPassword);
      if (this.LoginForm.controls.Password1.value != '$') {
        var strReplaceString = this.LoginForm.controls.Password1.value;
        strReplaceString = strReplaceString.replace(/[^$]/g, "");
        // $('#<%=txtPassword.ClientID%>').val(strReplaceString + '$');
        this.LoginForm.controls['Password1'].setValue(strReplaceString + '$');
      }
      else {
        //$('#<%=txtPassword.ClientID%>').val($('#<%=txtPassword.ClientID%>').val() + '$');
        this.LoginForm.controls['Password1'].setValue(this.LoginForm.controls.Password1.value + '$')
      }
    }
  }
  get r() {
    return this.LoginForm.controls;
  }
  onSubmit() {
    this.LoginSubmitted = true;
    if (this.LoginForm.invalid) {
      return;
    } else {
      if (this.IsInValidAttempt) {
        if (this.CaptchaText != this.LoginForm.controls.Captcha.value) {
          this.InvalidCaptcha = true;
          // alert(this.InvalidCaptcha);
          return;
        }
      }

      // alert("Login Successfully");
      this.Loader.show();
      const DataBody = JSON.stringify(this.LoginForm.value);
      // let req = {
      //   "Username":this.LoginForm.controls.Username,
      //   "Password":this.UserPassword
      // }
      //const DataBody = JSON.stringify(req);
      sessionStorage.setItem('Tgsh@#3734fjfskshh==', '173.212.234.56');
      let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
      
      this.LoginService.PostLogin_NSE_Info(DataBody, this.UserType, IpAddress).subscribe(

        (res: any) => {
          
          if (res != "Invalid Username and Password" && res.TOKEN_ID != null) {
            sessionStorage.setItem('5V5uSYBoBVqAvBIBqUEBhv6ELFF', ("1"));
            sessionStorage.setItem('YKHkxDnoSoOe6PdTjKrqfm4z6', ("19"));
            sessionStorage.setItem('`huR,8@RK9^??b4 -.hfs!!uR,XX', res.TOKEN_ID);
            sessionStorage.setItem('F44sGAGh2xwkpUL', (res.LOGIN_ID)); // Session_SubBrokerId
            sessionStorage.setItem('V4WGROuLLBE6t98', (res.USER_NAME)); // Session_UserName
            sessionStorage.setItem('V8hpPfITcxhEI9x', (res.EMAIL_ID)); // Session_UserEmail

            sessionStorage.setItem('Xe003SRRyYEoOC2', res.MOBILE); // Session_UserMobile
            //(res.MOBILE )
            //(res.MOBILE)
            //(
            if (res.RazorCustId !== null && res.RazorCustId !== undefined && res.RazorCustId !== 'null') {
              sessionStorage.setItem('pOWgAF62qFXnZMn', (res.RazorCustId)); // RazorCustId
            } else {
              sessionStorage.setItem('pOWgAF62qFXnZMn', ''); // RazorCustId
            }
            sessionStorage.setItem('Hldq31TLYwRbLJ8', (res.SubBrokerCode)); // Session_SubBrokerCode
            sessionStorage.setItem('L2D3506kIHSk3E0', (res.USER_TYPE)); // Session_UserType
            sessionStorage.setItem('qAkZrQYLWNBSlki', (res.LOGIN_ID)); // Session_CBId
            //sessionStorage.setItem('pi4ZU2P3M8JE4q7', ''); // Session_B64CompanyLogo

            // sessionStorage.setItem('Session_B64CompanyLogo_EtE',res.Companylogobase64);

            if (res.Family_ID !== null && res.Family_ID !== undefined && res.Family_ID !== 'null') {
              sessionStorage.setItem('hn0bHyGhfpGtrPe', (res.Family_ID));  // Session_Family_ID
            }
            switch (res.USER_TYPE) {
              case '2':
                sessionStorage.setItem('m5JkoXISmYRAIuY', (res.SubBrokerCode)); // Session_UserId
                if (res.RazorePaymentStatus) {
                  this.router.navigate(['/dashboard'], { relativeTo: this.route });
                } else {
                  this.Loader.hide();
                  sessionStorage.setItem('nbj%98LS74nkjsn~@&4njrkd`!kd*294', res.RazorePaymentStatus);
                  this.router.navigate(['/payment'], { relativeTo: this.route });
                }
                break;
              case '3':
                sessionStorage.setItem('m5JkoXISmYRAIuY', res.USER_ID); // Session_UserId(
                //(res.USER_ID)
                //(res.USER_ID)
                sessionStorage.setItem('UZT6qHaDZSz66kx', (res.LOGIN_ID)); // Session_ClientBasicInfoId
                sessionStorage.setItem('N1QJHdOkO7Hz8QC', (res.LOGIN_ID));
                sessionStorage.setItem('ySxterqMDG7RY2qTpuzrfA', ("1"));
                // Session_ClientBasicInfoId
                // if(sessionStorage.getItem('YKHkxDnoSoOe6PdTjKrqfm4z6') !=null && sessionStorage.getItem('YKHkxDnoSoOe6PdTjKrqfm4z6')!=undefined && sessionStorage.getItem('YKHkxDnoSoOe6PdTjKrqfm4z6')!=''){
                //   this.router.navigate(['/ipo/dashboard'], { relativeTo: this.route });
                //   break;
                // }else{
                // this.router.navigate(['/client-dashboard'], { relativeTo: this.route });
                // break;
                // }
                if(this.CompanyName == "SPA"){
                  this.router.navigate(['/dashboard-spa'], { relativeTo: this.route });
                }
                else{
                  this.router.navigate(['/client-dashboard'], { relativeTo: this.route });
                }
            }
          }
          else {
            this.InValidAttemptCount += 1;
            if (this.InValidAttemptCount == 3) {
              this.IsInValidAttempt = true;
              this.LoginForm.controls['Captcha'].setValidators([Validators.required]);
              this.LoginForm.controls['Captcha'].updateValueAndValidity();
            }
            this.Loader.hide();
            this.CallAlertModal('Please enter valid username and password');
          }
        },
        (err: any) => {

          // console.log(err)
          const rr = err.error;
          const er = rr.substring(1, rr.length - 1);
          const rk = er.split(', ');
          this.Loader.hide();
          if (rk[1].includes('Number of invalid login attempts')) {
            this.IsInValidAttempt = true;
            this.LoginForm.controls['Captcha'].setValidators([Validators.required]);
            this.LoginForm.controls['Captcha'].updateValueAndValidity();
            this.CallAlertModal('Number of invalid login attempts. Your account is locked for 15 minutes');
          } else {
            this.CallAlertModal('Please enter valid username and password');
          }
          //// console.log('err =>' + er);
        }
      );
    }
  }
  ChangeType() {
    // ////
    this.IsInvestor = !this.IsInvestor;
    if (this.IsInvestor) {
      this.UserType = 3;
    } else {
      this.UserType = 2;
    }
  }
  SendUserType() {
    // ////
    sessionStorage.setItem('L2D3506kIHSk3E0', (this.UserType.toString()));
  }
  CallAlertModal(msg: any) {
    $('#AlertModal').modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#AlertModalContent').text(msg);
  }
  // getCompanyDetails() {
  //   this.Loader.show();
  //   this.ClientDataService.getCompanyDetails(1).subscribe((data: any) => {
  //     this.Loader.hide();
  //     if (data != null && data.ArrayOfResponse.length != 0) {
  //       let rk = data.ArrayOfResponse[0];
  //       console.log('Corp_IFA = ' + (rk.Dummy1));
  //       //this.Companyname = rk.CompanyName;
  //       if(this.ClientDataService.GetCompanyName() == 'AU')
  //       {
  //         sessionStorage.setItem('Abodhj#@jdkd/%^82ncdbcnggshd!@#$', ("4"));
  //         sessionStorage.setItem('Mnuoisns6wqgswj2$#', "1");
  //       }
  //       else  if(this.ClientDataService.GetCompanyName() == 'Mahindra')
  //       {
  //         sessionStorage.setItem('Abodhj#@jdkd/%^82ncdbcnggshd!@#$', ("2"));
  //         sessionStorage.setItem('Mnuoisns6wqgswj2$#', "0");
  //       }
  //       else  if(this.ClientDataService.GetCompanyName() == 'YesSecurities')
  //       {
  //         sessionStorage.setItem('Abodhj#@jdkd/%^82ncdbcnggshd!@#$', ("11"));
  //         sessionStorage.setItem('Mnuoisns6wqgswj2$#', "0");
  //       }
  //       else {
  //         sessionStorage.setItem('Abodhj#@jdkd/%^82ncdbcnggshd!@#$', ("0"));
  //         sessionStorage.setItem('Mnuoisns6wqgswj2$#', "0");
  //       }

  //       sessionStorage.setItem('E#$%#XCha7%*=', (rk.Dummy2));
  //       sessionStorage.setItem('Vbhs@#%LMKIo=', (rk.Dummy1));
  //       sessionStorage.setItem('DufjGDH3843JE', (rk.Dummy4));
  //       sessionStorage.setItem('PfdkSJDNWks2323Ms', (rk.Dummy3));
  //       sessionStorage.setItem('Arh34SDBJSSiF', (rk.Dummy5));
  //       sessionStorage.setItem('Fhd63asja$%Wsdjs9304#@dfvdjfjd', (rk.Dummy6));
  //     }
  //   });
  // }
  myBrowser() {
    //const browsername = navigator.userAgent;
    //alert(browsername);
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
      return 'Opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      return 'Chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      return 'Safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      return 'Firefox';
    } else if (navigator.userAgent.indexOf("MSIE") != -1) {
      return 'IE';
    } else {
      return 'unknown';
    }
  }

  getBrowserVersion() {
    var userAgent = navigator.userAgent, tem,
      matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(matchTest[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (matchTest[1] === 'Chrome') {
      tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    matchTest = matchTest[2] ? [matchTest[1], matchTest[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = userAgent.match(/version\/(\d+)/i)) != null) matchTest.splice(1, 1, tem[1]);
    return matchTest.join(' ');
  }
  generateCaptcha() {
    this.CaptchaText = Math.floor(1000 + Math.random() * 9000).toString();

  }
}
