import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLoaderService } from '../../services/custom-loader.service';
import { EncrdecrService } from '../../Auth/encrdecr.service';
import { LoginService } from '../../services/login.service';
import { IPOServiceService } from '../../services/iposervice.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
declare var $: any;
@Component({
  selector: 'app-sso',
  templateUrl: './sso.component.html',
  styleUrls: ['./sso.component.scss']
})
export class SsoComponent implements OnInit {
  IsShowErrorMessage: boolean = false;
  SrNo: any = 0;
  constructor(private Loader: CustomLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private EncrdecrService: EncrdecrService,
    private LoginService: LoginService,
    private IPOService: IPOServiceService,
    private hireasdkask :  JksdgfuehdnoService) { }

  ngOnInit() {
    debugger
    sessionStorage.removeItem('gjhfHunj#n&fdghcod');
    sessionStorage.removeItem('ujpfIutj#o&kegn');
    sessionStorage.removeItem('njefOutj#o&kegn');
    this.Loader.show();
    this.route.queryParams.subscribe(params => {
      debugger
      let d = params.data;
      let p = params.platform;
      let s = params.sid;
      let j = params.jwt;
      if (d != undefined && d != null) {
        let data = d.toString().replace(/\s/g, '+');
        let request = {
          "encryptedKey": data
        }
        let databody = JSON.stringify(request);
        this.IPOService.GetSSOClient(databody).subscribe(data => {
          debugger
          let res = JSON.parse((data))
          sessionStorage.setItem('gjhfHunj#n&fdghcod', (res.ArrayOfResponse[0].clientcode));
          this.SetSSOLogin(res, 'sso');
        },
          err => {
            this.Loader.hide();
            this.IsShowErrorMessage = true;
            console.log(err);
          });
      }
      else if (p != undefined && p != null && s != undefined && s != null && j != undefined && j != null) {
        let request = {
          "clientcode": s,
          "encryptedKey": j,
          "PlatformType": p
        }
        let databody = JSON.stringify(request);
        this.IPOService.GetSSOClientNEO(databody).subscribe(res => {
          this.SetSSOLogin(res, 'neo');
        },
          err => {
            this.Loader.hide();
            this.IsShowErrorMessage = true;
            console.log(err);
          });
      }
      else {
        this.Loader.hide();
        this.IsShowErrorMessage = true;
      }
    });
  }
  SetSSOLogin(res, platform) {
    debugger
    if (res.ID == 1) {
      if (res.ArrayOfResponse != null && res.ArrayOfResponse.length > 0) {
        let pan = res.ArrayOfResponse[0].FirstApplicantPAN;
        // let regex = /^[A-Z]{3}[P]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$/;
        // if (regex.test(pan.toUpperCase())) {
          sessionStorage.setItem('gjhfHunj#n&fdgh', pan);
          this.SrNo = res.ArrayOfResponse[0].SrNo;
          if (platform == 'sso') {
            let t = res.SessionToken;
            sessionStorage.setItem('ujpfIutj#o&kegn', t);
          }
          else if (platform == 'neo') {
            sessionStorage.setItem('njefOutj#o&kegn', ('tHIsiSneOTokEn'));
          }
          this.CallClientLogin(pan);
        // }
        // else {
        //   this.Loader.hide();
        //   this.IsShowErrorMessage = true;
        // }
      }
      else {
        this.Loader.hide();
        this.IsShowErrorMessage = true;
      }
    }
    else {
      this.Loader.hide();
      this.IsShowErrorMessage = true;
    }
  }
  CallClientLogin(pan) {
    let request2 = {
      "Username": pan,
      "Password1": "$$$$$$$$$",
      "Password": "Abc@12345"
    }
    let databody2 = JSON.stringify(request2);
    sessionStorage.setItem('Tgsh@#3734fjfskshh==', '173.212.234.56');
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    this.LoginService.PostLogin_NSE_Info(databody2, 3, IpAddress).subscribe(
      (res: any) => {

        if (res != "Invalid Username and Password" && res.TOKEN_ID != null) {
          sessionStorage.setItem('5V5uSYBoBVqAvBIBqUEBhv6ELFF', ("10"));
          sessionStorage.setItem('YKHkxDnoSoOe6PdTjKrqfm4z6', this.SrNo);
          sessionStorage.setItem('`huR,8@RK9^??b4 -.hfs!!uR,XX', res.TOKEN_ID);
          sessionStorage.setItem('F44sGAGh2xwkpUL', res.LOGIN_ID); // Session_SubBrokerId
          sessionStorage.setItem('V4WGROuLLBE6t98', res.USER_NAME); // Session_UserName
          sessionStorage.setItem('V8hpPfITcxhEI9x', res.EMAIL_ID); // Session_UserEmail

          sessionStorage.setItem('Xe003SRRyYEoOC2', res.MOBILE); // 
          if (res.RazorCustId !== null && res.RazorCustId !== undefined && res.RazorCustId !== 'null') {
            sessionStorage.setItem('pOWgAF62qFXnZMn', res.RazorCustId); // RazorCustId
          } else {
            sessionStorage.setItem('pOWgAF62qFXnZMn', ''); // RazorCustId
          }
          sessionStorage.setItem('Hldq31TLYwRbLJ8', res.SubBrokerCode); // Session_SubBrokerCode
          sessionStorage.setItem('L2D3506kIHSk3E0', res.USER_TYPE); // Session_UserType
          sessionStorage.setItem('qAkZrQYLWNBSlki', res.LOGIN_ID); // Session_CBId
          //sessionStorage.setItem('pi4ZU2P3M8JE4q7', ''); // Session_B64CompanyLogo


          if (res.Family_ID !== null && res.Family_ID !== undefined && res.Family_ID !== 'null') {
            sessionStorage.setItem('hn0bHyGhfpGtrPe', res.Family_ID);  // Session_Family_ID
          }

          sessionStorage.setItem('m5JkoXISmYRAIuY', res.USER_ID); // 
          sessionStorage.setItem('UZT6qHaDZSz66kx', res.LOGIN_ID); // Session_ClientBasicInfoId
          sessionStorage.setItem('N1QJHdOkO7Hz8QC', res.LOGIN_ID);
          sessionStorage.setItem('ySxterqMDG7RY2qTpuzrfA', ("1"));
          this.Loader.hide();
          this.IsShowErrorMessage = false;
          this.router.navigate(['/ipo'], { relativeTo: this.route });
          ////window.locatiosern.href="https://preferred.kotaksecurities.com/trade/login"; // SSO Server

        }
        else {
          this.Loader.hide();
          this.IsShowErrorMessage = true;
        }
      },
      (err: any) => {
        this.Loader.hide();
        this.IsShowErrorMessage = true;
      }
    );
  }
}
