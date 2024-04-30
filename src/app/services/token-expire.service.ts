import { isNullOrUndefined } from '../validation';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EncrdecrService } from './../Auth/encrdecr.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
@Injectable({
  providedIn: 'root'
})
export class TokenExpireService {
  constructor(private EncrdecrService: EncrdecrService,private hireasdkask :  JksdgfuehdnoService,
    private router: Router,) { }

  LogoutUser() {
    const CompanyName: string = environment.CompayName;
    var G_UserType = parseInt((sessionStorage.getItem('L2D3506kIHSk3E0'))); //Session_UserType
    const LoginSource = sessionStorage.getItem('6+J3RebINEPBJVbAJw');
    sessionStorage.clear();
    localStorage.clear();
    this.SetCompanyLogo();
    if (CompanyName == "IFA") {
      this.router.navigateByUrl("/login");
    }
    else if (CompanyName == "AU") {
      //#region AU Login Start
      this.SetCompanyLogo();
      if (isNullOrUndefined(LoginSource)) {
        this.router.navigateByUrl('/mb-logout');
      }
      else if (LoginSource.toString().toLocaleLowerCase() == "mb") {
        this.router.navigateByUrl('/mb-logout');
      }
      else {
        window.location.href = 'https://www.aubank.in/netbanking/logout';
      }
      //#endregion AU Logic End
    }
    else if (CompanyName == "YesSecurities") {
      this.router.navigateByUrl('/yes-logout');
    }
    else {
      this.SetCompanyLogo();
      if (G_UserType == 1) {
        this.router.navigateByUrl("/preipo/employee-login")
      } else {
        this.router.navigateByUrl("/login-corp")
      }
    }
  }

  SetCompanyLogo(){
    const CompanyName: string = environment.CompayName;
    switch (CompanyName) {
      case 'AU':
        sessionStorage.setItem('logo', '../../assets/images/Logo_AUBank.png');
        sessionStorage.setItem('Abodhj#@jdkd/%^82ncdbcnggshd!@#$', ("4"));
        sessionStorage.setItem('Mnuoisns6wqgswj2$#', "1");
        break;
      case 'Mahindra':
        //../../assets/images/MahindraLogoTriangle.png
        sessionStorage.setItem('logo', '../../assets/images/MahindraLogoTriangle.png');
        sessionStorage.setItem('Abodhj#@jdkd/%^82ncdbcnggshd!@#$', ("2"));
        sessionStorage.setItem('Mnuoisns6wqgswj2$#', "0");
        break;
      case 'YesSecurities':
        sessionStorage.setItem('logo', '../../assets/images/YesSecuritiesLogo.png');
        sessionStorage.setItem('Abodhj#@jdkd/%^82ncdbcnggshd!@#$', ("11"));
        sessionStorage.setItem('Mnuoisns6wqgswj2$#', "0");
        break;

        case 'SPA':

          sessionStorage.setItem('logo', '../../assets/images/SPA_Logo.png');
          sessionStorage.setItem('Abodhj#@jdkd/%^82ncdbcnggshd!@#$', ("13"));
          sessionStorage.setItem('Abodhj#@jdkd/%^ysudsh&#&shdj@#$', "13");
          sessionStorage.setItem('Mnuoisns6wqgswj2$#', "0");
          break;
          case 'investedu':

            sessionStorage.setItem('logo', '../../assets/images/investedu_Logo.png');
            sessionStorage.setItem('Abodhj#@jdkd/%^82ncdbcnggshd!@#$', ("14"));
            sessionStorage.setItem('Abodhj#@jdkd/%^ysudsh&#&shdj@#$', "14");
            sessionStorage.setItem('Mnuoisns6wqgswj2$#', "0");
            break;
    }
  }
}
