import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EncrdecrService } from 'src/app/Auth/encrdecr.service';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { NotAuthorizedAlertComponent } from '../../not-authorized-alert/not-authorized-alert.component';
declare var $: any;
import * as fs from 'file-saver';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from '../../../validation';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: "app-order-placement",
  templateUrl: "./order-placement.component.html",
  styleUrls: ["./order-placement.component.css"],
})
export class OrderPlacementComponent implements OnInit {
  heading: string = "Enter Order Details";
  link: string = 'ipo';
  flag: any = '1';
  cutoff_flag: any;
  ArrBasicDetails: any[] = [];
  ClientDPID: string;
  ClientID: string;
  ClientUPIId: string = '';
  ASBAAccountNo: string = '';
  UpperPriceBand: any = 0;
  LowerPriceBand: number = 0;
  BidLot: any = 0;
  CompId: number = 0;
  clientDetails: any[] = [];
  details: any[] = [];
  DiscountDetails: any[] = [];
  selectedCategory: string = '';
  TrinityFlag: string = 'N';
  IPO_CurrentListData: any[] = [];
  ArrCategory: any[] = [];
  ArrClientData: any[] = [];
  TotalIpoSize: any = 0;
  modalRef?: BsModalRef;
  ArrMonthName = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  cutflag: any;
  CategoryData: any[] = [];
  UPIIDName: string = '';
  UPiIdExtension: string = ''
  extension: string = ''
  SelectedValue;
  UPIHandlerList: any[] = [];
  UPIForm: FormGroup;
  UPIFormsubmitted: boolean = false;
  ////// Bidding ///
  counter1: number = 1;
  totalBidAmount: number = 0;
  BidCount: number = 1;
  DisableCuttoff: boolean = false;
  BidPrice: number = 0;
  isChecked: boolean = true;
  category: string;
  discountPrize: number = 0;
  maxPrice: number = 200000;
  MaxQuantity: number = 10000000;
  BidDetailsForm: FormGroup;
  IsForModify: boolean = false;
  IsAllowAddBid: boolean = true;
  UPIFormSubmitted: boolean = false;
  isAsBa: boolean;
  OldAmount: number = 0;
  IsFedRadio: boolean;
  Isselectupi: boolean = false;
  Isseletedradio: string = '';
  IscatagoryChanges: boolean = false;
  bindcategory: string = '';
  checkRadioButton: boolean;
  ShowBid : boolean =true;
  disRadio : string;
  dataValue : any;
  allowCutoff : number = 0;
  constructor(private EncrdecrService: EncrdecrService,
    private router: Router,
    private route: ActivatedRoute,
    private iposervice: IPOServiceService,
    private Loader: CustomLoaderService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private hireasdkask: JksdgfuehdnoService) {
    this.UPIForm = this.fb.group({
      upi: ['', [Validators.required]],
      UPIHandler: ['', [Validators.required]]
    })
    this.BidDetailsForm = this.fb.group({
      BidForm: new FormArray([]),
    });
  }
  get a() {
    return this.BidDetailsForm.controls;
  }
  get b() {
    return this.a.BidForm as FormArray;
  }
  get BidDetailsFormGroup() {
    return this.b.controls as FormGroup[];
  }
  ngOnInit() {
    debugger
    this.Loader.show();
    let pan = sessionStorage.getItem('gjhfHunj#n&fdgh'); //'DDJPS6803R' //
    
    this.disRadio = sessionStorage.getItem("kfrisnekfmcejfem");

    this.dataValue = sessionStorage.getItem("kfnekfmcejfem");

    if (sessionStorage.getItem('dfsfsefcdvgdrter6456dg') != null && sessionStorage.getItem('dfsfsefcdvgdrter6456dg') != undefined) {
      this.allowCutoff = +sessionStorage.getItem('dfsfsefcdvgdrter6456dg');
    }

    let d = sessionStorage.getItem('mhsd#d@l;d*g#hjb');
    let r = JSON.parse(d);
    if(this.dataValue == null || this.dataValue == '0')
    {
      this.checkRadioButton = true;
    }
    else if(r.objIPOClientPD[0].TrinityFlag == 'N')
    {
      this.checkRadioButton = true;
    }
    else{
      this.checkRadioButton = false;
    }
    sessionStorage.removeItem('kfnekfmcejfem');

    if (isNullOrUndefined(sessionStorage.getItem('uytewknc'))) {
      sessionStorage.setItem('uytewknc', ('jgas'));
    }
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
    $(document).keyup(function(e) {
      if(e.keyCode==13){
          if(!$(e.target).closest('.modal fade in').length) {
              $('.modal').each(function(){
                $('.modal').modal('hide');
             });
          }
      }
    });
    debugger
    //this.OnChangeRadio(1);
    if (pan != null && pan != undefined && pan != '') {
      this.ASBAAccountNo = sessionStorage.getItem('buvbe#jbY');
      let b = sessionStorage.getItem('cfhf5@6nS$vxhb=');
      if (b != null && b != undefined && b != '') {
        let flag = (b);
        if (flag != null && flag != undefined && flag != '') {
          if (flag == "N") {
            this.TrinityFlag = "N";
          }
          else {
            this.TrinityFlag = "Y";
          }
          let cid: any = sessionStorage.getItem('nsd#d@l;d*g#hjb');

          if (cid != undefined && cid != null) {
            cid = cid;
            let d = sessionStorage.getItem('cd&jdk#2R5nk4@jfs');
            if (d != undefined && d != null) {
              this.IPO_CurrentListData = JSON.parse(d);
              let data = this.IPO_CurrentListData.find(arr => arr.COMPANY_ID == cid);
              console.log(JSON.stringify(data))
              if (data != undefined) {
                let bd: any = {};
                bd.COMPANY_NAME = data.COMPANY_NAME;
                bd.LowerPriceBand = data.LowerPriceBand;
                bd.UpperPriceBand = data.UpperPriceBand;
                bd.BidLot = data.BidLot;
                bd.IssueStartDateDisplay = data.IssueStartDateDisplay;
                bd.IssueEndDateDisplay = data.IssueEndDateDisplay;
                bd.COMPANY_ID = data.COMPANY_ID;
                bd.CompanyURL = data.CompanyURL;
                bd.TotalSize = data.TotalSize;
                bd.DraftProsepectNotePath = data.DraftProsepectNotePath;
                this.TotalIpoSize = data.TotalSize;
                this.ArrBasicDetails.push(bd);
                this.UpperPriceBand = data.UpperPriceBand;
                this.LowerPriceBand = data.LowerPriceBand;
                this.BidLot = data.BidLot;
                this.CompId = data.COMPANY_ID;
                let discount: any = {
                  "ind": Number(data.discount),
                  "emp": Number(data.EmployeeDiscount),
                  "pol": Number(data.PolicyHolderDiscount),
                  "sha": Number(data.ShareHolderDiscount)
                };
                this.DiscountDetails.push(discount);
              }
            }

            this.GetCategories(cid);
            debugger
            if (sessionStorage.getItem('gjh$jbLjk') == "0") {
              if (sessionStorage.getItem('gjh$jbLjk2r2') == '1') {
                let u: any = sessionStorage.getItem('dfsd*sdfsd$dg=');
                if (u != undefined && u != null && u != '') {
                  let r = JSON.parse(u);
                  this.ClientUPIId = r.name + r.handler;
                }
              }
              else {
                let d = sessionStorage.getItem('mhsd#d@l;d*g#hjb');
                if (d != undefined && d != null) {
                  let r = JSON.parse(d);
                  this.clientDetails = r;
                  if (r != null) {
                    if (r.objUPIDet != null && r.objUPIDet.length > 0) {
                      this.ClientUPIId = r.objUPIDet[0].UPIID;
                    }
                  }
                }
              }
            }
            else {
              let d = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
              if (d != undefined && d != null) {
                let r = JSON.parse(d);
                this.ClientUPIId = r.UPIID;
                this.bindcategory = r.CATEGORY;
              }
              else {
                let u: any = sessionStorage.getItem('dfsd*sdfsd$dg=');
                if (u != undefined && u != null && u != '') {
                  let r = JSON.parse(u);
                  this.ClientUPIId = r.name + r.handler;
                }
              }
            }
            // sessionStorage.setItem("kfnekfmcejfem", "1");
            if (!isNullOrUndefined(sessionStorage.getItem('hasdfhuirec'))) {
              let data = JSON.parse((sessionStorage.getItem('hasdfhuirec')));
              if (data.ASBAType == 1) {
                this.isAsBa = true;
              } else {
                this.isAsBa = false;
              }
              sessionStorage.setItem('dfsd*sdfsasba=', (JSON.stringify(this.isAsBa)));
            }
            debugger
            if (this.TrinityFlag == 'Y') {
              sessionStorage.setItem("kfnekfmcejfem", "0");
              if(this.dataValue != '1')
              {                
              this.UPIForm.controls['upi'].disable();
              this.UPIForm.controls['UPIHandler'].disable();
              }
            } else {
              sessionStorage.setItem("kfnekfmcejfem", "1");
            }
            this.iposervice.IPOFillDetails('', this.CompId, 'UPIHandlerList').subscribe((res) => {
              let data = JSON.parse((res))
              if (data != null) {
                if (data.ArrayOfResponse.length > 0) {
                  this.UPIHandlerList = data.ArrayOfResponse;
                  this.UPIHandlerList.map(arr => {
                    arr.TEXTFIELD = (arr.TEXTFIELD).toLowerCase();
                  })
                  if (this.ClientUPIId != '') {
                    let u = this.ClientUPIId.split('@');
                    this.k.upi.setValue(u[0]);
                    this.SelectedValue = `@${u[1]}`;
                    let r = this.UPIHandlerList.find(a => a.TEXTFIELD == this.SelectedValue);
                    if (r != undefined && r != null) {
                      // $('.CustomSelect0').val(r.VALUEFIELD).trigger('change');
                      this.k.UPIHandler.setValue(r.VALUEFIELD);
                      this.Isselectupi = true;
                      // $('.CustomSelect0').select2().on('change', (e: any) => this.onChangeHandler(r.VALUEFIELD));
                    }
                    else {
                      this.k.upi.setValue('');
                      $('.CustomSelect0').val('').trigger('change');
                    }
                  }
                  else {
                    this.k.upi.setValue('');
                    $('.CustomSelect0').val('').trigger('change');
                  }
                  this.BindNameAndExtension();
                }
              }
            })
            this.IsForModify = false;
            if(sessionStorage.getItem('pshreuuddjkaeun') == null)
            {              
            sessionStorage.removeItem('pReV#uihfenkj&*d');
            }
            this.addBid();
            if (sessionStorage.getItem('gjh$jbLjk') == "0") {
              sessionStorage.removeItem('nsd#d@l;d*g#hjb222');
            }
            debugger
            let b = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
            if (b != null && b != undefined && b != '') {
              this.IsAllowAddBid = false;
              let d: any = JSON.parse(b);
              console.log(d)
              if (d.ASBAType == 1) {
                let arrASBA = d.asba.filter(a => a.ActionCode != "D");
                if (arrASBA.length > 0) {
                  this.BidCount = arrASBA.length;
                }
                let pd = arrASBA.sort((a, b) => a.asbaid - b.asbaid);
                this.addBid("1");
                let ArrPrevAmount: any[] = [];
                for (let i = 0; i < this.BidCount - 1; i++) {
                  let rr = this.b.controls[i];
                  if (this.bindcategory != "HNI") {
                    if (pd[i].CutOffFlag == 1) {
                      pd[i].CutOffFlag = true;
                    }
                    else {
                      pd[i].CutOffFlag = false;
                    }
                  }
                  else {
                    pd[i].CutOffFlag = false;
                  }

                  rr.patchValue({
                    bidno: pd[i].NoofLotsBid1,
                    price: pd[i].Rate,
                    cbx: pd[i].CutOffFlag,
                    TotalBidAmount: pd[i].Amount,
                    NoofLots: pd[i].BidLot,
                    bidid: pd[i].BidId,
                    asbaid: pd[i].asbaid
                  });
                  ArrPrevAmount.push(pd[i].Amount);
                }
                sessionStorage.setItem('pReV#uihfenkj&*d', (JSON.stringify(ArrPrevAmount)))
                console.log('Placement-Amount=' + sessionStorage.getItem('pReV#uihfenkj&*d'))
              }
              else {
                let rr = this.b.controls[0];
                if (this.bindcategory != "HNI") {
                  if (d.CutOffFlag == 1) {
                    d.CutOffFlag = true;
                  }
                  else {
                    d.CutOffFlag = false;
                  }
                }
                else {
                  d.CutOffFlag = false;
                }
                rr.patchValue({
                  bidno: d.totalLot,
                  price: d.Price,
                  cbx: d.CutOffFlag,
                  TotalBidAmount: d.Amount,
                  NoofLots: d.BidLot,
                });
                let ArrPrevAmount: any[] = [];
                ArrPrevAmount.push(d.Amount);
                sessionStorage.setItem('pReV#uihfenkj&*d', (JSON.stringify(ArrPrevAmount)))

              }
            }
            else if (sessionStorage.getItem('gjh$jbLjk2r2') == '1') {
              this.IsForModify = true;
              this.IsAllowAddBid = true;
              let pd: any = sessionStorage.getItem('fdfsdf*%gsdfhdf=2g2');
              if (pd != undefined && pd != null) {
                pd = (pd)
                pd = JSON.parse(pd);
                if (pd.length > 0) {
                  this.BidCount = pd.length
                }
                this.addBid("1");
                for (let i = 0; i < this.BidCount - 1; i++) {
                  let rr = this.b.controls[i];
                  if (this.bindcategory != "HNI") {
                    if (pd[i].CutOffFlag == 1) {
                      pd[i].CutOffFlag = true;
                    }
                    else {
                      pd[i].CutOffFlag = false;
                    }
                  }
                  else {
                    pd[i].CutOffFlag = false;
                  }
                  rr.patchValue({
                    bidno: pd[i].NoofLotsBid1,
                    price: pd[i].bidPriceBid1,
                    cbx: pd[i].CutOffFlag,
                    TotalBidAmount: pd[i].totalBidAmountBid1,
                    NoofLots: pd[i].BidLot,
                  });
                }
              }
            }
            else {
              this.IsAllowAddBid = true;
              let r: any = this.b.controls[0];
              if (this.TrinityFlag == 'Y') {
                r.controls.price.setValue('');
              }
              else {
                r.controls.price.setValue(this.UpperPriceBand);
              }
            }
          }
        }
        else {
          this.Loader.hide();
          this.CallAlertModal('Client details not found.');
          this.router.navigate(['/ipo'], { relativeTo: this.route });
        }
      }
      else {
        this.Loader.hide();
        if (sessionStorage.getItem('gjh$jbLjk') == '0') {
          this.CallAlertModal('Client details not found.');
        }
        this.router.navigate(['/ipo'], { relativeTo: this.route });
      }
    }
    else {
      this.Loader.hide();
      this.router.navigate(['/'], { relativeTo: this.route });
    }
    if (isNullOrUndefined(sessionStorage.getItem('dfsd*sdfsd$dg='))) {
      this.IsFedRadio = this.TrinityFlag == 'Y' ? true : false;
    }
    else{
      this.OnChangeRadio(this.dataValue);
      this.onChangeUPIId(1);
      this.onChangeHandler(1);

    }
    console.log("ngonint IsFedRadio ==" + this.IsFedRadio + " ngonitTrinityFlag == "+ this.TrinityFlag + " isasba="+ this.isAsBa + "this.checkRadioButton: " + this.checkRadioButton)
  }

