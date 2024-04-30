import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { EncrdecrService } from '../../../Auth/encrdecr.service';
import { AlphaNumericOnly, CharacterAndOptionalSpace, IsValidMobile, IsValidOTP, IsValidPAN, NumberOnly } from 'src/app/validation';
import { CustomLoaderService } from '../../../services/custom-loader.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NotAuthorizedAlertComponent } from '../../not-authorized-alert/not-authorized-alert.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-apply-ipo',
  templateUrl: './apply-ipo.component.html',
  styleUrls: ['./apply-ipo.component.scss']
})
export class ApplyIpoComponent implements OnInit {
  IssueType: string;
  CompId: number;
  IsLoggedIn: boolean = false;
  G_ClientBasicInfoId: any = '';
  G_SubBrokerCode: string = '';
  ClientGender: string;
  G_UserType: number = 3;
  EMPId: string;
  
  G_DematDetailsid: any;
  G_IPOClientUPIIDid: any;
  G_DematBankDetails: any;
  MobileForm: FormGroup;
  MobileFormsubmitted: boolean = false;
  OTPForm: FormGroup;
  OTPFormsubmitted: boolean = false;
  IsShowOTPForm: boolean = false;
  PerDetForm: FormGroup;
  PerDetFormsubmitted: boolean = false;

  otpValue : any;
  mobNo : any;

  BiddingDetailsForm: FormGroup;
  BiddingDetailsFormsubmitted: boolean = false;
  BiddingDetailsForm_NCD: FormGroup;
  BiddingDetailsFormsubmitted_NCD: boolean = false;

  //EnableCutoff: boolean = false;
  IsMobileComplete: boolean = false;

  IsPersonalComplete: boolean = false;
  IsBiddingComplete: boolean = false;
  IPO_CurrentListData: [];
  //isEnabled: boolean = false;
  isFillMaxQuantity = false;
  IsShowClientID: boolean = false;
  //
  IpoCompanyLogo: any = "";
  strCompanyName: string = "";
  strCompanyDiscription: string = "";
  strCompanyDiscriptionLimit: number = 300;
  strIPOIssuePeriod: string = "";
  strIssuePriceBand: string = "";
  strBidLot: string = "";
  strTotalIPOSize: string = "";
  LowerPriceBand: string = "";
  maxPrice: number = 200000;
  UpperPriceBand: string = "";
  UpiAmount: number;
  UpiAmountPrev: number;
  G_NetQty: number;
  CommonBaseHref = environment.CommonBaseHref;

