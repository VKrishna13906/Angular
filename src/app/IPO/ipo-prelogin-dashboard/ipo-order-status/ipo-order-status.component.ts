import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { IsValidMobile, IsValidOTP } from 'src/app/validation';
import { environment } from 'src/environments/environment';
import { CustomLoaderService } from '../../../services/custom-loader.service';
import { NotAuthorizedAlertComponent } from '../../not-authorized-alert/not-authorized-alert.component';
import { EncrdecrService } from './../../../Auth/encrdecr.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
declare var $: any;
@Component({
  selector: 'app-ipo-order-status',
  templateUrl: './ipo-order-status.component.html',
  styleUrls: ['./ipo-order-status.component.scss']
})
export class IpoOrderStatusComponent implements OnInit {
  CommonBaseHref: string = environment.CommonBaseHref;
  G_SrNo: number;
  G_COMPANY_ID: number;
  G_BidID: number;
  G_PANNo: string
  ClientFilterForm: FormGroup;
  ClientFilterFormSubmitted: boolean = false;
  CurrentStatus: string = "";
  IsApplicationInit: boolean = false;
  IsSubmitedToExchange: boolean = false;
  IsPanDpVerified: boolean = false;
  IsUPIAuth: boolean = false;
  IsApplicationAccepted: boolean = false;
  IsViewStatus: boolean = false;
  MobileForm: FormGroup;
  MobileFormsubmitted: boolean = false;
  OTPForm: FormGroup;
  OTPFormsubmitted: boolean = false;
  IsShowOTPForm: boolean = false;

  ClientAllData: any = [];
  LstCompanyData: any = [];
  LstApplicationNumberData: any = [];
  strCompanyName: string;
  BlockedAmount: string;
  InternalReferanceNumber: string;
  NoofQuantity: string;
  DateOfApplication: string;
  OrderCancelDate: string;
  IsShowOrderCancelDate: boolean = false;
  Category: string;
  IsShowIPOs: boolean = false;
  IsShowDetails: boolean = false;
  IsTrackIPO: boolean = true;
  G_IPOClientDataId: string = '';
  DisableOrder: boolean = true;
  IsResendOTPSuccess: boolean = false;
  IsMobile: boolean = false;
  OTP_CompanyName: string = "";
  IsShowPregress: boolean = true;
  ShowCancelOrder: boolean = true;
  modalRef?: BsModalRef;
  OtpInterval: any;
  ResendOtpTime: number =30;
  constructor(private fb: FormBuilder,
    private iposervice: IPOServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private Loader: CustomLoaderService,
    public DateFormatter: DatePipe,
    private EncrdecrService: EncrdecrService,
    private modalService: BsModalService,
    private hireasdkask :  JksdgfuehdnoService
  ) {
    this.ClientFilterForm = this.fb.group({
      CompanyName: ['', Validators.required],
      ApplicationNo: ['', Validators.required],
    });
    this.MobileForm = this.fb.group({
      MobileNo: ['', [Validators.required, Validators.pattern(IsValidMobile)]],
    });
    this.OTPForm = this.fb.group({
      OTP: ['', [Validators.required, Validators.pattern(IsValidOTP)]],
    });
  }