  get k() {
    return this.UPIForm.controls;
  }
  GetCategories(cid) {
    debugger
    if (cid != 0) {
      this.iposervice.IPOFillDetails('', cid, 'IPOINVESTORCATEGORY').subscribe((resData) => {
        debugger
        let data = JSON.parse((resData))
        if (data.Message.toLowerCase().includes('not authorized')) {
          let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
          this.Loader.hide();
        }
        else {
          if (data != null) {
            if (data.ArrayOfResponse != null) {
              let rr = data.ArrayOfResponse;
              rr.map(arr => {
                if (arr.TEXTFIELD == "INDIVIDUAL") {
                  arr.TEXTFIELD = "RETAIL";
                }
              });
              this.ArrCategory = rr;
              let CategoryData = rr;
              this.ArrCategory[0].selected = true;
              CategoryData.map(c => {
                c.disabled = false;
                let rr: any = {};
                let cat = c.VALUEFIELD.toLowerCase();
                if (cat in this.DiscountDetails[0]) {
                  let val: any = 0;
                  Object.entries(this.DiscountDetails[0]).forEach(([key, value]) => {
                    if (key == cat) {
                      val = value;
                    }
                  });
                  rr.name = c.TEXTFIELD;
                  rr.value = val;
                  if (rr.value != 0) {
                    this.CategoryData.push(rr)
                  }
                }
              });
              if (this.TrinityFlag == "N") {
                this.ArrCategory = this.ArrCategory.filter(s => (s.VALUEFIELD.toLowerCase() == 'ind' || s.VALUEFIELD.toLowerCase() == 'sha' || s.VALUEFIELD.toLowerCase() == 'emp' || s.VALUEFIELD.toLowerCase() == 'pol' || s.VALUEFIELD.toLowerCase() == 'hni'));
              }
              else {
                let d = sessionStorage.getItem('mhsd#d@l;d*g#hjb');
                if (d != undefined && d != null) {
                  let rr = JSON.parse((d));
                  let pd = rr.objIPOClientPD;
                  let Status = (pd[0].Status).toLowerCase();
                  if (Status != 'individual' && Status != 'huf' && Status != 'nre' && Status != 'nro') {
                    this.ArrCategory = this.ArrCategory.filter(s => (s.VALUEFIELD.toLowerCase() == 'hni'));
                  }
                  else {
                    this.ArrCategory = this.ArrCategory.filter(s => (s.VALUEFIELD.toLowerCase() == 'ind' || s.VALUEFIELD.toLowerCase() == 'sha' || s.VALUEFIELD.toLowerCase() == 'emp' || s.VALUEFIELD.toLowerCase() == 'pol' || s.VALUEFIELD.toLowerCase() == 'hni'));
                  }
                }
              }
              if (isNullOrUndefined(sessionStorage.getItem('sfjsgueiid'))) {
                this.setCategory(this.ArrCategory[0]);
              }
              if (sessionStorage.getItem('gjh$jbLjk') == "0") {
                sessionStorage.removeItem('nsd#d@l;d*g#hjb222');
              }
              let b = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
              if (b != null && b != undefined && b != '') {
                let d: any = JSON.parse((b));
                this.ArrCategory.map((arr, i) => {
                  let c = d.CATEGORY;
                  if (arr.VALUEFIELD == c) {
                    arr.selected = true;
                    this.selectedCategory = this.ArrCategory[i].VALUEFIELD
                    this.setCategory(this.ArrCategory[i]);
                  }
                  arr.disabled = true;
                })
              }
              else if (sessionStorage.getItem('gjh$jbLjk2r2') == '1') {
                let c = sessionStorage.getItem('gdfgg(%fgshgd=2f2');
                if (c != null && c != undefined && c != '') {
                  let cat = JSON.parse((c));
                  this.ArrCategory.map((arr, i) => {
                    if (arr.VALUEFIELD == cat.VALUEFIELD) {
                      arr.selected = true;
                      this.selectedCategory = this.ArrCategory[i].VALUEFIELD
                      this.setCategory(this.ArrCategory[i]);
                    }
                  })
                }
              }
              this.Loader.hide();
            }
            else {
              this.Loader.hide();
            }
          }
          else {
            this.Loader.hide();
          }
        }
      },
        err => {
          this.Loader.hide();
        });
    }
  }
  // SelectedCategory(event) {
  //   this.selectedCategory = event;
  // }
  OnClickReviewOrder() {
    debugger
    // this.CallAlertModal("trinityFlag: "+ this.TrinityFlag)
    if (this.TrinityFlag == 'N') {
      //this.CallAlertModal("trinityFlagN: "+ this.TrinityFlag)
      this.cutoff_flag = this.cutflag////////added by adarsh
      if (this.cutoff_flag == 'Y') {
        let u: any = sessionStorage.getItem('dfsd*sdfsd$dg=');
        if (u != undefined && u != null && u != '') {
          let m = (u);
          let r = JSON.parse(m);
          if (r.name == '' || r.handler == '') {
            this.CallAlertModal('Invalid UPI ID. Please enter a valid UPI ID.')
          }
          else {
            let regex: RegExp = /^[\w.-]{3,20}$/;
            if (regex.test(r.name)) {
              let uk = sessionStorage.getItem('ujpfIutj#o&kegn');
              let nk = sessionStorage.getItem('njefOutj#o&kegn');
              let ut = sessionStorage.getItem('L2D3506kIHSk3E0');
              if (ut != undefined && ut != null) {
                let ut2 = (ut);
                if (ut2 == '3') {
                  if (uk != undefined && uk != null && uk != '') {
                    let request: any = {
                      "encryptedKey": uk,
                      "clientcode": `${r.name}${r.handler}`
                    }
                    request = JSON.stringify(request);
                    this.iposervice.GetValidateUPI_SSO(request).subscribe(res => {
                      if (res.ID == 1) {
                        this.GoToOrderPlacement();
                      }
                      else {
                        this.CallAlertModal(res.Message);
                      }
                    })
                  }
                  else if (nk != undefined && nk != null && nk != '') {
                    this.GoToOrderPlacement();
                  }
                  else {
                    this.CallAlertModal('Your token has been expired. Please login again.')
                  }
                }
                else {
                  this.GoToOrderPlacement();
                }
              }
            }
            else {
              this.CallAlertModal('Invalid UPI ID. Please enter a valid UPI ID.')
            }
          }
        }
      }
      else {
        alert('Biding time is exceeded')
        this.router.navigate(['/ipo'], { relativeTo: this.route });
      }
    }
    else {

      this.GoToOrderPlacement();
    }
  }
  GoToOrderPlacement() {
    debugger
    let data = sessionStorage.getItem('fdfsdf*%gsdfhdf=');
    if (data != undefined && data != null) {
      let d = JSON.parse((data));
      if (d.length > 0) {
        let data = sessionStorage.setItem('myordrplcmntdata', JSON.stringify(d));
        this.cutoff_flag = this.cutflag//////////////////////////////////////////////////////////added by adarsh
        if (this.cutoff_flag == 'Y') {
          if (this.selectedCategory == 'HNI') {
            let m = d.filter(a => parseInt(a.totalBidAmountBid1) < 200000 || a.totalBidAmountBid1 == '');
            if (m.length == 0) {
              let pr = sessionStorage.getItem('pReV#uihfenkj&*d');
              if (pr != undefined && pr != null) {
                let prv = JSON.parse((pr));
                let fil = d.filter((a, i) => a.totalBidAmountBid1 < prv[i]);
                if (fil.length == 0) {
                  this.GoToOrderSummary();
                }
                else {
                  let bid = this.GetBidIndex(fil);
                  this.CallAlertModal(`Bid amount must be greater than previous bid amount for ${bid}`);
                }
              }
              else {
                this.GoToOrderSummary();
              }
            }
            else {
              let bid = this.GetBidIndex(m);
              this.CallAlertModal(`Bid amount must be greater than 200000 for ${bid}`);
            }
          }
          else {
            if (this.selectedCategory == 'SHA') {
              let pr = sessionStorage.getItem('pReV#uihfenkj&*d');
              if (pr != undefined && pr != null) {
                let prv = JSON.parse((pr));
                let fil = d.filter((a, i) => (a.totalBidAmountBid1 < prv[i]) && prv[i] > 200000);
                if (fil.length == 0) {
                  this.GoToOrderSummary();
                }
                else {
                  let bid = this.GetBidIndex(fil);
                  this.CallAlertModal(`Bid amount must be greater than previous bid amount for ${bid}`);
                }
              }
              else {
                this.OrderPlacementNonHNI(d);
              }
            }
            else {
              this.OrderPlacementNonHNI(d);
            }
          }
        }
        else {
          this.CallAlertModal('Apply bidding time exceeded!')
          this.router.navigate(['/ipo'], { relativeTo: this.route });
        }
      }
    }
  }
  check_cutflag_asba() {
    debugger
    //let cutflag: any;
    // sessionStorage.removeItem('hasdfhuirec');
    let mod = sessionStorage.getItem('kfrisnekfmcejfem')
    if(mod == 'M' && mod != null)
    {
      let newItem = JSON.parse(sessionStorage.getItem('fdfsdf*%gsdfhdf='));
      let oldItem = sessionStorage.getItem('getPayableAmount');
      let d  = newItem.sort((a, b) => b.totalBidAmountBid1 - a.totalBidAmountBid1);    
      if(oldItem == d[0].totalBidAmountBid1)
      {
        this.CallAlertModal('You have entered same amount. Please Enter New Amount to continue the transaction');
        return;
      }  
    }
    if (!isNullOrUndefined(sessionStorage.getItem('sfjsgueiid'))) {
      sessionStorage.removeItem('sfjsgueiid');
    }
    let a = sessionStorage.getItem('kfnekfmcejfem');
//    alert('UPI' + this.UPIForm.invalid + 'a' + a);
    // if (this.UPIForm.invalid && a == "1") {
    //   this.UPIFormSubmitted = true;
    //   return false;
    // } else {
      this.UPIFormSubmitted = false;
      // if (this.IsFedRadio == false && (this.k.upi.value == '' || (this.Isselectupi == false || this.SelectedValue == ''))) {
        if (this.IsFedRadio == false && (this.k.upi.value == '' || (this.Isselectupi == false || this.SelectedValue == ''))) {
        this.CallAlertModal('Please enter a valid UPI ID and UPI Handler');
      }
      else {
        //alert('compid' + (sessionStorage.getItem('nsd#d@l;d*g#hjb')))
        this.BindNameAndExtension();
        let compid = (sessionStorage.getItem('nsd#d@l;d*g#hjb'));
        let category = this.selectedCategory
        if (a == "1") {
          this.flag = '0';
        }
        let Json = {
          "COMPANY_ID": compid,
          "CATEGORY": category,
          "flag": this.flag
        }

        this.iposervice.GetIns_Mod_Del_BIDFLAG(Json).subscribe((res: any) => {
          debugger;
          let resp = JSON.parse((res));
          if (resp.ArrayOfResponse[0] != null && resp.ArrayOfResponse[0].cut_flag == 'Y') {
            this.cutflag = resp.ArrayOfResponse[0].cut_flag;
            this.OnClickReviewOrder();

          }
          else {
            this.cutflag = 'N';
            this.OnClickReviewOrder();
          }
        })
        
      }



    //}
  }
  OrderPlacementNonHNI(d) {
    let m = d.filter(a => parseInt(a.totalBidAmountBid1) == 0 || a.totalBidAmountBid1 == '');
    if (m.length == 0) {
      this.GoToOrderSummary();
    }
    else {
      let bid = this.GetBidIndex(m);
      // this.CallAlertModal(`Bid amount can not be 0 for ${bid}`);
      this.CallAlertModal(`Bid amount can not be 0`);
    }
  }
  GoToOrderSummary() {
    debugger
    sessionStorage.removeItem('gjh$jbLjk2r2');
    sessionStorage.removeItem('gjh$jbLjk2r2nw');
    sessionStorage.removeItem('nsd#d@l;d*g#hjb222');
    this.router.navigate(['/order-summary'], { relativeTo: this.route });
  }
  GetBidIndex(arr) {
    let str: any = '';
    let ix = arr.map(a => a.bidIndex);
    if (ix.length == 1) {
      str = `bid ${ix[0]}`;
    }
    else if (ix.length == 2) {
      str = `bid ${ix[0]} & bid ${ix[1]}`;
    }
    else {
      str = `bid ${ix[0]}, ${ix[1]} & ${ix[2]}`;
    }
    return str;
  }
  CallAlertModal(msg: any) {
    $("#AlertModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#AlertModalContent').text(msg);
  }

  CallAlertModalLimit(msg: any) {
    $("#AlertLimitModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#AlertLimitModalContent').text(msg);
  }
  CloseModel() {
    let r: any = this.b.controls[0];
    r.controls.bidno.setValue(1);
    let amt2 = Number(this.UpperPriceBand) * Number(Number(r.controls.bidno.value) * this.BidLot);
    r.controls.TotalBidAmount.setValue(amt2);
    $("#AlertLimitModal").hide();

  }

  CallAlertquantityModal() {
    $("#AlertquantityModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    // $('#AlertModalContent').text(msg);
  }

  ConvertToShortDate(ipd) {
    let r1 = ipd.getDate();
    let r2 = ipd.getMonth() + 1;
    let r3 = ipd.getFullYear();
    return `${r1}/${r2}/${r3}`;
  }
  OpenCompanyURL(data) {
    if (data != undefined && data != null && data != '') {
      window.open(`${data}`, '_blank');
      // window.open(`${data}`, '_self');
    } else {
      this.CallAlertModal('Company details not found.');
    }
  }
  DownloadProductNote(COMPANY_ID: number, para: string) {
    debugger
    this.Loader.show();
    let obj: any;
    if (para == 'Prospectus') {
      obj = {
        "COMPANY_ID": COMPANY_ID
      }
    }
    else {
      obj = {
        "COMPANY_ID": COMPANY_ID,
        "TransType": "DraftProsepectNote"
      }
    }
    let JSONobj = JSON.stringify(obj);
    this.iposervice.GetRHPDocumentDetails(JSONobj).subscribe(res => {
      if (res.ID > 0) {
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
      }
      else {
        this.CallAlertModal(res.Message);
      }
      this.Loader.hide();
    },
      err => {
        console.log(err)
        this.Loader.hide();
      })
  }
  radioChecked(VALUEFIELD) {
    debugger
    this.IscatagoryChanges = true;
    sessionStorage.setItem('uytewknc', 'jgas');
    this.ArrCategory.forEach(item => {
      if (item.VALUEFIELD !== VALUEFIELD) {
        item.selected = false;
      } else {
        item.selected = true;
        this.setCategory(item);
      }
    });
  }
  setCategory(category: any) {
    let rr: any = {}
    rr.TEXTFIELD = category.TEXTFIELD;
    rr.VALUEFIELD = category.VALUEFIELD;
    sessionStorage.setItem('gdfgg(%fgshgd=', JSON.stringify(rr));
    this.selectedCategory = category.VALUEFIELD;
    this.OnChangeCategory(category.VALUEFIELD);
  }
  ngAfterViewInit() {
    $('.CustomSelect0').select2().on('change', (e: any) => this.onChangeHandler(e));
  }

  onChangeUPIId(event) {
    //$('.CustomSelect0').val('').trigger('change');
  }

  onChangeHandler(e) {

    //this.IsFedRadio = true;
    debugger
    let r = this.UPIHandlerList.find(a => a.VALUEFIELD == e.target.value);
    if (r != undefined && r != null) {
      this.SelectedValue = r.TEXTFIELD;
      this.Isselectupi = true;
    }
    else {
      this.SelectedValue = "";
    }
    this.BindNameAndExtension();
  }

  BindNameAndExtension() {
    let UPIId = {
      "name": this.k.upi.value,
      "handler": this.SelectedValue
    }
    sessionStorage.setItem('dfsd*sdfsd$dg=', JSON.stringify(UPIId));
  }

  OnChangeRadio(e) {
    debugger
    this.UPIFormSubmitted = false;
    if (e == 0) {
      this.Isseletedradio = "0";
      this.IsFedRadio = true;
      this.ShowBid = true;
      $(`#upi`).prop("disabled", true);
      $(`#UPIHandler`).prop("disabled", true);
      $("#ASBA").prop("checked", true)
    }else{
      this.ShowBid = false;
      this.Isseletedradio = "1";
      this.IsFedRadio = false;
      $(`#upi`).prop("disabled", false);
      $(`#UPIHandler`).prop("disabled", false);
      $("#UPI").prop("checked", true)
      let r: any = this.b.controls[0];
      if (this.selectedCategory == 'HNI') {
        debugger
        let amt = Number(this.UpperPriceBand) * Number(Number(r.controls.bidno.value) * this.BidLot);
        if (amt <= 500000) {
          if (amt > 0) {
            if ((sessionStorage.getItem('uytewknc')) != 'HNI' && !isNullOrUndefined(sessionStorage.getItem('uytewknc'))) {
              r.controls.TotalBidAmount.setValue(amt);
            }
          }
          else {
            r.controls.TotalBidAmount.setValue('');
          }
        }
        else {
          this.CallAlertModal('The maximum limit for the selected category is Rs 5 lakh.')
          r.controls.bidno.setValue(1);
          let amt2 = Number(this.UpperPriceBand) * Number(Number(r.controls.bidno.value) * this.BidLot);
          r.controls.TotalBidAmount.setValue(amt2);
        }
      }
    }
    sessionStorage.setItem("kfnekfmcejfem", e);
  }
  CountBidAmountUsingUpperPriceBand(event, i, para?) {
    debugger
    if(this.selectedCategory == '')
    {
      setTimeout(() => {        
        let r: any = this.b.controls[i];
        this.selectedCategory = "IND";
        r.controls.cbx.setValue(true);
      }, 1000);      
    }
    if (this.selectedCategory != '') {
      let r: any = this.b.controls[i];
      let k = r.controls.TotalBidAmount.value;
      if (this.selectedCategory == 'HNI' && this.TrinityFlag == 'Y') {
        if (para == 'keyup') {
          sessionStorage.setItem('uytewknc', ('jgas'));
          if (event == '0') {
            event = 1;
            r.controls.bidno.setValue(event);
            this.CallAlertModal(`Please enter lot size greater than 1`);
          }
        }
        else {
          if (event == '0' || event == '') {
            event = 1;
            r.controls.bidno.setValue(event);
            this.CallAlertModal(`Please enter lot size greater than 1`);
          }
        }

        //let PriceBand = 0;
        event = parseInt(event)
        if (Number.isNaN(event)) {
          event = 1
        } else {
          r.controls.NoofLots.setValue(event);
        }
        let amt: any = 0;
        let txtBidPrice = r.controls.price.value;
        if (txtBidPrice != 0) {
          if (r.controls.cbx.value) {
            amt = Number(this.UpperPriceBand) * Number(event * this.BidLot);
            //PriceBand = parseInt(this.UpperPriceBand);
          } else {
            amt = Number(txtBidPrice) * Number(event * this.BidLot);
            //PriceBand = Number(txtBidPrice);
          }
        }
        let rr = parseFloat(this.TotalIpoSize) * 10000000;
        if (amt > rr) {
          this.CallAlertModalLimit(`Total bid amount must be less than total ipo size i.e. ${this.TotalIpoSize} Cr.`)
          r.controls.bidno.setValue(1);
          r.controls.TotalBidAmount.setValue(0);
        }
        else {
          if (amt > 0) {
            debugger
            //this.OldAmount = amt;
            //sessionStorage.setItem('hsjkfhkashf',this.OldAmount.toString());
            console.log('HNI Value==>' + (sessionStorage.getItem('uytewknc')));
            if ((sessionStorage.getItem('uytewknc')) != 'HNI' && !isNullOrUndefined(sessionStorage.getItem('uytewknc'))) {
              if (this.selectedCategory == 'HNI' && (Number(sessionStorage.getItem('kfnekfmcejfem')) == 1)) {
                let amt = Number(this.UpperPriceBand) * Number(event * this.BidLot);
                if (amt >= 500000) {
                  this.CallAlertModal('The maximum limit for the selected category is Rs 5 lakh.')
                  r.controls.bidno.setValue(1);
                  let amt2 = Number(this.UpperPriceBand) * Number(Number(r.controls.bidno.value) * this.BidLot);
                  r.controls.TotalBidAmount.setValue(amt2);
                } else {
                  r.controls.TotalBidAmount.setValue(amt);
                }
              }
              else {
                r.controls.TotalBidAmount.setValue(amt);
              }



            } else {
              r.controls.TotalBidAmount.setValue(r.controls.TotalBidAmount.value);
            }
          }
          else {
            r.controls.TotalBidAmount.setValue('');
            r.controls.bidno.setValue(event);
          }
        }

        this.binddata();
      }
      else {
        if (k <= this.maxPrice) {
          if (para == 'keyup') {
            if (event == '0' || parseInt(event) > this.MaxQuantity) {
              if (this.selectedCategory == 'IND' && parseInt(event) > this.MaxQuantity) {
                let b = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
                if (b != null && b != undefined && b != '') {
                  this.CallAlertModalLimit('The maximum limit for the selected category is Rs 2 lakh.')
                  r.controls.bidno.setValue(1);
                  r.controls.TotalBidAmount.setValue(0);
                }
                else {
                  this.CallAlertModalLimit('The maximum limit for the selected category clients is Rs 2 lacs. For placing bids above Rs 2 lacs, kindly select the HNI category.');
                  r.controls.bidno.setValue(1);
                  r.controls.TotalBidAmount.setValue(0);
                }
              }
              else {

                //this.CallAlertquantityModal();
                this.CallAlertModal('Check whether quantity is proper i.e. it should be in multiples of specified quantity. Check whether quantity is proper i.e. it should not be less than min quantity or greater than maximum quantity.')
                r.controls.bidno.setValue(1);
                let amtbid = Number(this.UpperPriceBand - this.discountPrize) * Number(1 * this.BidLot);
                r.controls.TotalBidAmount.setValue(amtbid);
              }
            }
            // else if (event.trim() == '') {
            //   this.CallAlertquantityModal()
            //   // this.CallAlertModal('Check whether quantity is proper i.e. it should be in multiples of specified quantity. <br/><br/> Check whether quantity is proper i.e. it should not be less than min quantity or greater than maximum quantity.')
            //   r.controls.bidno.setValue(1);
            //   let amtbid = Number(this.UpperPriceBand - this.discountPrize) * Number(1 * this.BidLot);
            //   r.controls.TotalBidAmount.setValue(amtbid);
            // }
            // event = 1;
            // r.controls.bidno.setValue(event);
          }
          else {
            if (event == '0' || event == '' || parseInt(event) > this.MaxQuantity) {
              if (this.selectedCategory == 'IND' && parseInt(event) > this.MaxQuantity) {
                let b = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
                if (b != null && b != undefined && b != '') {
                  this.CallAlertModalLimit('The maximum limit for the selected category is Rs 2 lakh.')
                  r.controls.bidno.setValue(1);
                  r.controls.TotalBidAmount.setValue(0);
                }
                else {
                  this.CallAlertModalLimit('The maximum limit for the selected category clients is Rs 2 lacs. For placing bids above Rs 2 lacs, kindly select the HNI category.');
                  r.controls.bidno.setValue(1);
                  r.controls.TotalBidAmount.setValue(0);
                }
              }
              if(event == '')
              {
                //this.CallAlertquantityModal();
                this.CallAlertModal('No of Lots cannot be blank')
                r.controls.bidno.setValue(1);
                let amtbid = Number(this.UpperPriceBand - this.discountPrize) * Number(1 * this.BidLot);
                r.controls.TotalBidAmount.setValue(amtbid);
              }
              else if(this.selectedCategory == 'EMP')
              {
                this.CallAlertModal('Bid amount above 5 lakhs not allowed for Employee Category')
                // this.CallAlertModal('Check whether quantity is proper i.e. it should be in multiples of specified quantity. Check whether quantity is proper i.e. it should not be less than min quantity or greater than maximum quantity.')
                r.controls.bidno.setValue(1);
                let amtbid = Number(this.UpperPriceBand - this.discountPrize) * Number(1 * this.BidLot);
                r.controls.TotalBidAmount.setValue(amtbid);
              }
              // event = 1;
              // r.controls.bidno.setValue(event);
            }
          }

          let PriceBand = 0;
          let InitPriceBand: any = 0;
          event = parseInt(event)
          if (this.IscatagoryChanges == true) {
            r.controls.bidno.setValue(event);
            this.IscatagoryChanges = false
          }
          r.controls.NoofLots.setValue(r.controls.bidno.value);
          this.SwitchCase(this.DiscountDetails[0]);
          let amt: any = 0;
          let amt2: any = 0;
          let txtBidPrice = r.controls.price.value;
          if (txtBidPrice != 0) {
            if (r.controls.cbx.value) {
              event = r.controls.bidno.value;
              amt = Number(this.UpperPriceBand - this.discountPrize) * Number(event * this.BidLot);
              amt2 = Number(this.UpperPriceBand - this.discountPrize) * Number((event + 1) * this.BidLot);
              InitPriceBand = parseInt(this.UpperPriceBand);
            } else {
              event = r.controls.bidno.value;
              amt = Number(txtBidPrice - this.discountPrize) * Number(event * this.BidLot);
              amt2 = Number(txtBidPrice - this.discountPrize) * Number((event + 1) * this.BidLot);
              InitPriceBand = Number(txtBidPrice);
            }
            PriceBand = InitPriceBand - this.discountPrize;
            let MxQty: number = this.maxPrice / PriceBand;
            this.MaxQuantity = Math.floor(Math.floor(MxQty) / parseInt(this.BidLot));
          }
          if (amt <= this.maxPrice) {
            if (amt > 0) {
              if ((sessionStorage.getItem('uytewknc')) != 'HNI' && !isNullOrUndefined(sessionStorage.getItem('uytewknc'))) {
                r.controls.TotalBidAmount.setValue(amt);
              }
            }
            else {
              r.controls.TotalBidAmount.setValue('');
            }
          }
          else {
            if (this.selectedCategory == 'IND') {
              this.CallAlertModal('The maximum limit for the selected category clients is Rs 2 lacs. For placing bids above Rs 2 lacs, kindly select the HNI category.');
              r.controls.bidno.setValue(1);
              let amt2 = Number(this.UpperPriceBand) * Number(Number(r.controls.bidno.value) * this.BidLot);
              r.controls.TotalBidAmount.setValue(amt2);
              this.CountBidAmountUsingUpperPriceBand(1, i)
            }
          }
          if (amt <= this.maxPrice) {
            $(`#IdBtnBidInc_${i}`).prop("disabled", false);
          }
          else {
            if (this.selectedCategory != 'IND') {
              $(`#IdBtnBidInc_${i}`).prop("disabled", true);
            }
          }
          if (this.selectedCategory == 'SHA' && amt > 200000 && r.controls.cbx.value == true) {
             //$(`.cutoffprice_${i}`).css("pointer-events", 'none');\
             this.CallAlertModal('Cutoff not allowed for bid greater than 200000 in shareholder.')
             //r.controls.price.setValue('');
             //r.controls.cbx.setValue(false);
             r.controls.bidno.setValue(1);
             let amt2 = Number(this.UpperPriceBand) * Number(Number(r.controls.bidno.value) * this.BidLot);
             r.controls.TotalBidAmount.setValue(amt2);
             this.CountBidAmountUsingUpperPriceBand(1, i)   
          }
          else {
            if (this.selectedCategory == 'HNI') {
              $(`.cutoffprice_${i}`).css("pointer-events", 'none');
            }
            else {
              $(`.cutoffprice_${i}`).css("pointer-events", 'all');
            }
          }
          this.binddata();
        }
        else {
          if (this.selectedCategory == 'IND') {
            console.log('HNI Value==>' + (sessionStorage.getItem('uytewknc')));
            if ((sessionStorage.getItem('uytewknc')) != 'HNI' && ((sessionStorage.getItem('uytewknc')) != 'jgas')) {
              //this.CallAlertModal('The maximum limit for the selected category clients is Rs 2 lacs. For placing bids above Rs 2 lacs, kindly select the HNI category.');
              r.controls.bidno.setValue(1);
              let amt2 = Number(this.UpperPriceBand) * Number(Number(r.controls.bidno.value) * this.BidLot);
              r.controls.TotalBidAmount.setValue(amt2);
            }
          }
        }
      }
    }
  }
  CountBidAmountUsingBidPrice(event, i, para) {
    debugger
    let r: any = this.b.controls[i];
    // this.UpperPriceBand = 100;
    // this.LowerPriceBand = 90;
    if (event <= this.UpperPriceBand && event >= this.LowerPriceBand) {
      r.controls.price.setValue(event);
      if (this.selectedCategory != 'HNI') {
        this.SwitchCase(this.DiscountDetails[0]);
        let rr = r.controls.bidno.value;
        let p = r.controls.price.value;
        //if (p <= this.UpperPriceBand && p >= this.LowerPriceBand) {
        let PriceBand = p - this.discountPrize;
        let MxQty: number = this.maxPrice / PriceBand;
        this.MaxQuantity = Math.floor(Math.floor(MxQty) / parseInt(this.BidLot));
        if (rr > this.MaxQuantity) {
          rr--;
          r.controls.bidno.setValue(rr);
        }
        this.CountBidAmountUsingUpperPriceBand(rr, i)
        //}
      }
      else {
        let rr = r.controls.bidno.value;
        this.CountBidAmountUsingUpperPriceBand(rr, i)
      }
    }
    else {
      //r.controls.TotalBidAmount.setValue('');
      if (para == 'keyup') {
        if (event.length >= this.UpperPriceBand.toString().length) {
          this.AlertPriceRange(r, i);
        }
      }
      else {
        this.AlertPriceRange(r, i);
      }
    }
  }
  AlertPriceRange(r, i) {
    this.CallAlertModal(`Please enter price between ${this.LowerPriceBand} and  ${this.UpperPriceBand}`);
    //if (this.selectedCategory != 'SHA') {
    r.controls.price.setValue(this.UpperPriceBand);
    //}
    // else {
    //   r.controls.price.setValue('');
    // }
    let rr = r.controls.bidno.value;
    this.CountBidAmountUsingUpperPriceBand(rr, i)
  }
  checkValue(event: any, i) {
    let r: any = this.b.controls[i];
    if(this.selectedCategory == "HNI")
    {
      this.CallAlertModal("Cutoff under HNI category is not allowed");
      r.controls.cbx.setValue(false);
    }
    else if (this.allowCutoff == 1) {
      this.CallAlertModal("Cutoff is not allowed");
      r.controls.cbx.setValue(false);
    }
    else {
      if (event.target.checked == true) {
        r.controls.price.setValue(this.UpperPriceBand);
        r.controls.cbx.setValue(true);
      } else {
        r.controls.price.setValue('');
        r.controls.cbx.setValue(false);
        //this.binddata();
      }
      let rr = r.controls.bidno.value;
      this.CountBidAmountUsingUpperPriceBand(rr, i);
    }
  }
  incCounter1(i) {
    let r: any = this.b.controls[i];
    let rr = r.controls.bidno.value;
    rr++;
    r.controls.bidno.setValue(rr);
    sessionStorage.setItem('uytewknc', 'jgas');
    this.CountBidAmountUsingUpperPriceBand(rr, i);
  }
  decCounter1(i) {
    let r: any = this.b.controls[i];
    let rr = r.controls.bidno.value;
    if (rr == 1) {
    } else {
      rr--;
      r.controls.bidno.setValue(rr);
      sessionStorage.setItem('uytewknc', ('jgas'));
      this.CountBidAmountUsingUpperPriceBand(rr, i);
    }
  }
  OnChangeCategory(category) {
    debugger
    let cat = category;
    switch (cat) {
      case 'IND':
        this.maxPrice = 200000;
        break;
      case 'SHA':
        this.maxPrice = 500000;
        break;
      case 'EMP':
        this.maxPrice = 500000;
        break;
      case 'POL':
        this.maxPrice = 200000;
        break;
      case 'HNI':
        if (this.TrinityFlag == 'N') {
          this.maxPrice = 500000;
        }
        break;
      default:
        this.maxPrice = 200000;
        break;
    }
    this.bindcategory = cat;
    if (cat == 'HNI') {
      this.DisableCuttoff = true;
    }
    else {
      this.DisableCuttoff = false;
    }

    let c = this.b.controls;
    let bb = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
    let rk = sessionStorage.getItem('gjh$jbLjk2r2nw');
    if ((bb != null && bb != undefined && bb != '') || rk == '1') {
      for (let i = 0; i < c.length; i++) {
        let r: any = this.b.controls[i];
        let rr = r.controls.bidno.value;
        this.CountBidAmountUsingUpperPriceBand(rr, i);
      }
      if (this.selectedCategory != '') {
        sessionStorage.removeItem('gjh$jbLjk2r2nw');
      }
    }
    else {
      for (let i = 0; i < c.length; i++) {
        let r: any = this.b.controls[i];
        if (this.IscatagoryChanges == true) {
          r.controls.bidno.setValue(1);
          let amtbid = Number(this.UpperPriceBand - this.discountPrize) * Number(1 * this.BidLot);
          r.controls.TotalBidAmount.setValue(amtbid);
          this.IscatagoryChanges = false;
        }
        if (this.selectedCategory == 'HNI' || this.allowCutoff == 1) {
          r.controls.cbx.setValue(false);
          if ((sessionStorage.getItem('uytewknc')) != 'HNI' && !isNullOrUndefined(sessionStorage.getItem('uytewknc'))) {
            r.controls.price.setValue('');
          } else {
            r.controls.price.setValue(this.UpperPriceBand);
          }
        }
        else {
          if (i == 0) {
            r.controls.cbx.setValue(true);
            r.controls.price.setValue(this.UpperPriceBand);
          }
          else {
            r.controls.cbx.setValue(false);
            r.controls.price.setValue('');
          }
        }
        if (this.TrinityFlag == 'Y') {
          // r.controls.TotalBidAmount.setValue(0);
          // r.controls.bidno.setValue(1);
          //r.controls.price.setValue('');
          //r.controls.cbx.setValue(false);

          this.CountBidAmountUsingUpperPriceBand(1, i);
        }
        else {
          //let rr = r.controls.bidno.value;
          //r.controls.bidno.setValue(1);
          //r.controls.price.setValue(this.UpperPriceBand);
          //r.controls.cbx.setValue(true);

          this.CountBidAmountUsingUpperPriceBand(1, i);
        }
        $(`#IdBtnBidInc_${i}`).prop("disabled", false);
      }
    }

  }
  SwitchCase(event) {
    switch (this.selectedCategory) {
      case "IND":
        this.discountPrize = event.ind;
        break;
      case "SHA":
        this.discountPrize = event.sha;
        break;
      case "EMP":
        this.discountPrize = event.emp;
        break;
      case "POL":
        this.discountPrize = event.pol;
        break;
      default:
        this.discountPrize = 0;
        break;
    }
  }
  addBid(val: string = "") {
    let pc = 0;
    if (this.IsForModify) {
      if (val == "1") {
        pc = this.BidCount;
      } else {
        pc = this.BidCount - 1;
      }
    } else {
      pc = this.BidCount;
    }
    this.IsForModify = false;
    let cuttoffflag = true;
    let price: any = this.UpperPriceBand;
    if (this.TrinityFlag == 'Y' || this.selectedCategory == 'HNI') {
      cuttoffflag = false;
      price = '';
    }
    // if (this.selectedCategory == 'HNI') {
    //      cuttoffflag = false;
    //      price = '';
    // }

    for (let i = this.b.length; i < pc; i++) {
      this.b.push(
        this.fb.group({
          bidno: [1],
          price: [price],
          cbx: [cuttoffflag],
          TotalBidAmount: [this.totalBidAmount],
          NoofLots: [0],
          ActionCode: ['N'],
          bidid: [''],
          asbaid: [0],
        })
      );
      if (this.selectedCategory != '') {
        this.CountBidAmountUsingUpperPriceBand(1, i)
      }
    }
    this.BidCount = this.BidCount + 1;
  }
  DeletBid(i) {
    debugger
    this.b.removeAt(i);
    this.BidCount = this.BidCount - 1;
    this.binddata();
  }
  binddata() {
    ////
    debugger
    let final = [];
    for (let i = 0; i < this.b.length; i++) {
      let r: any = this.b.controls[i];
      let binddata: any = {}
      binddata.NoofLotsBid1 = r.controls.NoofLots.value;
      binddata.BidLot = this.BidLot;
      binddata.totalBidAmountBid1 = r.controls.TotalBidAmount.value;
      if (r.controls.cbx.value) {
        binddata.CutOffFlag = 1;
        binddata.bidPriceBid1 = this.UpperPriceBand;
      }
      else {
        binddata.CutOffFlag = 0
        binddata.bidPriceBid1 = r.controls.price.value;
      }
      binddata.bidIndex = i + 1;
      binddata.bidid = r.controls.bidid.value;
      binddata.asbaid = r.controls.asbaid.value;
      binddata.ActionCode = this.SetActionCode(r, i);
      final.push(binddata);
    }

    sessionStorage.setItem('fdfsdf*%gsdfhdf=', JSON.stringify(final));
  }
  SetActionCode(r, i) {
    debugger
    let b = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
    let action = 'N'
    if (b != null && b != undefined && b != '') {
      let d: any = JSON.parse((b));
      if (d.asba != null && d.asba != undefined) {
        if (d.asba.length > 0) {
          let pd = d.asba[i];
          let cbx = r.controls.cbx.value;
          if (cbx) {
            cbx = 1
          }
          else {
            cbx = 0;
          }
          if (pd.Amount != r.controls.TotalBidAmount.value || pd.CutOffFlag != cbx || (pd.asbaid != "" && pd.asbaid != 0)) {
            action = 'M'
          }
        }
      }
    }
    return action;
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
  clickupi()
  {
    debugger
    this.IsFedRadio=false;
    this.ShowBid = false;
    this.DeletBid('2');
    this.DeletBid('1')
    $("#UPI").prop("checked", true)
    $(`#upi`).prop("disabled", false);
    $(`#UPIHandler`).prop("disabled", false);
    sessionStorage.setItem("kfnekfmcejfem", "1");
  }

}
