import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncrdecrService } from '../../Auth/encrdecr.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
declare var $: any;
@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
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
  constructor(private EncrdecrService : EncrdecrService,private hireasdkask :  JksdgfuehdnoService) { }

  ngOnInit() {
    this.logo = sessionStorage.getItem('logo');
    this.logoWidth = '150px';
    this.logoHeight = '54px';
    this.NavHeight = '62px';
    let obj = sessionStorage.getItem('jkhg$8fsdnL9Hg');
    sessionStorage.removeItem('jkhg$8fsdnL9Hg');
    if (obj != null && obj != undefined) {
      let data = JSON.parse(obj);
      this.CompanyName = data.CompanyName;
      this.ClientName = data.APPLICANTNAME;
      this.UPIId = data.UPIID;
      this.ApplicationNo = data.ApplicationNo;
      this.BidQuantity = data.QUANTITY;
      this.BidAmount = data.CHEQUEAMOUNT;
    }
    $(document).ready(function () {
      $('.navbar').addClass('hwrp');
      bannChange();
      function bannChange() {
        $(window).scroll(function () {
          var sticky = $('.hwrp'),
            scroll = $(window).scrollTop();
          if (scroll >= `1`) sticky.addClass('fixed');
          else sticky.removeClass('fixed');
        });
      }
    });
//
    let logo = sessionStorage.getItem('Adjfsjhgfjhse3@@34737');
    if(logo != undefined && logo != null && logo != ''){
      this.encryptedvalues = (logo);
      this.showCompanyImg = true;
      this.name = ".";
    }
    else{
      sessionStorage.removeItem('Adjfsjhgfjhse3@@34737');
      this.name = " with Kotak Securities.";
    }
  }
}