  ngOnInit() {

    this.Loader.show();
    this.SetViewPort(window.innerWidth);
    $('.MainBg').css('min-height', window.innerHeight - 64);
    if (!this.IsNullOrEmpty(sessionStorage.getItem('YKHkxDnoSoOe6PdTjKrqfm4z6'))) {
      this.G_IPOClientDataId = (sessionStorage.getItem('YKHkxDnoSoOe6PdTjKrqfm4z6'));
    }
    if (!this.IsNullOrEmpty(sessionStorage.getItem('KLJNiushegDHNiehf'))) {
      this.OTP_CompanyName = sessionStorage.getItem('KLJNiushegDHNiehf');
      sessionStorage.removeItem('KLJNiushegDHNiehf')
    }
    if (!this.IsNullOrEmpty(this.G_IPOClientDataId)) {
      this.getOrderStatus();
    } else {
      this.Loader.hide();
      $('#SearchClientModal').modal({
        backdrop: 'static',
        keyboard: false
      });
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.SetViewPort(event.target.innerWidth)
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
    $('select').select2();
    $('.CustomSelect0').on('change', (e: any) => this.onChangeCompany(e));
    $('.CustomSelect1').on('change', (e: any) => this.onChangeApplication(e));
  }
  get i() {
    return this.MobileForm.controls;
  }
  get j() {
    return this.OTPForm.controls;
  }
  get k() {
    return this.ClientFilterForm.controls;
  }
  onSubmitClientFilterForm() {
    this.Loader.show();

    this.ClientFilterFormSubmitted = true;
    if (this.ClientFilterForm.invalid) {
      this.Loader.hide();
      return false;
    } else {
      this.IsShowOTPForm = true;
      let COMPANY_ID = parseInt(this.ClientFilterForm.controls['CompanyName'].value);
      let ApplicationNo = this.ClientFilterForm.controls['ApplicationNo'].value;
      let ApplicationStatuData = this.ClientAllData.filter(atr => (atr.COMPANY_ID == COMPANY_ID && atr.ApplicationNo == ApplicationNo));
      if (ApplicationStatuData != null) {
        this.IsViewStatus = true;
        this.G_SrNo = ApplicationStatuData[0].SrNo;
        this.G_COMPANY_ID = ApplicationStatuData[0].COMPANY_ID;
        this.strCompanyName = ApplicationStatuData[0].CompanyName;
        this.BlockedAmount = ApplicationStatuData[0].Amount;
        this.InternalReferanceNumber = ApplicationStatuData[0].ApplicationNo;
        this.NoofQuantity = ApplicationStatuData[0].Quantity;
        this.DateOfApplication = ApplicationStatuData[0].DateOfApplication;
        this.OrderCancelDate = ApplicationStatuData[0].OrderCancelDate;
        switch (ApplicationStatuData[0].CATEGORY) {
          case 'IND':
            this.Category = "Retail";
            break;
          case 'SHA':
            this.Category = "Share Holder";
            break;
          case 'EMP':
            this.Category = "Employee";
            break;
          case 'POL':
            this.Category = "Policy Holder";
            break;
          case 'HNI':
            this.Category = "High Networth Individuals (HNI)";
            break;
        }
        if ((ApplicationStatuData[0].CATEGORY == 'IND' && parseInt(this.BlockedAmount) > 200000) || ApplicationStatuData[0].CATEGORY == 'HNI') {
          this.ShowCancelOrder = false;
        }
        else {
          this.ShowCancelOrder = true;
        }
        this.G_BidID = ApplicationStatuData[0].BidID;
        this.G_PANNo = ApplicationStatuData[0].PANNo;

        //#region Active Inactive Appliation Stage as per bid status
        this.CurrentStatus = ApplicationStatuData[0].BidStatus;
        if (this.CurrentStatus.toLowerCase() == "bid cancelled by client" || this.CurrentStatus.toLowerCase().includes('cancellation')) {
          this.IsShowOrderCancelDate = true;
        }
        else {
          this.IsShowOrderCancelDate = false;
        }
        if (this.CurrentStatus.toLowerCase() == "bid initiated" || this.CurrentStatus.toLowerCase() == "bid cancelled by client" || this.CurrentStatus.toLowerCase() == "pending for bid" || this.CurrentStatus.toLowerCase() == 'bid rejected' || this.CurrentStatus.toLowerCase().includes('cancellation')) {
          this.IsApplicationInit = true;
          this.IsSubmitedToExchange = false;
          this.IsPanDpVerified = false;
          this.IsUPIAuth = false;
          this.IsApplicationAccepted = false;
        }
        else if (this.CurrentStatus.toLowerCase() == "success bid" || this.CurrentStatus.toLowerCase() == "pan/dp mismatch") {
          this.IsApplicationInit = true;
          this.IsSubmitedToExchange = true;
          this.IsPanDpVerified = false;
          this.IsUPIAuth = false;
          this.IsApplicationAccepted = false;
        }
        else if (this.CurrentStatus.toLowerCase() == "upi mandate rejected due to other reason" || this.CurrentStatus.toLowerCase() == "status not received from exchange") {
          this.IsApplicationInit = true;
          this.IsSubmitedToExchange = true;
          this.IsPanDpVerified = true;
          this.IsUPIAuth = false;
          this.IsApplicationAccepted = false;
        }
        else if (this.CurrentStatus.toLowerCase() == "upi mandate pending" || this.CurrentStatus.toLowerCase() == "upi mandate declined by client") {
          this.IsApplicationInit = true;
          this.IsSubmitedToExchange = true;
          this.IsPanDpVerified = true;
          this.IsUPIAuth = true;
          this.IsApplicationAccepted = false;
        }
        else if (this.CurrentStatus.toLowerCase() == "upi mandate accepted") {
          this.IsApplicationInit = true;
          this.IsSubmitedToExchange = true;
          this.IsPanDpVerified = true;
          this.IsUPIAuth = true;
          this.IsApplicationAccepted = true;
        }
        else {
          this.IsApplicationInit = true;
          this.IsSubmitedToExchange = false;
          this.IsPanDpVerified = false;
          this.IsUPIAuth = false;
          this.IsApplicationAccepted = false;
        }
        let r = (ApplicationStatuData[0].IssueEndDate).split('T')[0];
        let rr = `${r}T${ApplicationStatuData[0].IssueAcceptanceTime}`;
        if (this.CurrentStatus.toLowerCase() == "bid cancelled by client" || this.CurrentStatus.toLowerCase() == 'bid rejected' || this.CurrentStatus.toLowerCase().includes('cancellation')) {
          this.IsShowPregress = false;
        }
        else {
          this.IsShowPregress = true;
        }
        if (+new Date(rr) >= +new Date()) {
          if (this.CurrentStatus.toLowerCase() == "bid cancelled by client" || this.CurrentStatus.toLowerCase() == 'bid rejected' || this.CurrentStatus.toLowerCase().includes('cancellation')) {
            this.DisableOrder = true;
          }
          else {
            this.DisableOrder = false;
          }

        }
        else {
          this.DisableOrder = true;
        }
        //#endregion
        this.Loader.hide();
      }
      else {
        this.DisableOrder = true;
        this.Loader.hide();
        this.IsViewStatus = false;
        this.CallAlertModal('Company Data not Found');
      }

    }
  }
  onSubmitMobileForm() {
    this.MobileFormsubmitted = true;
    if (this.MobileForm.invalid) {
      return;
    } else {
      this.IsShowOTPForm = true;
    }
    this.Loader.hide();
  }
  onSubmitOTPForm() {

    this.OTPFormsubmitted = true;
    if (this.OTPForm.invalid) {
      this.Loader.hide();
      return;
    } else {
      this.IsShowOTPForm = false;
      $('#SearchClientModal').modal('hide');
      this.getOrderStatus();
    }
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
  CheckNCDTime(IssueCloseTime, AcceptanceTime, Issue_CloseDate, EarlyCloserDate): boolean {
    let CurrentDate = new Date();

    var NCDCloseDate = new Date(Issue_CloseDate);
    var NCDEarlyCloserDate = new Date(EarlyCloserDate);

    var systemtime = CurrentDate.getHours() + ':' + CurrentDate.getMinutes();
    var SystemDate = new Date('01 Jan 1970 ' + systemtime); // 01 Jan 1970 this date hardecode because we only check time but date is require so we pass tis dummy date
    var NCDCloseTime = new Date('01 Jan 1970 ' + IssueCloseTime);
    var NCDAcceptanceTime = new Date('01 Jan 1970 ' + AcceptanceTime);
    var NCD_CloseTime;
    var NCD_CloseDate;
    if (NCDAcceptanceTime < NCDCloseTime) {
      NCD_CloseTime = NCDAcceptanceTime;
    }
    else {
      NCD_CloseTime = NCDCloseTime;
    }
    if (NCDEarlyCloserDate < NCDCloseDate) {
      NCD_CloseDate = NCDEarlyCloserDate;
    } else {
      NCD_CloseDate = NCDCloseDate;
    }
    var d = CurrentDate < NCD_CloseDate;
    if (CurrentDate.getHours() > 12) {
      return SystemDate < NCD_CloseTime && CurrentDate < NCD_CloseDate;
    } else {
      return true;
    }

  }
  onChangeCompany(event: any) {
    this.Loader.show();
    let COMPANY_ID = parseInt(event.target.value);
    this.LstApplicationNumberData = this.ClientAllData.filter(atr => (atr.COMPANY_ID == COMPANY_ID));
    this.Loader.hide();
    console.log('Application no =>' + this.LstApplicationNumberData)
    this.ClientFilterForm.controls['CompanyName'].setValue(event.target.value);
    if (this.LstApplicationNumberData.length == 1) {
      let val = this.LstApplicationNumberData[0].ApplicationNo;
      this.ClientFilterForm.controls['ApplicationNo'].setValue(val);
      setTimeout(() => {
        $('.CustomSelect1').val(val).trigger('change');
      }, 1000);
    }
    else {
      this.ClientFilterForm.controls['ApplicationNo'].setValue('');
      setTimeout(() => {
        $('.CustomSelect1').val('').trigger('change');
      }, 1000);
    }


  }
  onChangeApplication(event: any) {

    this.Loader.show();
    let ApplicationNumber = event.target.value;
    console.log('ApplicationNumber');
    console.log(ApplicationNumber);
    this.ClientFilterForm.controls['ApplicationNo'].setValue(event.target.value);
    this.Loader.hide();
  }


  OnsubmitModifyOrder() {
    this.Loader.show();
    if (!this.IsNullOrEmpty(this.k.CompanyName.value) && !this.IsNullOrEmpty(this.k.ApplicationNo.value) && this.ClientFilterFormSubmitted) {

      let COMPANY_ID = parseInt(this.k.CompanyName.value);
      let ApplicationNo = this.k.ApplicationNo.value;
      let OrderData = this.ClientAllData.filter(atr => (atr.COMPANY_ID == COMPANY_ID && atr.ApplicationNo == ApplicationNo));

      if (OrderData != null) {
        this.Loader.hide();
        let jsonString = JSON.stringify(OrderData);
        const json = (jsonString);
        sessionStorage.setItem('ROkA37dvLoPsXUyxv0BysfIn0', json);
        sessionStorage.setItem('fbPxEvwQayKqnyUY/vuP9GtBLBew0RP', ('true'));
        sessionStorage.setItem('HqNlocCKACjWB+JZNeOUa4iuhxO', (OrderData[0].COMPANY_ID));
        this.router.navigateByUrl('ipo/applyIPO');

      }
      else {
        this.Loader.hide();
        console.log('Company Data not Found');
      }
    } else {
      this.Loader.hide();
      this.CallAlertModal('Please select valid Company or Application No.');
    }

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

  GetOTP(para: string, isResend?: string) {
    this.Loader.show();
    if (para == "V") {
      this.OTPFormsubmitted = true;
      if (this.OTPForm.invalid) {
        this.Loader.hide();
        return false;
      }
      else {
        this.OTPVerification(para, isResend);
      }
    }
    if (para == "G") {
      this.MobileFormsubmitted = true;
      if (this.MobileForm.invalid) {
        this.Loader.hide();
        return false;
      }
      else {
        this.OTPVerification(para, isResend);
      }
    }
  }
  OTPVerification(para: string, isResend?: string) {
    let otpvalue = "0";
    if (para == "V") {
      otpvalue = this.OTPForm.controls["OTP"].value;
    }
    let request1 = {
      Name: "",
      SMS_TEMPLATE_TYPE: "OTPBased_verification",
      MobileNo: this.MobileForm.controls["MobileNo"].value,
      OTPFlag: para,
      OTP: otpvalue,
      IPO_NAME: this.OTP_CompanyName
    };
    let DataBody1 = JSON.stringify(request1);
    this.iposervice.GenerateMobileOTP(DataBody1).subscribe((resdata: any) => {
      let res = JSON.parse((resdata))
      let rr = res.ArrayOfResponse[0];
      if (rr.status_code == "00") {
        if (para == "G") {
          this.ResendOtpTime = 30;
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
          this.onSubmitOTPForm();
        }
      } else {
        this.CallAlertModal(rr.description);
        this.j.OTP.setValue("");
        this.Loader.hide();
      }
      //this.Loader.hide();
    });
  }
  ResendOtpInterval(){
    this.OtpInterval = setInterval(() => {
      this.ResendOtpTimer();
    }, 1000);
  }
  ResendOtpTimer() {
    this.ResendOtpTime =  this.ResendOtpTime - 1;
    // console.log("session Time", this.SessionTime);
    if(this.ResendOtpTime == 0 ){
      $(".res").removeClass("act").prop("disabled", false);
      clearInterval(this.OtpInterval)
    //  if(this.otpRequestFrom == 'NPSOTP'){

    //  }
    }
  }
  getOrderStatus() {
    
    try {
      let SrNo = this.G_IPOClientDataId;
      if (SrNo == '') {
        SrNo = "0";
      }
      let MobileNo = this.MobileForm.controls['MobileNo'].value;

      let request: any = {
        "SrNo": SrNo,
        "MobileNo": MobileNo,
        "PANNo": null,
        "ClientCode":""
      };
      //request = JSON.stringify(request);
      let inputdata: any = {
        data: this.hireasdkask.setPageNotFound(JSON.stringify(request))
      }
      this.iposervice.IPONCDOrderStatus(inputdata).subscribe(res => {
        debugger
        this.Loader.hide();
        if (res.Message.toLowerCase().includes('not authorized')) {
          let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
        }
        else{
          if (res.ID > 0) {
            this.ClientAllData = JSON.parse(this.hireasdkask.getPageNotFound(res.Message));
            this.LstCompanyData = [];
            let filteredArr = this.ClientAllData.reduce((acc, current) => {
              const x = acc.find(item => item.COMPANY_ID === current.COMPANY_ID);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
            filteredArr.forEach((t: any) => {
              var data = { 'COMPANY_ID': t.COMPANY_ID, 'CompanyName': t.CompanyName };
              this.LstCompanyData.push(data);
            });
            if (!this.IsNullOrEmpty(sessionStorage.getItem('E3JezQHPouE9YDaMhhP'))) {
              const CompanyId = +(sessionStorage.getItem('E3JezQHPouE9YDaMhhP'));
              sessionStorage.setItem('HqNlocCKACjWB+JZNeOUa4iuhxO', sessionStorage.getItem('E3JezQHPouE9YDaMhhP'));
              sessionStorage.removeItem('E3JezQHPouE9YDaMhhP');
              let orderComp = this.LstCompanyData.filter(a => a.COMPANY_ID == CompanyId);
              if (orderComp.length == 0) {
                this.CallIPOErrModal();
                this.Loader.hide();
              }
              else {
                setTimeout(() => {
                  $('.CustomSelect0').val(CompanyId).trigger('change');
                  this.Loader.hide();
                }, 1000);
              }
            }
            else {
              this.Loader.hide();
            }
          }
          else {
            if (!this.IsNullOrEmpty(sessionStorage.getItem('E3JezQHPouE9YDaMhhP'))) {
              sessionStorage.setItem('HqNlocCKACjWB+JZNeOUa4iuhxO', sessionStorage.getItem('E3JezQHPouE9YDaMhhP'));
              sessionStorage.removeItem('E3JezQHPouE9YDaMhhP')
            }
            this.CallIPOErrModal();
            this.Loader.hide();
          }
        }
          
      });
    }
    catch (e) {
      this.Loader.hide();
    }
  }
  CallIPOErrModal() {
    let ed = sessionStorage.getItem('DFJlksjfiZuOfT2H');
    if (+new Date(ed) >= +new Date()) {
      $("#IPOErrorModal").modal({
        backdrop: 'static',
        keyboard: false
      });
    }
    else {
      $("#IPOErrorModalCloseIssue").modal({
        backdrop: 'static',
        keyboard: false
      });
    }
    sessionStorage.removeItem('DFJlksjfiZuOfT2H');
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
  OnsubmitCancelOrder() {
    try {

      this.Loader.show();
      if (!this.IsNullOrEmpty(this.k.CompanyName.value) && !this.IsNullOrEmpty(this.k.ApplicationNo.value) && this.ClientFilterFormSubmitted) {

        let COMPANY_ID = parseInt(this.k.CompanyName.value);
        let ApplicationNo = this.k.ApplicationNo.value;
        let OrderData = this.ClientAllData.filter(atr => (atr.COMPANY_ID == COMPANY_ID && atr.ApplicationNo == ApplicationNo));
        let dpid = OrderData[0].DPType == "NSDL" ? "IN" + OrderData[0].DPID : OrderData[0].DPID
        if (OrderData != null) {
          let request: any = {
            "IssueType": OrderData[0].IssueType,
            "BIDID": OrderData[0].BidID,// New Bid For pass Blank
            "ACTIONCODE": "D",  //N- New - M- Modification - D- Delete
            "APPLICATIONNO": OrderData[0].ApplicationNo, //New - Pass blank Modification Or Delete - Existing APPLICANTNo Pass
            "APPLICANTNAME": OrderData[0].FirstApplicant,
            "CATEGORY": OrderData[0].CATEGORY,
            "CHEQUEAMOUNT": OrderData[0].Amount,
            "COMPANY_ID": OrderData[0].COMPANY_ID,
            "DPID": dpid,
            //this.PerDetForm.controls['DPID'].value,
            "CLIENTID": OrderData[0].ClientID,
            "DPType": OrderData[0].DPType,
            "PANNO": OrderData[0].PANNo,
            "QUANTITY": OrderData[0].Quantity,
            "RATE": OrderData[0].Price,
            "SCRIPID": OrderData[0].SCRIPID,
            "UPIID": OrderData[0].UPIID,
            "LOCATION": "",
            "BANKACCOUNT": "",
            "BANKCODE": "",
            "SERIES": "",
            "SrNo": OrderData[0].SrNo,
            "SubbrokerCode": OrderData[0].SubBrokerCode,
            "EmpCode": OrderData[0].EmpCode,
            "Message": "",
            "NONASBA": "",
            "ORDERNO": "",
            "BidFrom": "",
            "CreatedBy": "",
            "MobileNo": OrderData[0].MobileNo
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
            else{
              let r = JSON.parse((res.Message));
              if (res.ID > 0) {
                if (r.ID > 0) {
                  sessionStorage.removeItem('fbPxEvwQayKqnyUY/vuP9GtBLBew0RP');
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
          this.Loader.hide();
          this.CallIPOModal('Company Data not Found');
        }
      } else {
        this.Loader.hide();
        this.CallAlertModal('Please select valid Company or Application No.');
      }

    }
    catch (e) {

    }
  }
  ValidatePattern(flag, e) {

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
  GotoHome() {
    // window.location.href='/ipo/dashboard';
    this.router.navigateByUrl('/');
  }
  CallIPOModalApply() {
    $("#IPOModalApply").modal({
      backdrop: 'static',
      keyboard: false
    });
    // $('#lblipocompany').text(msg);
  }

}
