import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EncrdecrService } from 'src/app/Auth/encrdecr.service';
import { NotAuthorizedAlertComponent } from 'src/app/IPO/not-authorized-alert/not-authorized-alert.component';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { isNullOrUndefined } from 'src/app/validation';
declare var $: any;
@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent implements OnInit {
  @Input() InputData: any[] = [];
  data: any[] = [];
  hideSorry : boolean = true;
  ArrMonthName = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  SearchIssue: string = "";
  bsValue1 = ''//new Date();
  bsValue2 = ''//new Date();
  FinancialYear: any = [];  
  ArrClientData: any;
  ArrIssueType: any = [
    {
      "VALUEFIELD": "I",
      "TEXTFIELD": "Equity"
    },
    {
      "VALUEFIELD": "B",
      "TEXTFIELD": "NCD"
    },
    {
      "VALUEFIELD": "S",
      "TEXTFIELD": "SGB"
    },
  ]
  ArrStatus: any = [
    {
      "VALUEFIELD": "S",
      "TEXTFIELD": "Successful"
    },
    {
      "VALUEFIELD": "C",
      "TEXTFIELD": "Cancelled"
    },
    {
      "VALUEFIELD": "A",
      "TEXTFIELD": "Allotted"
    },
  ]
  FromDate: string = '';
  ToDate: string = '';
  SelectedIssueType: string = '';
  SelectedStatus: string = '';
  IpFromDate: string = '';
  IpToDate: string = '';
  IpSelectedIssueType: string = '';
  IpSelectedStatus: string = '';
  FilterObj = {
    SelectedIssueType: '',
    SelectedStatus: '',
    FromDate: '',
    ToDate: ''
  }
  ArrASBAdata: any[] = [];
  IsShowClearSearch: boolean = false;
  modalRef?: BsModalRef;
  IsdataFound: boolean = false;
  IsBidstatus: string = '';
  constructor(
    private Loader: CustomLoaderService,
    private iposervice: IPOServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private EncryptionService : EncrdecrService) { }

  ngOnInit() {
    
    this.Loader.show();
    this.GetBankDetails();
    console.log(this.hideSorry)
    var loaderInterval = setInterval(() => {
      let str = document.readyState;
      let rr = this.InputData;
      
      if (str == 'complete' && rr.length > 0) {
        this.hideSorry = false
        rr.map(arr => {
          debugger
          if (arr.DateOfApplication != '' && arr.DateOfApplication != null) {
            arr.DisplayDateOfApplication = this.ConvertDateFormate(arr.DateOfApplication);
          }
          else {
            arr.DisplayDateOfApplication = '';
          }
          let p = arr.BidStatus.toLowerCase();
          if (p == "bid cancelled by client" || p == "bid rejected" || p == "upi mandate rejected due to other reason"
            || p == "upi mandate declined by client" || p == "rejected by asba" || p.toLowerCase().includes('cancellation')) {
            arr.BidStatusDisplay = 'C'
          }
          else {
            arr.BidStatusDisplay = 'S'
          }
          if(p.includes('accept') || p.includes('success') || p.includes('received') || p.includes('MODIFICATION REQUEST RECEIVED')|| p == 'allotted')
          {
            arr.IsBidstatus = 'a'
          }
          else if(p.includes('reject') || p.includes('fail') || p.includes('not allotted'))
          {
            arr.IsBidstatus = 'r'
          }
          else if(p.includes('pending'))
          {
            arr.IsBidstatus = 'p'
          }
          let r = arr.IssueEndDate.split('T')[0];
          let rr = `${r}T${arr.IssueAcceptanceTime}`;
          if (+new Date(rr) >= +new Date()) {
            
            console.log('Data ISDelete ==>' + arr.IsDelete);
            if (arr.BidStatus.toLowerCase() == "bid cancelled by client" || arr.BidStatus.toLowerCase() == 'bid rejected' || arr.BidStatus.toLowerCase().includes('cancellation') || arr.IsDelete == '1') {
              arr.DisableOrder = false;
            }
            else {
              arr.DisableOrder = true;
            }
          }
          else {
            arr.DisableOrder = false;
          }
          switch (arr.CATEGORY) {
            case 'IND':
              arr.CATEGORY_SHOW = "Retail";
              break;
            case 'SHA':
              arr.CATEGORY_SHOW = "Share Holder";
              break;
            case 'EMP':
              arr.CATEGORY_SHOW = "Employee";
              break;
            case 'POL':
              arr.CATEGORY_SHOW = "Policy Holder";
              break;
            case 'HNI':
              arr.CATEGORY_SHOW = "High Networth Individuals (HNI)";
              break;
          }
          switch (arr.IssueType) {
            case 'I':
              arr.IssueTypeDisplay = "EQUITY";
              break;
            case 'B':
              arr.IssueTypeDisplay = "DEBT";
              break;
          }
        });
        
        this.data = rr;
        this.data.map(arr => {
          let rr: any = {};
          rr.IssueType = arr.IssueType;
          rr.IssueTypeDisplay = arr.IssueTypeDisplay;
          rr.DateOfApplication = arr.DateOfApplication;
          rr.DisplayDateOfApplication = arr.DisplayDateOfApplication;
          rr.BidStatus = arr.BidStatus;
          rr.BidStatusDisplay = arr.BidStatusDisplay;
          rr.CompanyName = arr.CompanyName;
          rr.CATEGORY_SHOW = arr.CATEGORY_SHOW;
          rr.COMPANY_ID = arr.COMPANY_ID;
          rr.SrNo = arr.SrNo,
          rr.PANNo = arr.PANNo,
          rr.FirstApplicant = arr.FirstApplicant,
          rr.MobileNo = arr.MobileNo,
          rr.SubBrokerCode = arr.SubBrokerCode,
          rr.SubbrokerName = arr.SubbrokerName,
          rr.EmpCode = arr.EmpCode,
          rr.EmployeeName = arr.EmployeeName,
          rr.ApplicationNo = arr.ApplicationNo,
          rr.Quantity = arr.Quantity,
          rr.Price = arr.Price,
          rr.Series = arr.Series,
          rr.UPIID = arr.UPIID,
          rr.BidID = arr.BidID,
          rr.DPClientID = arr.DPClientID,
          rr.InternalReferanceNumber = arr.InternalReferanceNumber,
          rr.Email = arr.Email,
          rr.ClientID = arr.ClientID,
          rr.DPID = arr.DPID,
          rr.DPType = arr.DPType,
          rr.IssueStartDate = arr.IssueStartDate,
          rr.IssueEndDate = arr.IssueEndDate,
          rr.earlyclosure = arr.earlyclosure,
          rr.IssueCloseTime = arr.IssueCloseTime,
          rr.IssueOpenTime = arr.IssueOpenTime,
          rr.CATEGORY = arr.CATEGORY,
          rr.SCRIPID = arr.SCRIPID,
          rr.IssueAcceptanceTime = arr.IssueAcceptanceTime,
          rr.CutOffFlag = arr.CutOffFlag,
          rr.OrderCancelDate = arr.OrderCancelDate,
          rr.ASBAType = arr.ASBAType,
          rr.LowerPriceBand = arr.LowerPriceBand,
          rr.UpperPriceBand = arr.UpperPriceBand,
          rr.BidLot = arr.BidLot,
          rr.BidDate = arr.BidDate,
          rr.PaymentDate = arr.PaymentDate,
          rr.AllotementDate = arr.AllotementDate,
          rr.asba = arr.asba,
          rr.Msg = arr.Msg,
          rr.Id = arr.Id,
          rr.Amount = arr.Amount,
          rr.DisableOrder = arr.DisableOrder
          rr.IsBidstatus = arr.IsBidstatus
          if (arr.ASBAType == 1) {
            if (arr.asba != undefined && arr.asba != null) {
              //let ArrASBA = arr.asba.filter(a => a.ActionCode != 'D');
              let ArrASBA = arr.asba;
              if (ArrASBA != undefined && ArrASBA != null) {
                if (ArrASBA.length > 0) {
                  
                  const h = ArrASBA.sort((a, b) => b.Amount - a.Amount)[0];
                  rr.Amount = h.Amount;
                }
                else {
                  rr.Amount = 0;
                }
              }
              else {
                rr.Amount = 0;
              }
            }
            else {
              rr.Amount = 0;
            }
          }
          else {
            rr.Amount = arr.Amount;
          }
          //if (rr.Amount > 0) {
          this.ArrASBAdata.push(rr);
          console.log("Krishna _____---" + JSON.stringify(this.ArrASBAdata))
          //}

        })
        this.Loader.hide();
        this.IsdataFound = true;
        clearInterval(loaderInterval)
      }
      else{
        this.Loader.hide();
        this.IsdataFound = false;
      }
    }, 1000);
    console.log('loaderInterval =>'+ loaderInterval);
    if(!isNullOrUndefined(sessionStorage.getItem('hide83hjSorry')))
    {
      this.hideSorry= false;   
      sessionStorage.removeItem('hide83hjSorry')   
    }
  }
  ngAfterViewInit() {
    $('.calIcon').on('click', function () {
      $(this).parents('.form-group').find('input').trigger('click');
    })
  }
  ConvertDateFormate(date: string) {
    let d = (date.split('T'))[0].split('-');
    let m = parseInt(d[1]) - 1;
    return `${d[2]} ${this.ArrMonthName[m]} ${d[0]}`;
  }
  OnClickModify(data) {
    //this.Loader.show();    
    sessionStorage.setItem("hide83hjSorry", 'false')
    sessionStorage.setItem('lfdhW&<kGtP*nh', JSON.stringify(data));        
    this.router.navigate(['/order-status'], { relativeTo: this.route });
  }
  SetSearch(val) {
    if (val.length > 0) {
      this.IsShowClearSearch = true;
    }
    else {
      this.IsShowClearSearch = false;
    }
    this.SearchIssue = val;
  }
  OnClickClear() {
    this.IsShowClearSearch = false;
    this.SearchIssue = '';
    $('#search').val('');
  }
  openFilterPopup() {
    if (this.FinancialYear.length == 0) {
      this.GetFinancialYear();
    }
    $("#FilterModal").modal({
      backdrop: 'static',
      keyboard: false
    })
  }
  GetFinancialYear() {
    //Get Financial year array
    let req = {
      "TRANS_TYPE": "FinancialYears",
      "REFF_ID": "",
      "REFF_ID2": "",
      "REFF_ID3": "",
      "CON_STR": "IPO"
    };
    let data = JSON.stringify(req)
    this.iposervice.GetFinancialYear(data).subscribe(resdata => {
      let res = JSON.parse((resdata))
      if (res.Message.toLowerCase().includes('not authorized')) {
        let ngbModalOptions: NgbModalOptions = {
          backdrop: 'static',
          keyboard: false
        };
        this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
      }
      else {
        if (res.ArrayOfResponse.length > 0) {
          this.FinancialYear = res.ArrayOfResponse;
        }
      }
    },
      err => {
        console.log(err)
      });
  }
  OnclickFinancialYear(val) {
    let r = val.split('~');
    this.FromDate = `${r[0]}T00:00:00`;
    this.ToDate = `${r[1]}T00:00:00`;
  }
  OnclickIssueType(val) {
    this.SelectedIssueType = val;
  }
  OnclickStatus(val) {
    this.SelectedStatus = val;
  }
  onChangeFromDate(e) {
    this.FromDate = this.ChangeDateFormat(e);
  }
  onChangeToDate(e) {
    this.ToDate = this.ChangeDateFormat(e);
  }
  ChangeDateFormat(ipdate) {
    if (ipdate != '') {
      let k = ipdate.toLocaleDateString();
      let r = k.split('/');
      let d = r[1];
      let m = r[0];
      let y = r[2];
      if (d.length < 2) {
        d = `0${d}`;
      }
      if (m.length < 2) {
        m = `0${m}`;
      }
      return `${y}-${m}-${d}T00:00:00`;
    }
    else {
      return '';
    }
  }
  OnClickApplyFilter() {
    debugger
    this.FilterObj = {
      SelectedIssueType: this.SelectedIssueType,
      SelectedStatus: this.SelectedStatus,
      FromDate: this.FromDate,
      ToDate: this.ToDate
    }
    this.modalClose()
  }
  OnClickResetFilter() {
    this.FilterObj = {
      SelectedIssueType: '',
      SelectedStatus: '',
      FromDate: '',
      ToDate: ''
    }
    this.SelectedIssueType = '';
    this.SelectedStatus = '';
    this.FromDate = '';
    this.ToDate = '';
    $("input[type=radio][name=filter-issue-type]").prop('checked', false);
    $("input[type=radio][name=filter-status]").prop('checked', false);
    $("input[type=radio][name=financial-year]").prop('checked', false);
    $("#TxtFromDate").val('');
    $("#TxtToDate").val('');
    this.bsValue1 = '';
    this.bsValue2 = '';
    //this.modalClose()
  }
  modalClose() {
    $("#FilterModal").modal('hide')
  }
  OnTabChange(para: string) {
    switch (para) {
      case 'f':
        $("#TxtFromDate").val('');
        $("#TxtToDate").val('');
        this.bsValue1 = '';
        this.bsValue2 = '';
        break;
      case 'd':
        $("input[type=radio][name=filter-issue-type]").prop('checked', false);
        $("input[type=radio][name=filter-status]").prop('checked', false);
        $("input[type=radio][name=financial-year]").prop('checked', false);
        break;
    }
    this.FromDate = '';
    this.ToDate = '';
  }

  GetBankDetails()
  {
    let pan = sessionStorage.getItem('gjhfHunj#n&fdgh'); //'DDJPS6803R'
    let ClientCode = '';
    let c = sessionStorage.getItem('gjhfHunj#n&fdghcod');
      if (c != undefined && c != null && c != '') {
        ClientCode = c;
      }
    this.iposervice.GetIPOClientDetails(pan, "", "", ClientCode).subscribe(res => {
      debugger
      //this.Loader.hide();
      
      if (res.Message.toLowerCase().includes('not authorized')) {
        let ngbModalOptions: NgbModalOptions = {
          backdrop: 'static',
          keyboard: false
        };
        this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
      }
      else{
        if (res.ID > 0) {
          
          let rr = JSON.parse(res.Message);
          this.ArrClientData = rr[0];
          sessionStorage.setItem('mhsd#d@l;d*g#hjb',JSON.stringify(rr[0]));
          if (this.ArrClientData.objIPOBD.length > 0) {
            sessionStorage.setItem('buvbe#jbY', this.ArrClientData.objIPOBD[0].BankAccountNo);      
            //this.router.navigate(['/order-status'], { relativeTo: this.route });
          }
        }
      }
    },
      err => {
        localStorage.setItem('IpoClientdetailErr', JSON.stringify(err));
        //this.Loader.hide();
        //this.router.navigate(['/order-status'], { relativeTo: this.route });
      });
  }
}
