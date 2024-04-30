import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLoaderService } from '../services/custom-loader.service';
import { LoginService } from '../services/login.service';
import { EncrdecrService } from './../Auth/encrdecr.service';
import { ClientDataService } from '../services/client-data.service';
import { IsValidPassword } from '../validation';
import { JksdgfuehdnoService } from '../jksdgfuehdno.service';
declare var $: any;
@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss']
})
export class EmployeeLoginComponent implements OnInit {

  LoginForm: FormGroup;
  LoginSubmitted = false;
  UserType = 1;
  IsShowLoginOption = true;
  WelcomeText: any = '';
  CompanyName: string = '';
  logo: string;
  NavHeight: string;
  IsMobile: boolean = false;
  logoWidth: string;
  logoHeight: string;
  txtLength = 0;
  UserPassword: string = "";
  constructor(private LoginService: LoginService,
    private EncrdecrService: EncrdecrService,
    private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, private Loader: CustomLoaderService,
    private ClientDataService: ClientDataService,
    private hireasdkask :  JksdgfuehdnoService
    ) {
    this.LoginForm = this.formBuilder.group({
      Username: ['', Validators.required],
      // Password: ['', [Validators.required]],
      Password1: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.pattern(IsValidPassword)]],
    });
  }

  ngOnInit() {
    // //////
    this.UserType = 1;
    sessionStorage.setItem('nvjsd212djskd$#21ksdj', 'E')
    this.WelcomeText = this.ClientDataService.GetWelcomeText();
    this.logo = sessionStorage.getItem('logo');
    this.CompanyName = this.ClientDataService.GetCompanyName();

    this.logoWidth = '130px';
    this.logoHeight = '60px';
    this.NavHeight = '62px';
    $('.MainOuter').css('min-height', window.innerHeight - 0);
    $('.LoginOuter').css('min-height', '100vh');
    sessionStorage.removeItem('gjhfHunj#n&fdghcod');
    //this.getCompanyDetails();
    const CorporateFag = sessionStorage.getItem('Vbhs@#%LMKIo=');
    if (CorporateFag == 'C') {
      sessionStorage.removeItem('F44sGAGh2xwkpUL'); // Session_SubBrokerId
      sessionStorage.removeItem('Hldq31TLYwRbLJ8'); // Session_SubBrokerCode
      sessionStorage.removeItem('UZT6qHaDZSz66kx'); // Session_ClientBasicInfoId
      sessionStorage.removeItem('N1QJHdOkO7Hz8QC'); // Session_ClientBasicInfoId
      sessionStorage.removeItem('L2D3506kIHSk3E0'); // Session_UserType
      sessionStorage.removeItem('pOWgAF62qFXnZMn'); // Session_Razor
      sessionStorage.removeItem('W113TKilrF1u1gL'); // ucc code - client
      sessionStorage.removeItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
      sessionStorage.removeItem('nbj%98LS74nkjsn~@&4njrkd`!kd*294');
      sessionStorage.removeItem('E#$%#XCha7%*=');
      sessionStorage.removeItem('Vbhs@#%LMKIo=');

    }
    else {
      return this.router.parseUrl("**");
    }
  }
  get r() {
    return this.LoginForm.controls;
  }
  onSubmit() {
    debugger
    this.LoginSubmitted = true;
    if (this.LoginForm.controls['Password'].invalid && this.LoginForm.controls['Username'].value) {
      return;
    } else {
      // //////
      // alert("Login Successfully");
      this.Loader.show();
      sessionStorage.setItem('Tgsh@#3734fjfskshh==', '173.212.234.56');
      let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
      let json ={
        Password : this.LoginForm.controls['Password'].value,
        Username : this.LoginForm.controls['Username'].value
      }
      const DataBody = JSON.stringify(json);
      this.LoginService.Post_EmployeeLogin(DataBody, this.UserType, IpAddress).subscribe(
        (res: any) => {
          //
          // debugger
          // let res = JSON.parse(this.hireasdkask.getPageNotFound(response))
          console.log(res);

          // console.log(res);
          debugger
          if (res != "Invalid Username and Password") {
            sessionStorage.setItem('5V5uSYBoBVqAvBIBqUEBhv6ELFF', "00");
            sessionStorage.setItem('`huR,8@RK9^??b4 -.hfs!!uR,XX', res.TOKEN_ID);
            sessionStorage.setItem('F44sGAGh2xwkpUL',res.LOGIN_ID); // Session_SubBrokerId
            sessionStorage.setItem('V4WGROuLLBE6t98',res.USER_NAME); // Session_UserName
            sessionStorage.setItem('V8hpPfITcxhEI9x',res.EMAIL_ID); // Session_UserEmail
            sessionStorage.setItem('Xe003SRRyYEoOC2',res.MOBILE); // Session_UserMobile
            if (res.RazorCustId !== null && res.RazorCustId !== undefined && res.RazorCustId !== 'null') {
              sessionStorage.setItem('pOWgAF62qFXnZMn',res.RazorCustId); // RazorCustId
            } else {
              sessionStorage.setItem('pOWgAF62qFXnZMn', ''); // RazorCustId
            }
            if (res.SubBrokerCode != null && res.SubBrokerCode != undefined) {
              sessionStorage.setItem('Hldq31TLYwRbLJ8',res.SubBrokerCode); /// Session_SubBrokerCode
            }
            sessionStorage.setItem('L2D3506kIHSk3E0',res.USER_TYPE); // Session_UserType
            sessionStorage.setItem('qAkZrQYLWNBSlki', res.LOGIN_ID); // Session_CBId
            //sessionStorage.setItem('pi4ZU2P3M8JE4q7', ''); // Session_B64CompanyLogo

            // sessionStorage.setItem('Session_B64CompanyLogo_EtE',res.Companylogobase64);
            if (res.Family_ID !== null && res.Family_ID !== undefined && res.Family_ID !== 'null') {
              sessionStorage.setItem('hn0bHyGhfpGtrPe', res.Family_ID);  // Session_Family_ID
            }
            //switch (res.USER_TYPE) {
            //case '1':
            this.Loader.hide();
            sessionStorage.setItem('m5JkoXISmYRAIuY', res.USER_ID); // Session_UserId
            sessionStorage.setItem('5gE4QWzFXWKewRC', res.ROLEID); // Role_ID

            // sessionStorage.setItem('nbj%98LS74nkjsn~@&4njrkd`!kd*294', res.RazorePaymentStatus)
            // this.router.navigate(['/payment'], { relativeTo: this.route });
            sessionStorage.setItem('nbj%98LS74nkjsn~@&4njrkd`!kd*294', 'res.RazorePaymentStatus');
            if (this.CompanyName == "Kotak") {
              this.router.navigate(['/ipo/dashboardmain'], { relativeTo: this.route });
            }
            else {
              this.router.navigate(['/employee-dashboard'], { relativeTo: this.route });
            }

            //break;
            //}
          }
          else {
            this.Loader.hide();
            this.CallAlertModal('Please enter valid username and password');
          }
        },
        (err: any) => {
          // //////
          // console.log(err)
          const rr = err.error;
          const er = rr.substring(1, rr.length - 1);
          const rk = er.split(', ');
          this.Loader.hide();
          if (rk[1].includes('Number of invalid login attempts')) {
            this.CallAlertModal('Number of invalid login attempts. Your account is locked for 15 minutes');
          } else {
            this.CallAlertModal('Please enter valid username and password');
          }
          //// console.log('err =>' + er);
        }
      );
    }
  }
  CallAlertModal(msg: any) {
    $('#AlertModal').modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#AlertModalContent').text(msg);
  }

  ngAfterViewInit() {

    $('.passwordtxt').on('input', (e: any) => this.ontypePassword(e));

  };
  ontypePassword(e) {
    //console.log(e.target.value);
debugger
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

}
