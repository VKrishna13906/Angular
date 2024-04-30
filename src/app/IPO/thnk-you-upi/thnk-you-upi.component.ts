import { Component, OnInit } from '@angular/core';
import { EncrdecrService } from 'src/app/Auth/encrdecr.service';
import { environment } from 'src/environments/environment';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-thnk-you-upi',
  templateUrl: './thnk-you-upi.component.html',
  styleUrls: ['./thnk-you-upi.component.scss']
})
export class ThnkYouUpiComponent implements OnInit {
  CommonBaseHref: string = environment.CommonBaseHref;
  logo: string;
  logoWidth: string;
  logoHeight: string;
  NavHeight: string;
  CompanyName: string = "";
  ClientName: string = "";
  UPIId: string = "";
  ApplicationNo: string = "";
  BidQuantity: string = "";
  BidAmount: string = "";
  public encryptedvalues: string = '';
  showCompanyImg: boolean = false;
  name: string = "";
  IPOEndate: string="";
  constructor(private EncrdecrService : EncrdecrService,private router: Router,private hireasdkask :  JksdgfuehdnoService) { }

  ngOnInit() {
    debugger
    this.logo = sessionStorage.getItem('logo');
    this.logoWidth = '150px';
    this.logoHeight = '54px';
    this.NavHeight = '62px';
    let obj = sessionStorage.getItem('jkhg$8fsdnL9Hg');
    let enddate = sessionStorage.getItem('jsdhkfjhkueudbk');
    let obj1 = (sessionStorage.getItem('jkhg$8fsdnL9Hgfsdhjfh'));
    sessionStorage.removeItem('jkhg$8fsdnL9Hg');
    sessionStorage.removeItem('jkhg$8fsdnL9Hgfsdhjfh');
    if (enddate != undefined && enddate != null && enddate != '') {
      this.IPOEndate = formatDate(enddate, 'dd-MM-yyyy', 'en')
    }
    if (obj != null && obj != undefined) {
      let data = JSON.parse(obj);
      // this.CompanyName = data.CompanyName;
      this.ClientName = data.APPLICANTNAME;
      this.UPIId = data.UPIID;
      this.ApplicationNo = data.APPLICATIONNO;
      this.BidQuantity = data.QUANTITY;
      this.BidAmount = data.CHEQUEAMOUNT;
    }
    if(obj1 !=null && obj1 != undefined){
      let data1 = JSON.parse(obj1);
      this.CompanyName = data1[0].COMPANY_NAME;
    }
    // $(document).ready(function () {
    //   $('.navbar').addClass('hwrp');
    //   bannChange();
    //   function bannChange() {
    //     $(window).scroll(function () {
    //       var sticky = $('.hwrp'),
    //         scroll = $(window).scrollTop();
    //       if (scroll >= `1`) sticky.addClass('fixed');
    //       else sticky.removeClass('fixed');
    //     });
    //   }
    // });
//
    // let logo = sessionStorage.getItem('Adjfsjhgfjhse3@@34737');
    // if(logo != undefined && logo != null && logo != ''){
    //   this.encryptedvalues = (logo);
    //   this.showCompanyImg = true;
    //   this.name = ".";
    // }
    // else{
    //   sessionStorage.removeItem('Adjfsjhgfjhse3@@34737');
    //   this.name = " with Kotak Securities.";
    // }
  }
  backToHome() {
    let u = sessionStorage.getItem('L2D3506kIHSk3E0');
    if (u != undefined && u != null && u != '') {
      let ut = parseInt((u));
      if(ut == 1){
        this.router.navigateByUrl("/ipo/dashboardmain");
      }
      else{
        this.router.navigateByUrl("/ipo");
      }
    }
    else{
      this.router.navigateByUrl("/ipo");
    }
  }
}
