import { isNullOrUndefined } from '../../validation';
import { ActivatedRoute, Router } from '@angular/router';
import { EncrdecrService } from './../../Auth/encrdecr.service';
import { Component, OnInit } from '@angular/core';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { LoginService } from '../../services/login.service';
declare var $: any;
import * as fs from 'file-saver';
import { environment } from 'src/environments/environment';
import { IsValidMobile } from 'src/app/validation';
import { NotAuthorizedAlertComponent } from '../not-authorized-alert/not-authorized-alert.component';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { JksdgfuehdnoService } from '../../jksdgfuehdno.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  CommonBaseHref: string = environment.CommonBaseHref;
  logo: string;
  logoWidth: string;
  logoHeight: string;
  CompanyName: string;
  NavHeight: string;
  IPO_CurrentListData: any = [];
  IPO_ForthcomingListData: any = [];
  IPO_ClosedListData: any = [];
  AboutTo_ClosedListData: any = [];
  Recentaly_ClosedListData: any = [];
  Recentaly_ClosedListDataSearch: any = [];
  ClosedIPOForm: FormGroup;
  ClosedIPOFormSubmitted: boolean = false;
  ACOForm: FormGroup;
  ACOFormsubmitted: boolean = false;
  public encryptedvalues: string = '';
  decryptedValues: string;
  hideFooter: boolean = true;
  hideHeader: boolean = true;
  showCompanyImg: boolean = false;
  modalRef?: BsModalRef;
  // G_UserType: any='';
  //IsLoggedIn: boolean = false;
  OnInitStart:number = 0;
  ServerCallStart:number = 0;
  ServerCallEnd:number = 0;
  constructor(private iposervice: IPOServiceService,
    private EncrdecrService: EncrdecrService, private formBuilder: FormBuilder,
    private router: Router, private Loader: CustomLoaderService, private location: Location,
    private activatedRoutes: ActivatedRoute,private LoginService: LoginService,private modalService: BsModalService,
    private hireasdkask : JksdgfuehdnoService
  ) {
    this.ClosedIPOForm = this.formBuilder.group({
      FromDate: ['', Validators.required],
      ToDate: ['', [Validators.required]],
    });
    this.ACOForm = this.formBuilder.group({
      ACMobileNo: ['', [Validators.required, Validators.pattern(IsValidMobile)]],
    });
  }

  ngOnInit() {
    this.OnInitStart = new Date().getTime();
    this.Loader.show();
    sessionStorage.removeItem('gjhfHunj#n&fdghcod');
    sessionStorage.removeItem('gjhfHunj#n&fdgh');
    this.CallGuestLogin()
    //sessionStorage.removeItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    this.logo = sessionStorage.getItem('logo');
    this.logoWidth = '160px';
    this.logoHeight = '59px';
    this.NavHeight = '62px';

    $(document).ready(function () {
      // $(".customerSlider").slick({
      //   draggable: true, slide: '.itemCont', dots: true, arrows: false, infinite: false, pauseOnHover: false, autoplay: false, autoplaySpeed: 1000,
      //   speed: 1000, slidesToShow: 1, slidesToScroll: 1, centerMode: false, adaptiveHeight: false,
      //   responsive: [{ breakpoint: 1280, settings: { slidesToShow: 1, slidesToScroll: 1 } }, {
      //     breakpoint: 860, settings: { slidesToShow: 1, slidesToScroll: 1 }
      //   }, {
      //     breakpoint: 680, settings: { slidesToShow: 1, slidesToScroll: 1 }
      //   }]
      // });
      $('.videoIcon a').click(function (e) { $('#videoModal').fadeIn(); $('#emVideo').attr('src', $(this).data('media')); });
      $('#videoModal').click(function (e) { $(this).fadeOut(); $('#emVideo').attr('src', ''); });
      $('.scrollTop').click(function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: $("#OpenDematAccount").offset().top });
      });
      $('#txtMobile').keyup(function (e) { onlyNumbers($(this).val()); });
      $('.formFildsList li input').on('keydown paste drop',function (e) {
        $(this).removeClass('error');
        $(this).parents().find('.errorMsg').empty();
      });
      $('#authorise').change(function (e) {
        if (this.checked) {
          $(this).parents('li').find('.errorMsg').empty();
        }
      });
      //$('.ffl-wrapper').floatingFormLabels();
      Accordion();
      equalHeight('.sBoxWrp .odaBox');
      equalHeight('.eaList .eaListBox');
      bannChange();
      $('script').each(function () {
        if (this.id === 'MegaMenu') {
          this.parentNode.removeChild(this);
        }
        if (this.id === 'h1tag') {
          this.parentNode.removeChild(this);
        }
        //if (this.id === 'MetaTitle') {
        //  this.parentNode.removeChild( this );
        //}
        //if (this.id === 'MetaDesc') {
        //  this.parentNode.removeChild( this );
        //}
        //if (this.id === 'MetaImage') {
        //  this.parentNode.removeChild( this );
        //}
        //if (this.id === 'MetaUrl') {
        //  this.parentNode.removeChild( this );
        //}
        //if (this.id === 'MetaTwrCard') {
        //  this.parentNode.removeChild( this );
        //}
      });
      setTimeout(() => {
        var script = document.createElement('script');
        script.id = "MegaMenu";
        script.src = "assets/js/mega-menu.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);

        var h1 = document.createElement('h1');
        h1.id = "h1tag";
        document.getElementsByTagName('head')[0].appendChild(h1);

        // var MetaTitle = document.createElement('meta');
        // MetaTitle.id = "MetaTitle";
        // MetaTitle.content = "European Travel Destinations";
        // document.getElementsByTagName('head')[0].appendChild(MetaTitle);
        // document.getElementById('MetaTitle').setAttribute('property', "og:title");

        // var MetaDesc = document.createElement('meta');
        // MetaDesc.id = "MetaDesc";
        // MetaDesc.content = "Offering tour packages for individuals or groups.";
        // document.getElementsByTagName('head')[0].appendChild(MetaDesc);
        // document.getElementById('MetaDesc').setAttribute('property', "og:description");

        // var MetaImage = document.createElement('meta');
        // MetaImage.id = "MetaImage";
        // MetaImage.content = "http://euro-travel-example.com/thumbnail.jpg";
        // document.getElementsByTagName('head')[0].appendChild(MetaImage);
        // document.getElementById('MetaImage').setAttribute('property', "og:image");

        // var MetaUrl = document.createElement('meta');
        // MetaUrl.id = "MetaUrl";
        // MetaUrl.content = "https://ipo.kotaksecurities.com/ipo/index";
        // document.getElementsByTagName('head')[0].appendChild(MetaUrl);
        // document.getElementById('MetaUrl').setAttribute('property', "og:url");

        // var MetaTwrCard = document.createElement('meta');
        // MetaTwrCard.id = "MetaTwrCard";
        // MetaTwrCard.name = "twitter:card";
        // MetaTwrCard.content = "summary_large_image";
        // document.getElementsByTagName('head')[0].appendChild(MetaTwrCard);

      }, 1500);
    });

    $(window).resize(bannChange);
    function bannChange() {
      var wh = $(window).width();
      if (wh < 680) {
        $('.bannWrp img').attr('src', $('.bannWrp img').data('src'));
        $('.mioImg img').attr('src', $('.mioImg img').data('icon'));
        $('.videoIcon img').attr('src', $('.videoIcon img').data('icon'));
      } else {
        $('.bannWrp img').attr('src', $('.bannWrp img').data('rel'));
        $('.mioImg img').attr('src', $('.mioImg img').data('src'));
        $('.videoIcon img').attr('src', $('.videoIcon img').data('src'));
      }

      /*	if(wh > 1200){
          $(window).scroll(function(){
              var sticky = $('.hwrp'), scroll = $(window).scrollTop();
              if (scroll >= 70) sticky.addClass('fixed');
              else sticky.removeClass('fixed');
          });
        }*/
      $(window).scroll(function () {
        var sticky = $('.hwrp'), scroll = $(window).scrollTop();
        if (scroll >= 70) sticky.addClass('fixed');
        else sticky.removeClass('fixed');
      });
    }

    function onlyNumbers(text) {
      text = text.replace(/[^0-9]/g, '');
      var inputResult = document.getElementById('txtMobile');
      //inputResult.value = text;
    }

    function Accordion() {
      $('.accordion_head').first().children(".plusminus").text('-');
      $('.accordion_body').first().css('display', 'block');
      $(".accordion_head").click(function () {
        if ($('.accordion_body').is(':visible')) {
          $(".accordion_body").slideUp(300);
          $(".plusminus").text('+');
        }
        if ($(this).next(".accordion_body").is(':visible')) {
          $(this).next(".accordion_body").slideUp(300);
          $(this).children(".plusminus").text('+');
        } else {
          $(this).next(".accordion_body").slideDown(300);
          $(this).children(".plusminus").text('-');
        }
      });
    }

    //equalHeight('.prodInfo h3');
    function equalHeight(group) {
      $.fn.samesizr = function (o) {
        var s = $.extend({ mobile: 767 }, o), w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        this.css('height', 'auto');
        if (w > s.mobile) {
          var h = 0;
          this.each(function () { h = Math.max(h, $(this).outerHeight()); }).css('height', h);
        }
        return this;
      }
      $(group).samesizr({ mobile: 0 });
      $(window).on("resize", function () {
        $(group).samesizr({ mobile: 0 });
      });
    }

    //textLimit('.blogTxtLimit', 120);
    function textLimit(thiss, limit) {
      var maxLimit = limit + 5;
      $(thiss).each(function () {
        var txt = $(this).text();
        if (txt.length > maxLimit) {
          $(this).text(txt.substring(0, limit) + '...');
        }
      });
    }
    function validateForm() {
      var n = document.forms["form1"]["txtName"]; var m = document.forms["form1"]["txtMobile"]; var e = document.forms["form1"]["txtEmail"]; var c = document.forms["form1"]["txtCity"];
      var a = document.forms["form1"]["authorise"]; var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (n.value == "") {
        n.className = 'error';
        $('.tName').append("Please Enter Name"); n.focus(); return false;
      }
      if (m.value == "") {
        m.className = 'error';
        $('.tMobile').append("Please Enter Mobile Numar"); m.focus(); return false;
      }
      if (e.value == "") {
        e.className = 'error';
        $('.tEmail').append("Please Enter Email-Id"); e.focus(); return false;
      }
      if (!e.value.match(validRegex)) {
        e.className = 'error';
        $('.tEmail').empty().append("Please Enter Valid Email-Id"); e.focus(); return false;
      }
      if (c.value == "") {
        c.className = 'error';
        $('.tCity').append("City must be filled out"); c.focus(); return false;
      }
      if (a.checked == false) {
        $('.tAuthorise').append("Please select agree to all terms and conditions"); a.focus(); return false;
      }
    }


    $(document).ready(function () {

      var scrollTop = $(".scrollTopform");

      $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 400) {
          $(scrollTop).css("opacity", "1");

        } else {
          $(scrollTop).css("opacity", "0");
        }

      });

      $(scrollTop).click(function () {
        $('html, body').animate({
          scrollTop: 0
        }, 100);
        return false;

      });
    });
    $(document).ready(function () {
      $('.navbar').addClass('hwrp');

      $(window).resize(bannChange);
      var menuSection = $('.section'),
        navLists = $('.menu ul li'),
        navLists_height = navLists.outerHeight(),
        headerOffset = $('.top_layer').offset().top;
      /////////////////////
      $(window).on('scroll', function () {
        var window_top = $(window).scrollTop() + 12;
        if (window_top > headerOffset) {
          //$('.menu').addClass('fixedmenu');
          $('.bodytab').addClass('bodymargin');
        } else {
          //$('.menu').removeClass('fixedmenu');
          $('.menu a').removeClass('active');
          $('.bodytab').removeClass('bodymargin');
        }

        var cur_position = $(this).scrollTop() + 70;
        menuSection.each(function () {
          var top = $(this).offset().top - navLists_height,
            bottom = top + $(this).outerHeight();

          if (cur_position >= top && cur_position <= bottom) {
            navLists.find('a').removeClass('active');
            menuSection.removeClass('active');

            $(this).addClass('active');
            navLists.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
          }

        });
      });
      /////////////////////
      navLists.find('a').on('click', function () {
        var $el = $(this),
          id = $el.attr('href');
        $('html, body').animate({
          scrollTop: $(id).offset().top - navLists_height
        }, 500);
        return false;
      });
      $(".filtericonmobile").click(function () {
        $(".mobileBox").slideToggle()
      });
    });
    /////by bhavin
    //alert(('fundexpert'))
    
    this.encryptedvalues = sessionStorage.getItem('Adjfsjhgfjhse3@@34737');
    
    if (this.encryptedvalues != null && this.encryptedvalues != undefined && this.encryptedvalues != '') {
      this.decryptedValues = this.hireasdkask.uniquegetPageNotFound(this.encryptedvalues);
      this.hideFooter = false;
      this.hideHeader = false;
      this.showCompanyImg = true;
    } 
    else {
      this.activatedRoutes.queryParams.subscribe(queryParam => {
        let val = queryParam.iRaYw28pg2aVi22prA;
        debugger
        if (val != '' && val != undefined && val != null) {
          this.hideFooter = false;
          this.hideHeader = false;
          this.encryptedvalues = val;
          this.decryptedValues = this.hireasdkask.uniquegetPageNotFound(this.encryptedvalues);
          if (this.decryptedValues != '' && this.decryptedValues != undefined && this.decryptedValues != null) {
            this.showCompanyImg = true;
          }
        } else {
          this.decryptedValues = ''
          this.hideFooter = true;
          this.hideHeader = true;
          this.showCompanyImg = false;
          sessionStorage.removeItem('Adjfsjhgfjhse3@@34737');
        }
      });
    }
    
  }
  CallGuestLogin(){
    this.ServerCallStart = new Date().getTime();
    let request2 = {
      "Username": 'KOTAK8110S',
      //"Username": 'S0014',
      "Password1": "$$$$$$$$$",
      "Password": "Abc@12345"
    }
    let databody2 = JSON.stringify(request2);
    sessionStorage.setItem('Tgsh@#3734fjfskshh==', '173.212.234.56');
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    this.LoginService.PostLogin_NSE_Info(databody2, 3, IpAddress).subscribe(
      (res: any) => {
        //
        // let res = JSON.parse(this.hireasdkask.getPageNotFound(response))
        if (res != "Invalid Username and Password" && res.TOKEN_ID != null) {
          sessionStorage.setItem('5V5uSYBoBVqAvBIBqUEBhv6ELFF', ("1"));
          sessionStorage.setItem('`huR,8@RK9^??b4 -.hfs!!uR,XX', res.TOKEN_ID);
          sessionStorage.setItem('F44sGAGh2xwkpUL', res.LOGIN_ID); // Session_SubBrokerId
          sessionStorage.setItem('V4WGROuLLBE6t98', res.USER_NAME); // Session_UserName
          sessionStorage.setItem('Hldq31TLYwRbLJ8', res.SubBrokerCode); // Session_SubBrokerCode
          sessionStorage.setItem('L2D3506kIHSk3E0', res.USER_TYPE); // Session_UserType
          sessionStorage.setItem('qAkZrQYLWNBSlki', res.LOGIN_ID); // Session_CBId
          sessionStorage.setItem('m5JkoXISmYRAIuY', res.USER_ID); // 
          sessionStorage.setItem('UZT6qHaDZSz66kx', res.LOGIN_ID); // Session_ClientBasicInfoId
          sessionStorage.setItem('N1QJHdOkO7Hz8QC', res.LOGIN_ID);
          sessionStorage.setItem('ySxterqMDG7RY2qTpuzrfA', ("1"));
          this.CallData();
        }
        else {
          this.Loader.hide();
        }
      },
      (err: any) => {
        this.Loader.hide();
      }
    );
  }
  CallData(){
    let ToDate = new Date();
    let td = new Date();
    let fd = new Date(td.setMonth(td.getMonth() - 6));
    let obj = {
      "FromDate": this.ConvertToShortDate(fd),
      "ToDate": this.ConvertToShortDate(ToDate)
    }
    let JSONobj = JSON.stringify(obj);
    this.iposervice.GetIPOCompanyDetails(JSONobj).subscribe(resData => {
      let res = JSON.parse((resData));
      this.ServerCallEnd = new Date().getTime();
      if (res.Message.toLowerCase().includes('not authorized')) {
        let ngbModalOptions: NgbModalOptions = {
          backdrop: 'static',
          keyboard: false
        };
        this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
      }
      else{
        if (res.ArrayOfResponse.length > 0) {
          let ArrayOfResponseData = res.ArrayOfResponse;
          let CurrentDate = new Date();
          // Ongoing IPO

          this.IPO_CurrentListData = [];
          ArrayOfResponseData[0].objIPONdNCD.map(arr => {
            let s = arr.IssueStartDate.toString().substring(0, 10);
            // let ss = s.split('-');
            // let st = +new Date(parseInt(ss[0]), parseInt(ss[1]), parseInt(ss[2]));
            // let rr = new Date();
            // let r1 = rr.getDate().toString();
            // if (r1.toString().length == 1) {
            //   r1 = "0" + r1;
            // }
            // let r2 = rr.getMonth() + 1;
            // let r3 = rr.getFullYear();
            // let cd = +new Date(r3, r2, parseInt(r1));
            // let e = arr.IssueEndDate.toString().substring(0, 10);
            // let ee = e.split('-');
            // let ed = +new Date(parseInt(ee[0]), parseInt(ee[1]), parseInt(ee[2]));
            ////let ed = +new Date(arr.IssueEndDate.toString().substring(0,10));
            // let st = new Date(s);
            // let rr = new Date();
            // let r1 = rr.getDate().toString();
            // if (r1.toString().length == 1) {
            //   r1 = "0" + r1;
            // }
            // let r2 = rr.getMonth() + 1;
            // let r3 = rr.getFullYear();
            // let cd = new Date(`${r3}-${r2}-${r1}`);
            // let e = arr.IssueEndDate.toString().substring(0, 10);
            // let ed = new Date(e);
            // if (arr.IssueType == 'I' && st <= cd && ed >= cd) {
            //   this.IPO_CurrentListData.push(arr)
            // }

            if (arr.ShowFlag == "Y") {
              this.IPO_CurrentListData.push(arr)
            }
          });

          // Upcoming IPO
          debugger
          //this.IPO_ForthcomingListData = ArrayOfResponseData[0].objIPONdNCD.filter(atr => (atr.IssueType == 'I' && new Date(atr.IssueStartDate) >= CurrentDate || atr.IssueStartDate == '0001-01-01'))        
          this.IPO_ForthcomingListData = ArrayOfResponseData[0].objIPONdNCD.filter(atr => ((atr.ShowFlag == 'U') || atr.IssueStartDate == '0001-01-01'))

          // About to close IPO
          this.AboutTo_ClosedListData = ArrayOfResponseData[0].objAboutListeddetails;

          let IPOClosedData = ArrayOfResponseData[0].objIPOdetails;
          var CDate = new Date();
          CDate.setMonth(CDate.getMonth() - 6);
          let k1 = CDate.getDate().toString();
          if (k1.toString().length == 1) {
            k1 = "0" + k1;
          }
          let k2 = CDate.getMonth() + 1;
          let k3 = CDate.getFullYear();
          let b = +new Date(k3, k2, parseInt(k1));

          let rr = new Date();
          let r1 = rr.getDate().toString();
          if (r1.toString().length == 1) {
            r1 = "0" + r1;
          }
          let r2 = rr.getMonth() + 1;
          let r3 = rr.getFullYear();
          let c = +new Date(r3, r2, parseInt(r1));
          IPOClosedData.map(arr => {
            let l = arr.LISTDATE.toString().substring(0, 10);
            let ll = l.split('-');
            let a = +new Date(parseInt(ll[0]), parseInt(ll[1]), parseInt(ll[2]));
            if (a >= b && a <= c) {
              this.Recentaly_ClosedListData.push(arr);
            }
          });

          this.IPO_CurrentListData.map(arr => {
            arr.IssueStartDateDisplay = this.ChangeDateFormat(arr.IssueStartDate);
            arr.IssueEndDateDisplay = this.ChangeDateFormat(arr.IssueEndDate);
          });

          this.IPO_ForthcomingListData.map(arr => {
            if (arr.IssueStartDate == "2099-01-01T00:00:00" && arr.IssueEndDate == "2099-01-01T00:00:00") {
              arr.IssueStartDate = this.ChangeDateFormat3DigitYear(arr.IssueStartDate);
            }
            else if (arr.IssueStartDate == "2199-01-01T00:00:00" && arr.IssueEndDate == "2199-01-01T00:00:00") {
              arr.IssueStartDate = this.ChangeDateFormat3DigitYear(arr.IssueStartDate);
            }
            else {
              arr.IssueStartDate = this.ChangeDateFormat(arr.IssueStartDate);
              arr.IssueEndDate = this.ChangeDateFormat(arr.IssueEndDate);
            }
          });
          this.AboutTo_ClosedListData.map(arr => {
            arr.LISTDATE = this.ChangeDateFormat(arr.LISTDATE);
          });
          this.Recentaly_ClosedListData.map(arr => {
            arr.LISTDATE = this.ChangeDateFormat(arr.LISTDATE);
          });
          this.Recentaly_ClosedListDataSearch = this.Recentaly_ClosedListData;
          let DataRenderEnd = new Date().getTime();
// let ServerTime = (this.ServerCallEnd - this.ServerCallStart)/1000;
// let DataRenderTime = (DataRenderEnd - this.ServerCallEnd)/1000;
// localStorage.setItem('OnInitStart', `${JSON.stringify(this.OnInitStart)}`);
// localStorage.setItem('ServerCallStart', `${JSON.stringify(this.ServerCallStart)}`);
// localStorage.setItem('ServerCallEnd', `${JSON.stringify(this.ServerCallEnd)}`);
// localStorage.setItem('DataRenderEnd', `${JSON.stringify(DataRenderEnd)}`);
// localStorage.setItem('ServerTime', `${JSON.stringify(ServerTime)}`);
// localStorage.setItem('DataRenderTime', `${JSON.stringify(DataRenderTime)}`);
          var loaderInterval = setInterval(() => {
            let str = document.readyState;
            if (str == 'complete') {
              this.Loader.hide();
              clearInterval(loaderInterval)
            }
          }, 1000);
        }
        else {
          this.Loader.hide();
        }
      }
        
    });
  }
  ConvertToShortDate(ipd) {
    let r1 = ipd.getDate();
    let r2 = ipd.getMonth() + 1;
    let r3 = ipd.getFullYear();
    return `${r1}/${r2}/${r3}`;
  }
  ngAfterViewInit() {
    $(".DpFromDate").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      orientation: "auto bottom",
    }).on('change', (e: any) => this.SetDpFromDate(e));
    $(".DpToDate").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      orientation: "auto bottom",
    }).on('change', (e: any) => this.SetDpToDate(e));
    let d = new Date();
    let fd = new Date(d.setMonth(d.getMonth() - 6));
    $(".DpFromDate").datepicker("setDate", fd);
    $(".DpToDate").datepicker("setDate", new Date());
  }
  SetDpFromDate(e) {
    let fd = e.target.value;
    this.ClosedIPOForm.controls['FromDate'].setValue(fd);
    $(".DpToDate").datepicker("setStartDate", fd);
    let td = this.ClosedIPOForm.controls['ToDate'].value;
    if (td != '') {
      let f = this.MakeFdTd(fd);
      let t = this.MakeFdTd(td);
      if (t < f) {
        this.CallAlertModal('To date must be greater than from date.')
        this.ClosedIPOForm.controls['ToDate'].setValue('');
        $(".DpToDate").datepicker("setDate", '');
      }
    }
  }
  MakeFdTd(ipd) {
    let a = ipd.split('/');
    return +(new Date(a[2], a[1], a[0]));
  }
  ValidatePattern(flag, e) {
    if (flag == "Number") {
      const charCode = (e.which) ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }
    else if (flag == "Date") {
      const charCode = (e.which) ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 47 || charCode > 57)) {
        return false;
      }
      return true;
    }
  }
  OnPaste(e) {
    e.preventDefault();
  }
  OnDrop(e) {
    e.preventDefault();
  }
  SetDpToDate(e) {
    this.ClosedIPOForm.controls['ToDate'].setValue(e.target.value);
    //$(".DpFromDate").datepicker("setEndDate", e.target.value);
  }
  get r() {
    return this.ClosedIPOForm.controls;
  }
  get k() {
    return this.ACOForm.controls;
  }
  SearchRecentlyListedIPO(val: string) {
    this.Recentaly_ClosedListDataSearch = this.Recentaly_ClosedListData.filter(arr => arr.COMPANY_NAME.toLowerCase().includes(val.toLowerCase()))
  }
  OnSubmitIPOFilter() {
    this.Loader.show();
    this.ClosedIPOFormSubmitted = true;
    if (this.ClosedIPOForm.invalid) {
      this.Loader.hide();
      return;
    }
    else {
      this.Recentaly_ClosedListDataSearch = [];
      let obj = {
        "FromDate": this.ClosedIPOForm.controls['FromDate'].value,
        "ToDate": this.ClosedIPOForm.controls['ToDate'].value
      }
      let JSONobj = JSON.stringify(obj);
      this.iposervice.GetIPOCompanyDetails(JSONobj).subscribe(resData => {
        this.Loader.hide();
        let res = JSON.parse((resData));
        if (res.Message.toLowerCase().includes('not authorized')) {
          let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
        }
        else{
          this.Recentaly_ClosedListDataSearch = res.ArrayOfResponse[0].objIPOdetails;
          this.Recentaly_ClosedListDataSearch.map(arr => {
            arr.LISTDATE = this.ChangeDateFormat(arr.LISTDATE);
          });
        }
      },
        err => {
          console.log(err)
          this.Loader.hide();
        })
    }
  }
  ChangeDateFormat(inputDate) {
    let d = inputDate.substring(0, 10);
    let r = d.split('-');
    return `${r[2]}-${r[1]}-${r[0].substring(2, 4)}`;
  }
  ChangeDateFormat3DigitYear(inputDate) {
    let d = inputDate.substring(0, 10);
    let r = d.split('-');
    return `${r[2]}-${r[1]}-${r[0].substring(1, 4)}`;
  }
  CheckTime(IssueCloseTime, AcceptanceTime): boolean {
    let CurrentDate = new Date();
    //let time = CurrentDate.getHours()+':'+CurrentDate.getMinutes(); //CurrentDate.getHours();
    var systemtime = CurrentDate.getHours() + ':' + CurrentDate.getMinutes();
    var SystemDate = new Date('01 Jan 1970 ' + systemtime); // 01 Jan 1970 this date hardecode because we only check time but date is require so we pass tis dummy date

    var IssueCloseDate = new Date('01 Jan 1970 ' + IssueCloseTime);

    var AcceptanceDate = new Date('01 Jan 1970 ' + AcceptanceTime);
    var CloseDate;
    if (AcceptanceDate < IssueCloseDate) {
      CloseDate = AcceptanceDate;
    }
    else {
      CloseDate = IssueCloseDate;
    }
    if (CurrentDate.getHours() > 12) {
      return SystemDate < CloseDate;
    } else {
      return true;
    }

  }
  OpenCompanyURL(data) {
    if (!isNullOrUndefined(data.CompanyURL) && data.CompanyURL != '') {
      window.open(`${data.CompanyURL}`, '_blank');
    } else {
      this.CallAlertModal('Company details not found.');
    }
  }
  OnSubmitOpenFreeAccount() {
    this.ACOFormsubmitted = true;
    if (this.ACOForm.invalid) {
      return;
    }
    else {
      //  this.iposervice.OpenFreeAccount().subscribe(data => {
      //    
      //    console.log(data)
      //  });
      this.ACOFormsubmitted = false;
      this.ACOForm.markAsPristine();
      this.ACOForm.markAsUntouched();
      window.open(`https://kwik.kotaksecurities.com/kwik/Account/RegisterFromBanner?mobile=${this.k.ACMobileNo.value}`, '_blank');
      this.k.ACMobileNo.setValue('');
    }
  }
  ValidateAccMobile() {
    this.ACOFormsubmitted = false;
  }
  CallIPOModal(msg: any) {
    $("#IPOModalApply").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#lblipocompany').text(msg);
  }
  OnSubmitApplyIPO(data: any) {
    sessionStorage.setItem('dfsfsefcdvgdrter6456dg',data.allowCutoff);
    if (this.decryptedValues != '' && this.decryptedValues != undefined && this.decryptedValues != null) {
      let cid = data.COMPANY_ID;
      sessionStorage.setItem('HqNlocCKACjWB+JZNeOUa4iuhxO', (cid));
      sessionStorage.setItem('Adjfsjhgfjhse3@@34737', this.encryptedvalues);
      this.router.navigateByUrl('/ipo/applyIPO');
    } else {
      this.CallIPOModal(data.COMPANY_ID);
      sessionStorage.removeItem('Adjfsjhgfjhse3@@34737');
    }
  }
  OnSubmitApplyIPOPopUp() {
    let data = $('#lblipocompany').text();
    sessionStorage.setItem('HqNlocCKACjWB+JZNeOUa4iuhxO', (data));
    this.router.navigateByUrl('/ipo/applyIPO');
  }
  DownloadProductNote(COMPANY_ID: number) {
    debugger
    this.Loader.show();
    let obj = {
      "COMPANY_ID": COMPANY_ID
    }
    let JSONobj = JSON.stringify(obj);
    this.iposervice.GetRHPDocumentDetails(JSONobj).subscribe(res => {

      let rr = res.ArrayOfResponse;
      if (rr.length > 0) {
        let ProductNote = res.ArrayOfResponse[0].ProductNoteBase64;
        if (ProductNote != '' || ProductNote != null || ProductNote != undefined) {
          fs.saveAs(`data:application/pdf;base64,${ProductNote}`, 'ProductNote.pdf');
        }
        else {
          this.CallAlertModal("Product note not found.")
        }
      }
      else {
        this.CallAlertModal("Product note not found.")
      }
      this.Loader.hide();
    },
      err => {
        console.log(err)
        this.Loader.hide();
      })
    // if(ProductNote != null && ProductNote != undefined && ProductNote != ""){
    //   const source = `data:application/pdf;base64,${ProductNote}`;
    //   const link = document.createElement("a");
    //   link.href = source;
    //   link.download = `ProductNote.pdf`
    //   link.click();
    // }
    // else{
    //   this.CallAlertModal("Product note not found.")
    // }
  }
  OpenAllotmentStatus(url: string) {
    if (!isNullOrUndefined(url) && url != '') {
      window.open(url, '_blank');
    } else {
      this.CallAlertModal('Allotment status not found.');
    }
  }
  CallAlertModal(msg: any) {
    $("#AlertModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#AlertModalContent').text(msg);
  }
  onTrackIPONCD(Id, Flag, issueEndDate, AccTime, COMPANY_NAME: string) {
    debugger
    try {
      if (this.decryptedValues != '' && this.decryptedValues != undefined && this.decryptedValues != null) {
        sessionStorage.setItem('Adjfsjhgfjhse3@@34737', this.encryptedvalues);
      } else {
        sessionStorage.removeItem('Adjfsjhgfjhse3@@34737');
      }
      sessionStorage.setItem('E3JezQHPouE9YDaMhhP', (Id));
      sessionStorage.setItem('ZNqj+2iZuOfT2H5sVFYQ9p4CFKL', (Flag));
      let r = issueEndDate.split('T')[0];
      let rr = `${r}T${AccTime}`;
      sessionStorage.setItem('DFJlksjfiZuOfT2H', rr);
      sessionStorage.setItem('KLJNiushegDHNiehf', COMPANY_NAME);
      this.router.navigateByUrl('/ipo/orderStatus');
    } catch (e) {

    }
  }
  Logout() {
    sessionStorage.clear();
    localStorage.clear();
    let ut = sessionStorage.getItem('L2D3506kIHSk3E0');
    if (ut != undefined && ut != null) {
      let u = (ut);
      if(u == '2')
      {
        window.location.href="https://preferred.kotaksecurities.com/trade/login"; // SSO Server
      }
      else
      {
        this.router.navigate(['/preipo/employee-login'], { relativeTo: this.activatedRoutes }); // 1304 changes
      }
    }
    //window.location.href = "https://preferred.kotaksecurities.com"; // UAT
    //window.location.href="https://kotaksecurities.com"; // Server
    
  }
  GoToHome() {
    if (this.decryptedValues != '' && this.decryptedValues != undefined && this.decryptedValues != null) {
      sessionStorage.setItem('Adjfsjhgfjhse3@@34737', this.encryptedvalues);
    }
    this.router.navigateByUrl('/');
  }
}