  UpiAmount_NCD: number = 0;
  G_FaceValue: string;
  SCRIPID: string;
  SrNo: number;
  SubbrokerCode: string;
  EmpCode: string = '';
  TempPAN: string = "";
  lstNCDSeries: any[] = [];
  InvalidUPIId: boolean = false;
  UPIValidationMsg: string = '';
  IsShowDpId: boolean = false;
  ExistingUser: boolean = false;
  DPMaxLength: any;
  ClientMaxLength: any;
  IsModifiedBid: boolean = false;
  BidId: string = '';
  ApplicationNo: string = '';
  NCDSeries: any = [];
  IPODiscount: number = 0;
  ShareHolderDiscount: number = 0;
  EmployeeDiscount: number = 0;
  PolicyHolderDiscount: number = 0;
  CategoryData: any[] = [];
  LoginMode: string = 'client';
  CretaedBy: string = '';
  IsResendOTPSuccess: boolean = false;
  ThankYouPageData: any;
  MobByPAN: string = "";
  DisplayActiveTabName: string = 'Verify Mobile';
  IsMobile: boolean = false;
  OrderSource: string = 'Guest';
  modalRef?: BsModalRef;
  OtpInterval: any;
  ResendOtpTime: number =30;
  visiblePass: boolean = true;
  changeType: boolean = true;
  allowCutoff: number = 0;
  constructor(private fb: FormBuilder,
    private iposervice: IPOServiceService,
    private EncrdecrService: EncrdecrService,
    private datepipe: DatePipe,
    private Loader: CustomLoaderService,
    private DomSanitizer: DomSanitizer,
    private router: Router,
    private modalService: BsModalService,
    private hireasdkask :  JksdgfuehdnoService) {
    this.MobileForm = this.fb.group({
      MobileNo: ['', [Validators.required, Validators.pattern(IsValidMobile)]],
    });
    this.OTPForm = this.fb.group({
      OTP: ['', [Validators.required, Validators.pattern(IsValidOTP)]],
    });
    this.PerDetForm = this.fb.group({
      PAN: ['', [Validators.required, Validators.pattern(IsValidPAN)]],
      ClientCode: [''],
      SearchBy: ['PAN'],
      Name: ['', [Validators.required, Validators.pattern(CharacterAndOptionalSpace)]],
      Mob: ['', [Validators.required, Validators.pattern(IsValidMobile)]],
      Email: ['', [Validators.required]],
      Dipository: ['', [Validators.required]],
      DPID: ['', [Validators.required, Validators.pattern(NumberOnly), Validators.maxLength(16)]],
      ClientID: ['', [Validators.required, Validators.pattern(NumberOnly), Validators.maxLength(8)]],
      UPIID: ['', [Validators.required]],
    });

    this.BiddingDetailsForm = this.fb.group({
      // : ['', [Validators.required]] ,
      TxtQuantity: ['', [Validators.required, Validators.pattern(NumberOnly)]],
      txtPriceBand: ['', [Validators.required, Validators.pattern(NumberOnly)]],
      Category: ['', [Validators.required]],
    });
    this.BiddingDetailsForm_NCD = this.fb.group({
      NCD_Series: ['', [Validators.required]],
      NCD_Quentity: ['', [Validators.required]],
    });
  }
  get i() {
    return this.MobileForm.controls;
  }
  get j() {
    return this.OTPForm.controls;
  }
  get k() {
    return this.PerDetForm.controls;
  }
  get l() {
    return this.BiddingDetailsForm.controls;
  }
  get m() {
    return this.BiddingDetailsForm_NCD.controls;
  }
  ngOnInit() {
    //
    this.Loader.show();
    this.SetViewPort(window.innerWidth);
    this.IsInvalidPAN();
    if (!this.IsNullOrEmpty(sessionStorage.getItem('UZT6qHaDZSz66kx'))) {
      this.G_ClientBasicInfoId = (sessionStorage.getItem('UZT6qHaDZSz66kx'));

    }
    if (!this.IsNullOrEmpty(sessionStorage.getItem('Hldq31TLYwRbLJ8'))) {
      this.SubbrokerCode = (sessionStorage.getItem('Hldq31TLYwRbLJ8'));

    }
    if (!this.IsNullOrEmpty(sessionStorage.getItem('F44sGAGh2xwkpUL'))) {
      this.EmpCode = (sessionStorage.getItem('F44sGAGh2xwkpUL'));

    }

    if (sessionStorage.getItem('dfsfsefcdvgdrter6456dg') != null && sessionStorage.getItem('dfsfsefcdvgdrter6456dg') != undefined) {
      this.allowCutoff = +sessionStorage.getItem('dfsfsefcdvgdrter6456dg');
    }

    this.CretaedBy = this.G_ClientBasicInfoId;
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
      if (res.Message.toLowerCase().includes('not authorized')) {
        let ngbModalOptions: NgbModalOptions = {
          backdrop: 'static',
          keyboard: false
        };
        this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
      }
      else {
        if (this.IsNullOrEmpty(this.CompId)) {
          if (!this.IsNullOrEmpty(sessionStorage.getItem('HqNlocCKACjWB+JZNeOUa4iuhxO'))) {
            this.CompId = parseInt((sessionStorage.getItem('HqNlocCKACjWB+JZNeOUa4iuhxO')));
          }
        }
        if (res.ArrayOfResponse.length > 0) {
          let ArrayOfResponseData = res.ArrayOfResponse;
          let Data = ArrayOfResponseData[0].objIPONdNCD.filter(atr => (atr.COMPANY_ID == this.CompId));
          if (!this.IsNullOrEmpty(Data[0].LogoBase64)) {
            this.IpoCompanyLogo = this.DomSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + Data[0].LogoBase64)
            //`data:image/png;base64,${Data[0].LogoBase64}`;
          } else {
            this.IpoCompanyLogo = `../../../../${this.CommonBaseHref}assets/images/noImageFound.png`;
          }
          this.strCompanyName = Data[0].COMPANY_NAME;
          this.strCompanyDiscription = Data[0].discription;
          this.strIPOIssuePeriod = this.datepipe.transform(Data[0].IssueStartDate, "MMM dd") + " - " + this.datepipe.transform(Data[0].IssueEndDate, "MMM dd");
          this.strIssuePriceBand = Data[0].LowerPriceBand + " - " + Data[0].UpperPriceBand
          this.IPODiscount = parseInt((Data[0].discount != '' && Data[0].discount != null) ? Data[0].discount : 0);
          this.ShareHolderDiscount = parseInt((Data[0].ShareHolderDiscount != '' && Data[0].ShareHolderDiscount != null) ? Data[0].ShareHolderDiscount : 0);
          this.EmployeeDiscount = parseInt((Data[0].EmployeeDiscount != '' && Data[0].EmployeeDiscount != null) ? Data[0].EmployeeDiscount : 0);
          this.PolicyHolderDiscount = parseInt((Data[0].PolicyHolderDiscount != '' && Data[0].PolicyHolderDiscount != null) ? Data[0].PolicyHolderDiscount : 0);
          this.strBidLot = Data[0].BidLot;
          this.UpperPriceBand = Data[0].UpperPriceBand;
          this.LowerPriceBand = Data[0].LowerPriceBand;
          this.strTotalIPOSize = Data[0].TotalSize;
          this.IssueType = Data[0].IssueType;
          if (this.IssueType == 'B') {
            this.iposervice.IPOFillDetails('', this.CompId, 'NCDSERIES').subscribe((resdata) => {
              let data = JSON.parse((resdata))
              if (data.Message.toLowerCase().includes('not authorized')) {
                let ngbModalOptions: NgbModalOptions = {
                  backdrop: 'static',
                  keyboard: false
                };
                this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
              }
              else{
                if (!this.IsNullOrEmpty(data)) {
                  if (data.ArrayOfResponse != null) {
                    this.NCDSeries = data.ArrayOfResponse;
                  }
                }
              }
            });
          }
          if (this.IssueType == 'I') {
            this.iposervice.IPOFillDetails('', this.CompId, 'IPOINVESTORCATEGORY').subscribe((resdata) => {
              let data = JSON.parse((resdata))
              if (data.Message.toLowerCase().includes('not authorized')) {
                let ngbModalOptions: NgbModalOptions = {
                  backdrop: 'static',
                  keyboard: false
                };
                this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
              }
              else{
                if (!this.IsNullOrEmpty(data)) {

                  if (data.ArrayOfResponse != null) {
                    let jj = data.ArrayOfResponse;
                    this.CategoryData = jj;//.filter(s => (s.VALUEFIELD.toLowerCase() == 'ind' || s.VALUEFIELD.toLowerCase() == 'sha' || s.VALUEFIELD.toLowerCase() == 'emp' || s.VALUEFIELD.toLowerCase() == 'pol'));
                    this.CategoryData.map(arr => {
                      if (arr.VALUEFIELD.toLowerCase() == 'ind') {
                        arr.TEXTFIELD = 'RETAIL';
                      }
                      if (arr.VALUEFIELD.toLowerCase() == 'hni') {
                        arr.TEXTFIELD = 'High Networth Individuals (HNI)';
                      }
                    })
                    if (this.CategoryData.length == 1) {
                      let val = this.CategoryData[0].VALUEFIELD;
                      setTimeout(() => {
                        this.BiddingDetailsForm.controls.Category.setValue(val);
                        $('.CustomSelectCategory').val(val).trigger("change");
                      }, 1500)
                    }
                    setTimeout(() => {
                      if (!this.IsNullOrEmpty(sessionStorage.getItem('ROkA37dvLoPsXUyxv0BysfIn0'))) {
                        var json: string = (sessionStorage.getItem('ROkA37dvLoPsXUyxv0BysfIn0'));
                        this.IsModifiedBid = true;
                        sessionStorage.removeItem('ROkA37dvLoPsXUyxv0BysfIn0')
                        if (!this.IsNullOrEmpty(json)) {
                          this.IsLoggedIn = true;
                          this.BindModificationData(JSON.parse(json))
                          this.DisplayActiveTabName = 'Personal Details';
                        }
                      } else {
                        this.Loader.hide();
                      }
                    }, 2000);
                  }
                }
              }
            });
          }
          this.SCRIPID = Data[0].SCRIPID;


          //this.BiddingDetailsForm.controls['txtPriceBand'].setValue(Data[0].UpperPriceBand)
          this.G_FaceValue = Data[0].facevalue;
          this.UpiAmount_NCD = +Data[0].BidLot * (+this.G_FaceValue);
          if (this.allowCutoff == 0) {
            this.EnableDisableCutoff();
          }
          if (this.IsNullOrEmpty(sessionStorage.getItem('ROkA37dvLoPsXUyxv0BysfIn0'))) {
            var loaderInterval = setInterval(() => {
              let str = document.readyState;
              if (str == 'complete') {
                this.Loader.hide();
                clearInterval(loaderInterval)
              }
            }, 1000);
          }
        }
      }
    });
    $(document).ready(function () {


      $(".numonly").on("input", function () {
        var regexp = /[^\d\.\-]/g;
        if ($(this).val().match(regexp)) {
          $(this).val($(this).val().replace(regexp, ''));
        }
      });

      $(".alphaonly").on("input", function () {
        var regexp = /[^a-zA-Z ]/g;
        if ($(this).val().match(regexp)) {
          $(this).val($(this).val().replace(regexp, ''));
        }
      });

      $('img.svg').each(function () {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function (data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find('svg');

          // Add replaced image's ID to the new SVG
          if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');

          // Replace image with new SVG
          $img.replaceWith($svg);

        }, 'xml');
      });
      $('.ReadMore').on({
        click: function () {
          $(this).parents('.ReadMoreOuter').find('.ReadMoreHiddenText').slideDown("slow");
          $(this).hide();
          $(this).parents('.ReadMoreOuter').find(".ReadMoreDots").css('display', 'none');
          $(this).parents('.ReadMoreOuter').find(".ReadLess").css('display', 'block');
        }
      });
      $('.ReadLess').on({
        click: function () {
          $(this).parents('.ReadMoreOuter').find('.ReadMoreHiddenText').slideUp("slow");
          $(this).hide();
          $(this).parents('.ReadMoreOuter').find(".ReadMoreDots").css('display', 'inline-block');
          $(this).parents('.ReadMoreOuter').find(".ReadMore").css('display', 'block');
        }
      });
    });
    if (this.IsLoggedIn) {
      if (sessionStorage.getItem('m5JkoXISmYRAIuY') != null && sessionStorage.getItem('m5JkoXISmYRAIuY') != undefined) {
        this.TempPAN = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
      }
      if (this.G_UserType == 3) {
        this.PerDetForm.controls['PAN'].setValue(this.TempPAN);
        this.PerDetForm.controls['PAN'].updateValueAndValidity();
        this.VerifyPan(this.TempPAN);
        this.PerDetForm.controls['PAN'].disable();
      }
    }
    if (this.IssueType == 'B') {
      this.BindNCDSeries(this.CompId);
    }
    let logo = sessionStorage.getItem('Adjfsjhgfjhse3@@34737');
    if (logo != undefined && logo != null && logo != '') {
      this.OrderSource = (logo);
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.SetViewPort(event.target.innerWidth)
  }
  SetViewPort(w) {
    if (w <= 767) {
      this.IsMobile = true;
      this.strCompanyDiscriptionLimit = 150;
    }
    else {
      this.IsMobile = false;
      this.strCompanyDiscriptionLimit = 300;
    }
  }
  ConvertToShortDate(ipd) {
    let r1 = ipd.getDate();
    let r2 = ipd.getMonth() + 1;
    let r3 = ipd.getFullYear();
    return `${r1}/${r2}/${r3}`;
  }
  IsNullOrEmpty(data): boolean {
    var val: boolean = false;
    if (data != null && data != undefined && data != '') {
      val = false;
    }
    else {
      val = true;
    }
    return val;
  }
  viewPass() {
    this.visiblePass = !this.visiblePass;
    this.changeType = !this.changeType;
  }
  ngAfterViewInit() {
    $('select').select2({
      minimumResultsForSearch: -1
    });
    $('.clsDipository').on('change', (e: any) => this.onDipository(e));
    $('.clsNCDSeries').on('change', (e: any) => this.BiddingDetailsForm_NCD.controls['NCD_Series'].setValue(e.target.value));
    $('.CustomSelectCategory').on('change', (e: any) => this.onChangeCategory(e));

  }
  onChangeCategory(e) {
    try {
      let val = e.target.value;
      this.l.Category.setValue(val);
      switch (val) {
        case 'IND':
          this.maxPrice = 200000;
          break;
        case 'SHA':
          this.maxPrice = 500000;
          break;
        case 'EMP':
          this.maxPrice = 500000; //500000
          break;
        case 'POL':
          this.maxPrice = 200000;
          break;
        case 'HNI':
          this.maxPrice = 500000;
          break;
        default:
          this.maxPrice = 200000;
          break;
      }
      if (val == 'HNI' || this.allowCutoff == 1) {
        $('#id_EnableDisableCutoff').prop('checked', false);
        $('#id_EnableDisableCutoff').prop('disabled', true);
      }
      else {
        $('#id_EnableDisableCutoff').prop('disabled', false);
        $('#id_EnableDisableCutoff').prop('checked', true);
      }

      if (this.allowCutoff == 0) {
        this.EnableDisableCutoff();
      }
      if (this.IsNullOrEmpty(sessionStorage.getItem('ROkA37dvLoPsXUyxv0BysfIn0'))) {
        if (this.IsMobile) {
          this.onChangeMaxQuantity('chkfillmaxQuantity');
        }
        else {
          this.onChangeMaxQuantity('chkfillmaxQuantity1');
        }
      }
    }
    catch (e) {
      this.Loader.hide();
    }
  }
  onSubmitMobileForm() {
    this.MobileFormsubmitted = true;
    if (this.MobileForm.invalid) {
      return;
    } else {
      this.IsShowOTPForm = true;
    }
  }

  ResendOtpInterval(){
    this.OtpInterval = setInterval(() => {
      this.ResendOtpTimer();
    }, 1000);
  }

  ResendOtpTimer() {
    this.ResendOtpTime =  this.ResendOtpTime - 1;

    if(this.ResendOtpTime == 0 ){
      $(".res").removeClass("act").prop("disabled", false);
      clearInterval(this.OtpInterval)
       }
  }
  GetOTP(para: string, isResend?: string) {
    this.ResendOtpTime = 30;
    this.Loader.show();
    let otpvalue = "0";
    if (para == "V") {
      otpvalue = this.otpValue = this.OTPForm.controls["OTP"].value;
    }
    let request1 = {
      Name: "",
      SMS_TEMPLATE_TYPE: "OTPBased_verification",
      MobileNo: this.mobNo = this.MobileForm.controls["MobileNo"].value,
      OTPFlag: para,
      OTP: otpvalue,
      IPO_NAME: this.strCompanyName
    };
    let DataBody1 = JSON.stringify(request1);
    this.iposervice.GenerateMobileOTP(DataBody1).subscribe((resdata: any) => {
      debugger
      let res = JSON.parse((resdata))
      let rr = res.ArrayOfResponse[0];
      if (rr.status_code == "00") {
        if (para == "G") {
          $(".res").removeClass("act").prop("disabled", true);
          this.ResendOtpInterval();
          if (isResend == 'Resend') {
            this.IsResendOTPSuccess = true;
            setTimeout(() => {
              this.IsResendOTPSuccess = false;
            }, 4000);
          }
          this.onSubmitMobileForm();
        } else {
          this.iposervice.verifyOTP(request1.MobileNo, request1.OTP).subscribe((res : any) => {debugger
            this.onSubmitOTPForm();
          },
          (err: any) => {debugger
            this.CallAlertModal("Invalid OTP Code")
          }
          )
         
        }
      }
      else {
        this.CallAlertModal(rr.description);
        this.j.OTP.setValue("");
      }
    },
    err => {
      this.CallAlertModal('Something went wrong, please try again in sometime.');
      this.j.OTP.setValue("");
    });
    this.Loader.hide();
  }

  onSubmitOTPForm() {
    this.OTPFormsubmitted = true;
    if (this.OTPForm.invalid) {
      return;
    } else {
      this.IsShowOTPForm = false;
      $('.IPOTabs li').removeClass('active');
      $('#IPOTabContent .tab-pane').removeClass('active show');
      $('#Li_DivPer a').addClass('active');
      $('#PersonalDetails').addClass('active show');
      this.DisplayActiveTabName = "Personal Details";
      this.IsMobileComplete = true;
      this.PerDetForm.reset();
      this.PerDetFormsubmitted = false;
      this.PerDetForm.controls['Mob'].setValue(this.MobileForm.controls['MobileNo'].value);
      this.PerDetForm.controls['Mob'].disable();
      this.PerDetForm.controls['PAN'].setValue('');
      this.PerDetForm.controls['Name'].setValue('');
      this.PerDetForm.controls['Email'].setValue('');
      this.PerDetForm.controls['SearchBy'].setValue('PAN');
      $('.clsDipository').val('').trigger('change')
      this.PerDetForm.controls['DPID'].setValue('');
      this.PerDetForm.controls['ClientID'].setValue('');
      this.PerDetForm.controls['UPIID'].setValue('');

    }
  }
  SetActivePersonalTab() {
    $('#Li_DivBid a').removeClass('active');
    $('#IPOTabContent .tab-pane').removeClass('active show');
    $('#Li_DivPer a').addClass('active');
    $('#PersonalDetails').addClass('active show');
    this.DisplayActiveTabName = "Personal Details";
    this.IsPersonalComplete = false;
  }
  SetActiveMobileTab() {
    $('#Li_DivPer a').removeClass('active');
    $('#IPOTabContent .tab-pane').removeClass('active show');
    $('#Li_DivMob a').addClass('active');
    $('#MobileVerification').addClass('active show');
    this.DisplayActiveTabName = "Verify Mobile";
    this.IsMobileComplete = false;
    this.MobileForm.reset();
    this.OTPForm.reset();
    this.MobileFormsubmitted = false;
    this.OTPFormsubmitted = false;
  }
  IsInvalidPAN() {
    this.k.Name.disable();
    this.k.Mob.disable();
    this.k.Email.disable();
    this.k.Dipository.disable();
    this.k.DPID.disable();
    this.k.ClientID.disable();
    this.k.UPIID.disable();
  }

  VerifyPan(e) {
    if (e.length == 10) {
      this.Loader.show();
      if (this.k.PAN.status == "VALID") {
        this.k.Name.enable();
        this.k.Mob.disable();
        this.k.Email.enable();
        this.k.Dipository.enable();
        this.k.DPID.enable();
        this.k.ClientID.enable();
        this.k.UPIID.enable();
      }
      else {
        this.IsInvalidPAN();
        this.Loader.hide();
      }
      if (!this.IsModifiedBid && this.k.PAN.status == "VALID") {
        if (this.PerDetForm.controls.SearchBy.value == 'PAN') {
          if (e != "") {
      this.iposervice.GetIPOClientDetails(e, "", "","").subscribe(res => {
              this.Loader.hide();
              if (res.Message.toLowerCase().includes('not authorized')) {
                let ngbModalOptions: NgbModalOptions = {
                  backdrop: 'static',
                  keyboard: false
                };
                this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
              }
              else {
                if (res.ID > 0) {
                  let ArrayOfResponseData = JSON.parse((res.Message));
                  if (ArrayOfResponseData != null) {
                    this.ExistingUser = true;
                    if (ArrayOfResponseData[0].objIPOClientPD != null) {
                      // this.PerDetForm.controls['PAN'].setValue(e);
                      // this.PerDetForm.controls['Name'].setValue(ArrayOfResponseData[0].objIPOClientPD[0].FirstApplicant);
                      if (this.IsLoggedIn) {
                        //this.PerDetForm.controls['Mob'].setValue(ArrayOfResponseData[0].objIPOClientPD[0].Mobile);
                      }
                      this.MobByPAN = ArrayOfResponseData[0].objIPOClientPD[0].Mobile;
                      //this.PerDetForm.controls['Email'].setValue(ArrayOfResponseData[0].objIPOClientPD[0].Email);
                      this.SrNo = ArrayOfResponseData[0].objIPOClientPD[0].clientdataSrNo
                      this.EmpCode = ArrayOfResponseData[0].objIPOClientPD[0].EmpCode
                      this.SubbrokerCode = ArrayOfResponseData[0].objIPOClientPD[0].SubbrokerCode

                    }
                    else {
                      this.PerDetForm.controls['Name'].setValue("");
                      //this.PerDetForm.controls['Mob'].setValue("");
                      this.PerDetForm.controls['Email'].setValue("");
                      this.SrNo = 0;

                    }
                    if (ArrayOfResponseData[0].objIPOClientDD != null) {
                      // var DefaultDematDetails = ArrayOfResponseData[0].objIPOClientDD.filter((arr:any)=>arr.dpdefault=="1");
                      // ArrayOfResponseData[0].objIPOClientDD=[];
                      // ArrayOfResponseData[0].objIPOClientDD[0] = DefaultDematDetails;
                      //this.PerDetForm.controls['Dipository'].setValue(ArrayOfResponseData[0].objIPOClientDD[0].NSDLCDSL);
                      //$('.clsDipository').val(ArrayOfResponseData[0].objIPOClientDD[0].NSDLCDSL).trigger('change');

                      let DPID: string = ArrayOfResponseData[0].objIPOClientDD[0].DPID;
                      if (DPID.toString().includes('IN')) {
                        DPID = DPID.toString().substring(2)
                      }
                      //this.PerDetForm.controls['DPID'].setValue(DPID);
                      //this.PerDetForm.controls['ClientID'].setValue(ArrayOfResponseData[0].objIPOClientDD[0].ClientID);
                      this.G_DematDetailsid = ArrayOfResponseData[0].objIPOClientDD[0].srno

                    }
                    else {
                      this.PerDetForm.controls['Dipository'].setValue('');
                      $('.clsDipository').val('').trigger('change');
                      this.G_DematDetailsid = 0;
                    }
                    if (ArrayOfResponseData[0].objUPIDet != null) {
                      // var DefaultUPIDetails = ArrayOfResponseData[0].objUPIDet.filter((arr:any)=>arr.szdefault=="1");
                      // ArrayOfResponseData[0].objIPOClientDD=[];
                      // ArrayOfResponseData[0].objIPOClientDD[0] = DefaultUPIDetails;
                     // this.PerDetForm.controls['UPIID'].setValue(ArrayOfResponseData[0].objUPIDet[0].UPIID);
                      this.G_IPOClientUPIIDid = ArrayOfResponseData[0].objUPIDet[0].upiIDSrNo

                    }
                    else {
                      this.PerDetForm.controls['UPIID'].setValue("");
                      this.G_IPOClientUPIIDid = 0;
                    }
                  }
                  else {
                    this.ExistingUser = false;
                    this.PerDetForm.controls['Name'].setValue("");
                    //this.PerDetForm.controls['Mob'].setValue("");
                    this.PerDetForm.controls['Email'].setValue("");
                    this.SrNo = 0;
                    this.PerDetForm.controls['Dipository'].setValue('');
                    $('.clsDipository').val('').trigger('change');
                    this.PerDetForm.controls['UPIID'].setValue("");
                    this.G_DematDetailsid = 0;
                    this.G_IPOClientUPIIDid = 0;
                  }
                }
                else {
                  if (this.IsLoggedIn) {
                    this.PerDetForm.controls['PAN'].setValue(this.TempPAN);
                  }
                  this.PerDetForm.controls['Name'].setValue("");
                  //this.PerDetForm.controls['Mob'].setValue("");
                  this.PerDetForm.controls['Email'].setValue("");
                  this.SrNo = 0;
                  this.PerDetForm.controls['Dipository'].setValue('');
                  $('.clsDipository').val('').trigger('change');
                  this.PerDetForm.controls['UPIID'].setValue("");
                  this.PerDetForm.controls['DPID'].setValue('');
                  this.G_DematDetailsid = 0;
                  this.G_IPOClientUPIIDid = 0;
                }
              }


            }, (Err) => {
              localStorage.setItem('IpoClientdetailErr', JSON.stringify(Err));
              this.Loader.hide();
            });
          }
          else {
            this.Loader.hide();
            this.PerDetForm.controls['Name'].setValue('');
            this.PerDetForm.controls['Mob'].setValue('');
            this.PerDetForm.controls['Email'].setValue('');
            this.PerDetForm.controls['UPIID'].setValue('');
            this.PerDetForm.controls['DPID'].setValue('');
            this.PerDetForm.controls['ClientID'].setValue('');
          }
        }
      }
      this.Loader.hide();
    }
  }
  VerifyClientCode(e) {
    
    if (!this.IsModifiedBid) {
      if (e != "") {
        this.iposervice.GetIPOClientDetails(e, "", "", "").subscribe(res => {
          if (res.Message.toLowerCase().includes('not authorized')) {
            let ngbModalOptions: NgbModalOptions = {
              backdrop: 'static',
              keyboard: false
            };
            this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
          }
          else {
            if (res.ID > 0) {
              let ArrayOfResponseData = JSON.parse((res.Message));
              if (ArrayOfResponseData != null) {
                this.ExistingUser = true;
                if (ArrayOfResponseData[0].objIPOClientPD != null) {
                  //this.PerDetForm.controls['PAN'].setValue(ArrayOfResponseData[0].objIPOClientPD[0].FirstApplicantPAN);
                  //this.PerDetForm.controls['Name'].setValue(ArrayOfResponseData[0].objIPOClientPD[0].FirstApplicant);
                  if (this.IsLoggedIn) {
                    //this.PerDetForm.controls['Mob'].setValue(ArrayOfResponseData[0].objIPOClientPD[0].Mobile);
                  }
                  //this.PerDetForm.controls['Email'].setValue(ArrayOfResponseData[0].objIPOClientPD[0].Email);
                  this.SrNo = ArrayOfResponseData[0].objIPOClientPD[0].clientdataSrNo
                  this.EmpCode = ArrayOfResponseData[0].objIPOClientPD[0].EmpCode
                  this.SubbrokerCode = ArrayOfResponseData[0].objIPOClientPD[0].SubbrokerCode

                }
                else {
                  this.PerDetForm.controls['Name'].setValue("");
                  //this.PerDetForm.controls['Mob'].setValue("");
                  this.PerDetForm.controls['Email'].setValue("");
                  this.SrNo = 0;

                }

                if (ArrayOfResponseData[0].objIPOClientDD != null) {
                  // var DefaultDematDetails = ArrayOfResponseData[0].objIPOClientDD.filter((arr:any)=>arr.dpdefault=="1");
                  // ArrayOfResponseData[0].objIPOClientDD=[];
                  // ArrayOfResponseData[0].objIPOClientDD[0] = DefaultDematDetails;
                  //this.PerDetForm.controls['Dipository'].setValue(ArrayOfResponseData[0].objIPOClientDD[0].NSDLCDSL);
                  //$('.clsDipository').val(ArrayOfResponseData[0].objIPOClientDD[0].NSDLCDSL).trigger('change');

                  let DPID: string = ArrayOfResponseData[0].objIPOClientDD[0].DPID;
                  if (DPID.toString().includes('IN')) {
                    DPID = DPID.toString().substring(2)
                  }
                  //this.PerDetForm.controls['DPID'].setValue(DPID);
                  //this.PerDetForm.controls['ClientID'].setValue(ArrayOfResponseData[0].objIPOClientDD[0].ClientID);
                  this.G_DematDetailsid = ArrayOfResponseData[0].objIPOClientDD[0].srno

                }
                else {
                  this.PerDetForm.controls['Dipository'].setValue('');
                  $('.clsDipository').val('').trigger('change');
                  this.G_DematDetailsid = 0;
                }
                if (ArrayOfResponseData[0].objUPIDet != null) {
                  // var DefaultUPIDetails = ArrayOfResponseData[0].objUPIDet.filter((arr:any)=>arr.szdefault=="1");
                  // ArrayOfResponseData[0].objIPOClientDD=[];
                  // ArrayOfResponseData[0].objIPOClientDD[0] = DefaultUPIDetails;
                  //this.PerDetForm.controls['UPIID'].setValue(ArrayOfResponseData[0].objUPIDet[0].UPIID);
                  this.G_IPOClientUPIIDid = ArrayOfResponseData[0].objUPIDet[0].upiIDSrNo

                }
                else {
                  this.PerDetForm.controls['UPIID'].setValue("");
                  this.G_IPOClientUPIIDid = 0;
                }

                //BankDetailsId
              }
              else {
                this.ExistingUser = false;
                this.PerDetForm.controls['Name'].setValue("");
                //this.PerDetForm.controls['Mob'].setValue("");
                this.PerDetForm.controls['Email'].setValue("");
                this.SrNo = 0;
                this.PerDetForm.controls['Dipository'].setValue('');
                $('.clsDipository').val('').trigger('change');
                this.PerDetForm.controls['UPIID'].setValue("");
                this.G_DematDetailsid = 0;
                this.G_IPOClientUPIIDid = 0;
              }
            }
            else {
              if (this.IsLoggedIn) {
                this.PerDetForm.controls['PAN'].setValue(this.TempPAN);
              }
              this.PerDetForm.controls['Name'].setValue("");
              //this.PerDetForm.controls['Mob'].setValue("");
              this.PerDetForm.controls['Email'].setValue("");
              this.SrNo = 0;
              this.PerDetForm.controls['Dipository'].setValue('');
              $('.clsDipository').val('').trigger('change');
              this.PerDetForm.controls['UPIID'].setValue("");
              this.G_DematDetailsid = 0;
              this.G_IPOClientUPIIDid = 0;
            }
          }


        });
      }
      else {
        this.PerDetForm.controls['Name'].setValue('');
        this.PerDetForm.controls['Mob'].setValue('');
        this.PerDetForm.controls['Email'].setValue('');
        this.PerDetForm.controls['UPIID'].setValue('');
        this.PerDetForm.controls['DPID'].setValue('');
        this.PerDetForm.controls['ClientID'].setValue('');
      }
    }
    this.Loader.hide();
  }
  ClearControls() {
    this.PerDetForm.controls['Name'].setValue('');
    this.PerDetForm.controls['Mob'].setValue('');
    this.PerDetForm.controls['Email'].setValue('');
    this.PerDetForm.controls['UPIID'].setValue('');
    this.PerDetForm.controls['DPID'].setValue('');
    this.PerDetForm.controls['ClientID'].setValue('');
    this.PerDetForm.controls['Dipository'].setValue('');
    $('.clsDipository').val('').trigger('change');
    this.PerDetForm.controls['PAN'].setValue('');
  }


  ValidateUPIID(e) {
    if (e != "") {
      this.iposervice.GET_IPO_Bidding_Data(e).subscribe(data => {
      let res = JSON.parse( (data))
        if (res.Message.toLowerCase().includes('not authorized')) {
          let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
        }
        else{
        if (res.ArrayOfResponse.length > 0) {
          if (res.ArrayOfResponse[0].VALUEFIELD == 1) {
            this.InvalidUPIId = true;
            this.UPIValidationMsg = res.ArrayOfResponse[0].TEXTFIELD;

          } else {
            this.InvalidUPIId = false;
            this.UPIValidationMsg = "";

          }
        }
        else {
          this.InvalidUPIId = false;
          this.UPIValidationMsg = "";

        }
      }
      });

    }

  }

  onSubmitPerDetForm() {
    debugger
    this.Loader.show();
    this.PerDetFormsubmitted = true;
    if (this.PerDetForm.invalid) {
      this.Loader.hide();
      return false;
    } else {
      this.iposervice.Submit_GET_IPO_Bidding_Data(this.PerDetForm.controls['UPIID'].value, this.mobNo,this.otpValue).subscribe((data: any) => {debugger
        this.Loader.hide();
        let res = JSON.parse((data))
        if (res.Message.toLowerCase().includes('not authorized')) {
          let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
        }
        else{
        if (res.ArrayOfResponse.length > 0) {
          if (res.ArrayOfResponse[0].VALUEFIELD == 1) {
            this.InvalidUPIId = true;
            this.UPIValidationMsg = res.ArrayOfResponse[0].TEXTFIELD;

          } else {
            this.InvalidUPIId = false;
            this.UPIValidationMsg = "";
            this.SubmitBasicDetailsForm();
          }
        }
        else {
          this.InvalidUPIId = false;
          this.UPIValidationMsg = "";
          this.SubmitBasicDetailsForm();
        }
      }
      },
      (error:any) =>{this.Loader.hide();
        this.CallAlertModal("Invalid OTP Code")
      }
      );
    }

  }
  SubmitBasicDetailsForm() {
    this.PerDetFormsubmitted = true;
    if (this.PerDetForm.invalid) {
      return false;
    } else {
      if (this.allowCutoff == 1) {
        this.CallIPOSpecialModal("You will receive UPI Mandate Authentication request for your application on 1st March.");
      }
      $('.IPOTabs li').removeClass('active');
      $('#IPOTabContent .tab-pane').removeClass('active show');
      $('#Li_DivBid a').addClass('active');
      $('#BiddingDetails').addClass('active show');
      this.IsPersonalComplete = true;
      this.DisplayActiveTabName = "Bidding Details";
    }
  }
  onDipository(event: any) {
    //
    let Dipository = event.target.value;
    this.PerDetForm.controls['Dipository'].setValue(Dipository);
    //$('.clsDipository').trigger('change');
    if (Dipository == "NSDL") {

      this.IsShowDpId = true;
      this.DPMaxLength = 6;
      this.ClientMaxLength = 8;
      this.PerDetForm.get('ClientID').setValue("");
      this.PerDetForm.get('ClientID').setValidators([Validators.required, Validators.pattern(NumberOnly), Validators.maxLength(8), Validators.minLength(8)]);
      this.PerDetForm.get('ClientID').updateValueAndValidity();
      this.PerDetForm.get('DPID').setValue("");
      this.PerDetForm.get('DPID').setValidators([Validators.required, Validators.pattern(NumberOnly), Validators.maxLength(6), Validators.minLength(6)]);
      this.PerDetForm.get('DPID').updateValueAndValidity();

    } else if (Dipository == "CDSL") {

      this.IsShowDpId = false;
      this.ClientMaxLength = 16;
      this.PerDetForm.get('ClientID').setValue("");
      this.PerDetForm.get('ClientID').clearValidators();
      this.PerDetForm.get('ClientID').updateValueAndValidity();
      this.PerDetForm.get('DPID').setValue("");
      this.PerDetForm.get('DPID').clearValidators();
      this.PerDetForm.get('DPID').updateValueAndValidity();
      this.PerDetForm.get('ClientID').setValidators([Validators.required, Validators.pattern(NumberOnly), Validators.maxLength(16), Validators.minLength(16)]);
      this.PerDetForm.get('ClientID').updateValueAndValidity();

    }
  }

  EnableDisableCutoff() {
    if (this.allowCutoff == 0) {
      if ($('#id_EnableDisableCutoff').prop('checked')) {
        //this.isEnabled = true;
        this.BiddingDetailsForm.controls['txtPriceBand'].setValue("");
        this.BiddingDetailsForm.controls['txtPriceBand'].setValue(this.UpperPriceBand);
        this.BiddingDetailsForm.controls['txtPriceBand'].disable();
        this.UpiAmount = 0;
        this.BiddingDetailsForm.controls['TxtQuantity'].setValue("");
        $('#chkfillmaxQuantity').prop("checked", false);
        $('#chkfillmaxQuantity1').prop("checked", false);
        this.BiddingDetailsForm.controls['TxtQuantity'].enable();
      }
      else {
        //this.isEnabled = false;
        this.BiddingDetailsForm.controls['txtPriceBand'].enable();
        if (!this.IsModifiedBid) {
          this.BiddingDetailsForm.controls['txtPriceBand'].setValue("");
          this.BiddingDetailsForm.controls['TxtQuantity'].setValue("");
          this.UpiAmount = 0;
        }
        $('#chkfillmaxQuantity').prop("checked", false);
        $('#chkfillmaxQuantity1').prop("checked", false);
        this.BiddingDetailsForm.controls['TxtQuantity'].enable();
      }
    } else {
      this.CallIPOSpecialModal("Cut-Off option not allowed.");
      $('#chkfillmaxQuantity').prop("checked", false);
        $('#chkfillmaxQuantity1').prop("checked", false);
        $('#id_EnableDisableCutoff').prop('checked', false);
    }
  }
  onChangeMaxQuantity(para) {
    switch (para) {
      case 'chkfillmaxQuantity':
        if ($('#chkfillmaxQuantity').prop("checked")) {
          $('#chkfillmaxQuantity1').prop("checked", true);
        }
        else {
          $('#chkfillmaxQuantity1').prop("checked", false);
        }
        break;
      case 'chkfillmaxQuantity1':
        if ($('#chkfillmaxQuantity1').prop("checked")) {
          $('#chkfillmaxQuantity').prop("checked", true);
        }
        else {
          $('#chkfillmaxQuantity').prop("checked", false);
        }
        break;
    }
    if ($('#chkfillmaxQuantity').prop("checked") || $('#chkfillmaxQuantity1').prop("checked")) {
      if (this.BiddingDetailsForm.controls['txtPriceBand'].value != "") {
        let InitPriceBand: number = parseInt(this.BiddingDetailsForm.controls['txtPriceBand'].value)
        let PriceBand = 0;
        let discount = 0;

        switch (this.l.Category.value) {
          case 'IND':
            discount = this.IPODiscount;
            break;
          case 'SHA':
            discount = this.ShareHolderDiscount;
            break;
          case 'EMP':
            discount = this.EmployeeDiscount;
            break;
          case 'POL':
            discount = this.PolicyHolderDiscount;
            break;
        }

        PriceBand = InitPriceBand - discount;
        let MxQty: number = this.maxPrice / PriceBand;

        let Qty: number = Math.floor(MxQty) / parseInt(this.strBidLot);

        let NetQty: number = Math.floor(Qty) * parseInt(this.strBidLot);
        this.G_NetQty = NetQty;

        this.BiddingDetailsForm.controls['TxtQuantity'].setValue(NetQty);

        this.UpiAmount = PriceBand * NetQty;

        this.BiddingDetailsForm.controls['TxtQuantity'].disable();
      }
      else {

        this.isFillMaxQuantity = false;
        $('#chkfillmaxQuantity').prop("checked", false);
        $('#chkfillmaxQuantity1').prop("checked", false);
        this.BiddingDetailsForm.controls['TxtQuantity'].setValue("");

        this.UpiAmount = 0;
        this.BiddingDetailsForm.get('txtPriceBand').setValidators([Validators.required, Validators.min(parseInt(this.LowerPriceBand)), Validators.max(parseInt(this.UpperPriceBand)), Validators.pattern(NumberOnly)]);
        this.BiddingDetailsForm.get('txtPriceBand').updateValueAndValidity();
        this.BiddingDetailsFormsubmitted = true;
        if (this.BiddingDetailsForm.invalid) {
          return;
        }
        else { }

      }
    }
    else {
      this.BiddingDetailsForm.controls['TxtQuantity'].enable();
      this.BiddingDetailsForm.controls['TxtQuantity'].setValue("");
      this.UpiAmount = 0;
    }
  }
  OnchangePriceBand(e) {
    if (e == "") {
    }
    else {
      if (!$('#id_EnableDisableCutoff').prop('checked')) {
        let Price = parseInt(e)
        if (Price >= parseInt(this.LowerPriceBand) && Price <= parseInt(this.UpperPriceBand)) {
          if (this.IsMobile) {
            this.onChangeMaxQuantity('chkfillmaxQuantity');
          }
          else {
            this.onChangeMaxQuantity('chkfillmaxQuantity1');
          }
        }
        else {
          // Price Shouldbe LowerPriceBand and UpperPriceBand;
          // this.BiddingDetailsForm.controls["txtPriceBand"].setValue("");
          this.BiddingDetailsForm.controls['TxtQuantity'].setValue("");

          this.UpiAmount = 0;
          this.BiddingDetailsForm.get('txtPriceBand').setValidators([Validators.required, Validators.min(parseInt(this.LowerPriceBand)), Validators.max(parseInt(this.UpperPriceBand)), Validators.pattern(NumberOnly)]);
          this.BiddingDetailsForm.get('txtPriceBand').updateValueAndValidity();
          this.BiddingDetailsForm.get('TxtQuantity').clearValidators();
          this.BiddingDetailsForm.get('TxtQuantity').updateValueAndValidity();

          this.BiddingDetailsFormsubmitted = true;
          if (this.BiddingDetailsForm.invalid) {
            //this.BiddingDetailsForm.controls['TxtQuantity'].setValue("");
            return;
          }
          else {

          }

        }
      }
    }
  }

  OnTxtChangeQuantity(e) {

    if (e != "") {
      if (this.BiddingDetailsForm.controls['txtPriceBand'].value != "") {
        const price = parseInt(this.BiddingDetailsForm.controls['txtPriceBand'].value);
        if (price >= parseInt(this.LowerPriceBand) && price <= parseInt(this.UpperPriceBand)) {
          //#region Amount Calculation
          let InitPriceBand: number = parseInt(this.BiddingDetailsForm.controls['txtPriceBand'].value)
          let PriceBand = 0;
          let discount = 0;

          switch (this.l.Category.value) {
            case 'IND':
              discount = this.IPODiscount;
              break;
            case 'SHA':
              discount = this.ShareHolderDiscount;
              break;
            case 'EMP':
              discount = this.EmployeeDiscount;
              break;
            case 'POL':
              discount = this.PolicyHolderDiscount;
              break;
          }

          PriceBand = InitPriceBand - discount;
          let MxQty: number = this.maxPrice / PriceBand;

          let Qty: number = Math.floor(MxQty) / parseInt(this.strBidLot);

          let NetQty: number = Math.floor(Qty) * parseInt(this.strBidLot);
          this.G_NetQty = NetQty;
          if (e <= NetQty) {
            let bidLot = parseInt(this.strBidLot);
            let Enterbidlot = parseInt(e);
            for (let i = 1; i <= i + 1; i++) {

              let Bidquantity = bidLot * i;
              if (Bidquantity == e) {
                this.UpiAmount = PriceBand * parseInt(e);
                break;
              }
              else {
                if (Bidquantity > e) {
                  this.UpiAmount = 0;
                  this.BiddingDetailsForm.controls['TxtQuantity'].setErrors({ mustMatch: true });
                  this.BiddingDetailsFormsubmitted = true;
                  if (this.BiddingDetailsForm.invalid) {
                    return;
                  }
                  else {
                  }
                  break;

                }
              }
            }
          }
          else {
            this.UpiAmount = 0;
            this.BiddingDetailsForm.controls['TxtQuantity'].setValue("");
            this.BiddingDetailsForm.controls['TxtQuantity'].setErrors({ QntMatch: true });
            this.BiddingDetailsFormsubmitted = true;
            if (this.BiddingDetailsForm.invalid) {
              return;
            }
            else {
            }
          }
          //this.BiddingDetailsForm.controls['TxtQuantity'].setValue(NetQty);
          //#endregion
        }
        else {
          this.UpiAmount = 0;
        }
      }
      else {
        this.UpiAmount = 0;
        this.BiddingDetailsForm.controls['txtPriceBand'].setErrors({ required: true });
        this.BiddingDetailsFormsubmitted = true;
        if (this.BiddingDetailsForm.invalid) {
          return false;
        }
      }
    }
    else {
      this.UpiAmount = 0;
      this.BiddingDetailsForm.controls['TxtQuantity'].setValue("");
      this.BiddingDetailsForm.controls['TxtQuantity'].setValidators([Validators.required, Validators.pattern(NumberOnly)]);
      this.BiddingDetailsForm.controls['TxtQuantity'].setErrors({ required: true });
      this.BiddingDetailsFormsubmitted = true;
      if (this.BiddingDetailsForm.invalid) {
        return;
      }
    }
  }
  onSubmitBiddingDetails() {
    this.Loader.show();
    this.BiddingDetailsFormsubmitted = true;
    if (!this.IsNullOrEmpty(sessionStorage.getItem('fbPxEvwQayKqnyUY/vuP9GtBLBew0RP'))) {
      //#region  This code will execute when client try to modify theire bid order
      if (this.BiddingDetailsForm.invalid) {
        this.Loader.hide();
        return false;
      } else {
        if (this.l.Category.value == 'HNI' && this.UpiAmount <= this.UpiAmountPrev) {
          this.Loader.hide();
          this.CallAlertModal(`Amount must be greater than previous bid amount, which was ${this.UpiAmountPrev}`);
        }
        else {
          if (this.UpiAmount > 0) {
            this.SendBidDataForModified();
          }
          else {
            this.Loader.hide();
            this.BiddingDetailsForm.get('TxtQuantity').setValue('');
            this.BiddingDetailsForm.get('TxtQuantity').updateValueAndValidity();
            this.CallAlertModal(`Please enter valid quantity.`);
          }
        }
      }
    }
    else {
      this.BiddingDetailsForm.get('txtPriceBand').setValidators([Validators.required, Validators.min(parseInt(this.LowerPriceBand)), Validators.max(parseInt(this.UpperPriceBand)), Validators.pattern(NumberOnly)]);
      this.BiddingDetailsForm.get('txtPriceBand').updateValueAndValidity();
      this.BiddingDetailsForm.get('TxtQuantity').setValidators([Validators.required, Validators.pattern(NumberOnly)]);
      this.BiddingDetailsForm.get('TxtQuantity').updateValueAndValidity();
      if (this.BiddingDetailsForm.invalid) {
        this.Loader.hide();
        return false;
      }
      else {
        if (this.UpiAmount > 0) {
          if (this.l.Category.value == 'HNI' && this.UpiAmount < 200000) {
            this.Loader.hide();
            this.CallAlertModal(`Amount must be greater than 200000`);
          }
          else {
            this.SubmitApplication();
          }
        }
        else {
          this.Loader.hide();
          this.BiddingDetailsForm.get('TxtQuantity').setValue('');
          this.BiddingDetailsForm.get('TxtQuantity').updateValueAndValidity();
          this.CallAlertModal(`Please enter valid quantity.`);
        }
      }
    }
  }
  SubmitApplication() {
    if (this.UpiAmount <= this.maxPrice) {
      let SrNo = this.SrNo;
      let FirstApplicant = this.PerDetForm.controls['Name'].value;
      let FirstApplicantPAN = this.PerDetForm.controls['PAN'].value;
      let Mobile = "";
      if (this.MobByPAN == "") {
        Mobile = this.PerDetForm.controls['Mob'].value;
      }
      else {
        Mobile = this.MobByPAN;
      }
      let Email = this.PerDetForm.controls['Email'].value;
      let CreatedBy = null;
      let Status = null;
      let Address = null;
      let Pincode = null;
      let IPAddress = null;
      let Group = null;
      let Subbrokercode = this.SubbrokerCode;
      let EmpCode = this.EmpCode;
      let dpid = this.PerDetForm.controls['Dipository'].value == "NSDL" ? "IN" + this.PerDetForm.controls['DPID'].value : this.PerDetForm.controls['DPID'].value;
      let JsonData1 = {
        "SrNo": SrNo,
        "Subbrokercode": Subbrokercode,
        "FirstApplicant": FirstApplicant,
        "FirstApplicantPAN": FirstApplicantPAN,
        "Mobile": Mobile,
        "Email": Email,
        "Address": Address,
        "Pincode": Pincode,
        "CreatedBy": CreatedBy,
        "IPAddress": IPAddress,
        "Group": Group,
        "Status": Status,
        "EmpCode": EmpCode,
        "Mgrt_Source": this.OrderSource,
        "objClientDematDetail": [{
          "srno": this.G_DematDetailsid,
          "clientsrno": this.SrNo,
          "dpid": dpid,
          "dptype": this.PerDetForm.controls['Dipository'].value,
          "clientid": this.PerDetForm.controls['ClientID'].value,
          "dpdefault": "1"
        }],
        "objClientUPIDet": [{
          "upiidsrno": this.G_IPOClientUPIIDid,
          "clientsrno": this.SrNo,
          "upidefault": "1",
          "upiid": this.PerDetForm.controls['UPIID'].value,
        }]
      }
      this.iposervice.SaveNdUpdateIPOClientBankDetails(JsonData1).subscribe(res => {
        
        if (res != null) {
          if (res.ID > 0) {
            let srno: any;
            if (this.SrNo == 0) {
              srno = res.ID;
            }
            else {
              srno = this.SrNo;
            }
            let CutOffFlag: number = 0;
            if ($('#id_EnableDisableCutoff').prop('checked')) {
              CutOffFlag = 1;
            }
            let dpid = this.PerDetForm.controls['Dipository'].value == "NSDL" ? "IN" + this.PerDetForm.controls['DPID'].value : this.PerDetForm.controls['DPID'].value;
            let request: any = {
              "IssueType": this.IssueType,
              "BIDID": "",// New Bid For pass Blank
              "ACTIONCODE": "N",  //N- New - M- Modification - D- Delete
              "APPLICATIONNO": "", //New - Pass blank Modification Or Delete - Existing APPLICANTNo Pass
              "APPLICANTNAME": this.PerDetForm.controls['Name'].value,
              "CATEGORY": this.BiddingDetailsForm.controls.Category.value,
              "CHEQUEAMOUNT": this.UpiAmount,
              "COMPANY_ID": this.CompId,
              "DPID": dpid,
              "CLIENTID": this.PerDetForm.controls['ClientID'].value,
              "DPType": this.PerDetForm.controls['Dipository'].value,
              "PANNO": this.PerDetForm.controls['PAN'].value,
              "QUANTITY": this.BiddingDetailsForm.controls['TxtQuantity'].value,
              "RATE": this.BiddingDetailsForm.controls['txtPriceBand'].value,
              "SCRIPID": this.SCRIPID,
              "UPIID": this.PerDetForm.controls['UPIID'].value,
              "LOCATION": "",
              "BANKACCOUNT": "",
              "BANKCODE": "",
              "SERIES": "",
              "SrNo": srno,
              "SubBrokerCode": '',
              "EmpCode": '',
              "Message": "",
              "NONASBA": "",
              "ORDERNO": "",
              "BidFrom": "",
              "CreatedBy": this.G_ClientBasicInfoId,
              "MobileNo": this.PerDetForm.controls['Mob'].value,
              "CutOffFlag": CutOffFlag,
              "OrderSource": this.OrderSource,
            }
            this.ThankYouPageData = request;
            request = JSON.stringify(request);
            let inputdata: any = {
              data: (request)
            }
            console.log('SRno ' + srno);
            console.log('Inputdata ipo =' + request)
            this.iposervice.IPONCDBiding(inputdata, 'IPO').subscribe(res1 => {
              this.Loader.hide();
              if (res.Message.toLowerCase().includes('not authorized')) {
                let ngbModalOptions: NgbModalOptions = {
                  backdrop: 'static',
                  keyboard: false
                };
                this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
              }
              else {
                let r = JSON.parse((res1.Message));
                if (res1.ID > 0) {
                  if (r.ID > 0) {
                    this.ThankYouPageData.CompanyName = this.strCompanyName;
                    this.ThankYouPageData.ApplicationNo = r.Refference_No;
                    sessionStorage.setItem('jkhg$8fsdnL9Hg', JSON.stringify(this.ThankYouPageData));
                    this.router.navigateByUrl('ipo/thank-you');
                  }
                  else {
                    this.CallAlertModal(r.Message);
                  }
                }
                else {
                  this.CallAlertModal(r.Message);
                }
              }

            },
              err => {
                this.Loader.hide();
              });
          }
          else {
            this.Loader.hide();
            this.CallAlertModal(res.Message);
          }
        }
        else {
          this.Loader.hide();
          alert('Fail');
        }
      });
    } else {
      this.Loader.hide();
      this.CallAlertModal(`Amount must be less than ${this.maxPrice}`);
    }
  }
  BindNCDSeries(CompId) {
    this.iposervice.GetNCDSeries(CompId).subscribe(data => {
      let res = JSON.parse((data))
      this.lstNCDSeries = res.ArrayOfResponse;
    });
  }
  onSubmitBiddingDetails_NCD() {
    this.Loader.show();
    this.BiddingDetailsFormsubmitted_NCD = true;
    if (this.BiddingDetailsForm_NCD.invalid) {
      this.Loader.hide();
      return false;
    }
    else {
      let SrNo = this.SrNo;
      let FirstApplicant = this.PerDetForm.controls['Name'].value;
      let FirstApplicantPAN = this.PerDetForm.controls['PAN'].value;
      let Mobile = this.PerDetForm.controls['Mob'].value
      let Email = this.PerDetForm.controls['Email'].value
      let CreatedBy = null;
      let Status = "IND";
      let Address = null;
      let Pincode = null;
      let IPAddress = null;
      let Subbrokercode = this.SubbrokerCode;
      let EmpCode = this.EmpCode;
      let Group = null;

      let JsonData = {
        "SrNo": SrNo,
        "Subbrokercode": Subbrokercode,
        "FirstApplicant": FirstApplicant,
        "FirstApplicantPAN": FirstApplicantPAN,
        "Mobile": Mobile,
        "Email": Email,
        "Address": Address,
        "Pincode": Pincode,
        "CreatedBy": CreatedBy,
        "IPAddress": IPAddress,
        "Group": Group,
        "Status": Status,
        "EmpCode": EmpCode,
        "Mgrt_Source": this.OrderSource,
        "objClientDematDetail": [{
          "srno": this.G_DematDetailsid,
          "clientsrno": this.SrNo,
          "dpid": this.PerDetForm.controls['DPID'].value,
          "dptype": this.PerDetForm.controls['Dipository'].value,
          "clientid": this.PerDetForm.controls['ClientID'].value,
          "dpdefault": "1"
        }],
        "objClientUPIDet": [{
          "upiidsrno": this.G_IPOClientUPIIDid,
          "clientsrno": this.SrNo,
          "upidefault": "1",
          "upiid": this.PerDetForm.controls['UPIID'].value,
        }]
      }


      this.iposervice.SaveNdUpdateIPOClientBankDetails(JsonData).subscribe(res => {
        if (res != null) {
          this.SrNo = res.ID;
          let dpid = this.PerDetForm.controls['Dipository'].value == "NSDL" ? "IN" + this.PerDetForm.controls['DPID'].value : this.PerDetForm.controls['DPID'].value;
          if (this.UpiAmount_NCD <= this.maxPrice) {
            let request: any = {
              "IssueType": this.IssueType,
              "BIDID": "",// New Bid For pass Blank
              "ACTIONCODE": "N",  //N- New - M- Modification - D- Delete
              "APPLICATIONNO": "", //New - Pass blank Modification Or Delete - Existing APPLICANTNo Pass
              "APPLICANTNAME": this.PerDetForm.controls['Name'].value,
              "CATEGORY": "41",
              "CHEQUEAMOUNT": this.UpiAmount_NCD,
              "COMPANY_ID": this.CompId,
              // "DPID": this.PerDetForm.controls['DPID'].value,
              "DPID": dpid,
              "CLIENTID": this.PerDetForm.controls['ClientID'].value,
              "DPType": this.PerDetForm.controls['Dipository'].value,
              "PANNO": this.PerDetForm.controls['PAN'].value,
              "QUANTITY": this.BiddingDetailsForm_NCD.controls['NCD_Quentity'].value,
              "RATE": this.G_FaceValue,
              "SCRIPID": this.SCRIPID,
              "UPIID": this.PerDetForm.controls['UPIID'].value,
              "LOCATION": "",
              "BANKACCOUNT": "",
              "BANKCODE": "",
              "SERIES": this.BiddingDetailsForm_NCD.controls['NCD_Series'].value,
              "SrNo": this.SrNo,
              "SubbrokerCode": this.SubbrokerCode,
              "EmpCode": this.EmpCode,
              "Message": "",
              "NONASBA": "",
              "ORDERNO": "",
              "BidFrom": "",
              "CreatedBy": this.G_ClientBasicInfoId,
              "MobileNo": this.PerDetForm.controls['Mob'].value,
              "OrderSource": this.OrderSource
            }
            request = JSON.stringify(request);
            let inputdata: any = {
              data: (request)
            }
            this.iposervice.IPONCDBiding(inputdata, 'NCD').subscribe(res => {
              this.Loader.hide();
              if (res.Message.toLowerCase().includes('not authorized')) {
                let ngbModalOptions: NgbModalOptions = {
                  backdrop: 'static',
                  keyboard: false
                };
                this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
              }
              else {
                let r = JSON.parse((res.Message));
                if (res.ID > 0) {
                  if (r.ID > 0) {

                  }
                  this.CallIPOModal(r.Message);
                }
                else {
                  this.CallIPOModal(r.Message);
                }
              }

            });
          }
          else {
            this.GenerateNCDPDFForm();
          }
        }
        else {
          alert('Fail');
        }

      });
    }
  }
  onChangeNCDQuentity(val: string) {
    if (val != '') {
      this.UpiAmount_NCD = +val * (+this.G_FaceValue)
    }
    else {
      this.UpiAmount_NCD = 0;
    }
  }
  CallAlertModal(msg: any) {
    $("#AlertModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#AlertModalContent').text(msg);
  }
  CallIPOModal(msg: any) {
    $("#IPOModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#IPOModalContent').text(msg);
  }

  CallIPOSpecialModal(msg: any) {
    $("#IPOSpecialModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#IPOSpecialModalContent').text(msg);
  }

  BindModificationData(res) {
    try {
      this.Loader.show();
      if (res.length > 0) {
        const data = res[0];
        this.ExistingUser = true;
        setTimeout(() => {
          $('.CustomSelectCategory').val(data.CATEGORY).trigger('change');
          this.BiddingDetailsForm.controls.Category.setValue(data.CATEGORY);
          this.BiddingDetailsForm.controls.Category.disable();

          this.BiddingDetailsForm.controls.txtPriceBand.setValue(data.Price);

          this.BiddingDetailsForm.controls.TxtQuantity.setValue(data.Quantity);
          this.UpiAmount = data.Amount;
          this.UpiAmountPrev = data.Amount;
        }, 2500);
        if (data.CutOffFlag == 1) {
          $('#id_EnableDisableCutoff').prop('checked', true);
          this.BiddingDetailsForm.controls.txtPriceBand.disable();
        }
        else {
          $('#id_EnableDisableCutoff').prop('checked', false);
          this.BiddingDetailsForm.controls.txtPriceBand.enable();
        }
        this.PerDetForm.controls['PAN'].setValue(data.PANNo);
        this.PerDetForm.controls['PAN'].disable();
        this.PerDetForm.controls['Name'].setValue(data.FirstApplicant);
        this.PerDetForm.controls['Name'].disable();
        this.PerDetForm.controls['Mob'].setValue(data.MobileNo);
        this.PerDetForm.controls['Mob'].disable();
        this.PerDetForm.controls['Email'].setValue(data.Email);
        this.PerDetForm.controls['Email'].disable();
        this.BidId = data.BidID;
        this.ApplicationNo = data.ApplicationNo;
        this.SrNo = data.SrNo;
        this.SubbrokerCode = data.EmpCode;
        this.EmpCode = data.SubbrokerCode;
        this.PerDetForm.controls['Dipository'].setValue(data.DPType);
        this.PerDetForm.controls['Dipository'].disable();
        $('.clsDipository').val(data.DPType).trigger('change');
        let DPID: string = data.DPID;
        if (DPID.toString().includes('IN')) {
          DPID = DPID.toString().substring(2)
        }
        this.PerDetForm.controls['DPID'].setValue(DPID);
        this.PerDetForm.controls['DPID'].disable()
        this.PerDetForm.controls['ClientID'].setValue(data.ClientID);
        this.PerDetForm.controls['ClientID'].disable()
        this.PerDetForm.controls['UPIID'].setValue(data.UPIID);
        this.PerDetForm.controls['UPIID'].enable();
        this.BiddingDetailsForm_NCD.controls.NCD_Series.setValue(data.Series);
        this.BiddingDetailsForm_NCD.controls.NCD_Quentity.setValue(data.Quantity);
        $('.clsNCDSeries').val(data.Series).trigger('change');

        //this.Loader.hide();
      }
      var loaderInterval = setInterval(() => {
        let str = document.readyState;
        if (str == 'complete') {
          this.Loader.hide();
          clearInterval(loaderInterval)
        }
      }, 1000);
    }
    catch (e) {

    }
  }
  SendBidDataForModified() {
    try {
      let CutOffFlag: number = 0;
      if ($('#id_EnableDisableCutoff').prop('checked')) {
        CutOffFlag = 1;
      }
      let dpid = this.PerDetForm.controls['Dipository'].value == "NSDL" ? "IN" + this.PerDetForm.controls['DPID'].value : this.PerDetForm.controls['DPID'].value;
      let request: any = {
        "IssueType": this.IssueType,
        "BIDID": this.BidId,// New Bid For pass Blank
        "ACTIONCODE": this.IsNullOrEmpty(this.BidId) ? "N" : "M",  //N- New - M- Modification - D- Delete
        "APPLICATIONNO": this.ApplicationNo, //New - Pass blank Modification Or Delete - Existing APPLICANTNo Pass
        "APPLICANTNAME": this.PerDetForm.controls['Name'].value,
        "CATEGORY": this.BiddingDetailsForm.controls.Category.value,
        "CHEQUEAMOUNT": this.UpiAmount,
        "COMPANY_ID": this.CompId,
        "DPID": dpid,
        "CLIENTID": this.PerDetForm.controls['ClientID'].value,
        "DPType": this.PerDetForm.controls['Dipository'].value,
        "PANNO": this.PerDetForm.controls['PAN'].value,
        "QUANTITY": this.BiddingDetailsForm.controls['TxtQuantity'].value,
        "RATE": this.BiddingDetailsForm.controls['txtPriceBand'].value,
        "SCRIPID": this.SCRIPID,
        "UPIID": this.PerDetForm.controls['UPIID'].value,
        "LOCATION": "",
        "BANKACCOUNT": "",
        "BANKCODE": "",
        "SERIES": "",
        "SrNo": this.SrNo,
        "SubbrokerCode": this.SubbrokerCode,
        "EmpCode": this.EmpCode,
        "Message": "",
        "NONASBA": "",
        "ORDERNO": "",
        "BidFrom": "",
        "CreatedBy": this.G_ClientBasicInfoId,
        "MobileNo": this.PerDetForm.controls['Mob'].value,
        "CutOffFlag": CutOffFlag,
        "OrderSource": this.OrderSource,
      }
      request = JSON.stringify(request);
      let inputdata: any = {
        data: (request)
      }
      this.iposervice.IPONCDBiding(inputdata, 'IPO').subscribe(res => {
        this.Loader.hide();
        if (res.Message.toLowerCase().includes('not authorized')) {
          let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
        }
        else {
          let r = JSON.parse((res.Message));
          if (res.ID > 0) {
            if (r.ID > 0) {
              sessionStorage.removeItem('fbPxEvwQayKqnyUY/vuP9GtBLBew0RP');
            }
            this.CallIPOModal(r.Message);
          }
          else {
            this.CallAlertModal(r.Message);
          }
        }
      });
    }
    catch (e) {

    }
  }
  ValidatePattern(flag, e) {

    // if (flag == "PAN") {
    //   var reg = new RegExp(IsValidPAN);
    //   this.IsPANValid = reg.test(e.target.value);
    // }
    // if (flag == "Email") {
    //   var regEmail = new RegExp("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}");
    //   this.IsEmailValid = regEmail.test(e.target.value);
    // }
    if (flag == "Number") {
      const charCode = (e.which) ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }
    else if (flag == "NumberandCharc") {
      const k = (e.which) ? e.which : e.keyCode;
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));

    }
    else if (flag == "Chars") {

      const k = (e.which) ? e.which : e.keyCode;
      if ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32) {

      }
      else {
        e.preventDefault();
      }

    }
  }
  OnPaste(e) {
    e.preventDefault();
  }
  OnDrop(e) {
    e.preventDefault();
  }
  GeneratePDFForm() {

    this.Loader.show();
    try {
      this.BiddingDetailsFormsubmitted = true;
      if (this.BiddingDetailsForm.invalid) {
        this.Loader.hide();
        return false;
      }
      else {
        let clientid = this.PerDetForm.controls['Dipository'].value == "NSDL" ? "IN" + this.PerDetForm.controls['DPID'].value + this.PerDetForm.controls['ClientID'].value : this.PerDetForm.controls['ClientID'].value;
        const request = {
          "Company_Id": this.CompId,
          "IssueType": this.IssueType,
          "CreatedBy": this.CretaedBy,
          "SubBrokerCode": '',
          "LoginMode": this.LoginMode,
          "EmpCode": '',
          "IPAddress": "",
          "GenerateMode": "OFFLINE",
          "PrintType": '0',
          "ASBAType": '0',
          "CATEGORY": this.BiddingDetailsForm.controls.Category.value,
          "ListApplicationDetails": [
            {
              "SrNo": this.SrNo,
              "Quantity": this.BiddingDetailsForm.controls['TxtQuantity'].value,
              "Price": this.BiddingDetailsForm.controls['txtPriceBand'].value,
              "Amount": this.UpiAmount,
              //"ClientID": this.PerDetForm.controls['ClientID'].value,
              "ClientID": clientid,
              "UPIID": this.PerDetForm.controls['UPIID'].value,
              "BankCode": "",
              "LocationCode": "",
              "AccountNo": ""
            }
          ]
        }
        this.iposervice.GeneratePDFForm(request).subscribe((data) => {
          this.Loader.hide();
          if (data.ID == 1 && data.Message.includes('Success')) {
            try {
              const source = `data:application/pdf;base64,${data.FilePath}`;
              const link = document.createElement("a");
              link.href = source;
              link.download = `ApplicationForm_${new Date().getUTCDate()}.pdf`
              link.click();

              this.CallAlertModal('PDF form successfully generated');
            }
            catch (e) {
              this.CallAlertModal('Something went wrong, please try again later')
            }
          } else {
            this.CallAlertModal('PDF form not generated, please try again later');
          }
        });
      }
    }
    catch (e) {
      this.Loader.hide();
    }
  }

  GenerateNCDPDFForm() {

    this.Loader.show();
    try {
      this.BiddingDetailsFormsubmitted_NCD = true;
      if (this.BiddingDetailsForm_NCD.invalid) {
        this.Loader.hide();
        return false;
      }
      else {
        let clientid = this.PerDetForm.controls['Dipository'].value == "NSDL" ? "IN" + this.PerDetForm.controls['DPID'].value + this.PerDetForm.controls['ClientID'].value : this.PerDetForm.controls['ClientID'].value;
        const request = {
          "Company_Id": this.CompId,
          "IssueType": this.IssueType,
          "CreatedBy": this.CretaedBy,
          "SubBrokerCode": '',
          "LoginMode": this.LoginMode,
          "EmpCode": '',
          "IPAddress": "",
          "GenerateMode": "OFFLINE",
          "PrintType": '0',
          "ASBAType": '0',
          "ListApplicationDetails": [
            {
              "SrNo": this.SrNo,
              "Quantity": this.BiddingDetailsForm_NCD.controls['NCD_Quentity'].value,
              "Price": this.G_FaceValue,
              "Amount": this.UpiAmount_NCD,
              "ClientID": clientid,
              "UPIID": this.PerDetForm.controls['UPIID'].value,
              "BankCode": "",
              "LocationCode": "",
              "AccountNo": "",
              "Series": this.BiddingDetailsForm_NCD.controls['NCD_Series'].value,
            }
          ]
        }
        this.iposervice.GeneratePDFForm(request).subscribe((data) => {
          this.Loader.hide();
          if (data.ID == 1 && data.Message.includes('Success')) {
            try {
              const source = `data:application/pdf;base64,${data.FilePath}`;
              const link = document.createElement("a");
              link.href = source;
              link.download = `ApplicationForm_${new Date().getUTCDate()}.pdf`
              link.click();

              this.CallAlertModal('PDF form successfully generated');
            }
            catch (e) {
              this.CallAlertModal('Something went wrong, please try again later')
            }
          } else {
            this.CallAlertModal('PDF form not generated, please try again later');
          }
        });
      }
    }
    catch (e) {
      this.Loader.hide();
    }
  }
  GotoHome() {
    // window.location.href='/ipo/dashboard';
    this.router.navigateByUrl('/');
  }
}
