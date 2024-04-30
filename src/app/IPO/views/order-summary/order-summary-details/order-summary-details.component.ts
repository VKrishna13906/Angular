import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EncrdecrService } from 'src/app/Auth/encrdecr.service';
import { NotAuthorizedAlertComponent } from 'src/app/IPO/not-authorized-alert/not-authorized-alert.component';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { isNullOrUndefined } from '../../../../validation';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
declare var $: any;
@Component({
  selector: 'app-order-summary-details',
  templateUrl: './order-summary-details.component.html',
  styleUrls: ['./order-summary-details.component.css']
})
export class OrderSummaryDetailsComponent implements OnInit {

  ArrBasicDetails: any[] = [];
  clientDPId: string = '';
  ClientID: string = '';
  ClientUPIId: string = '';
  ASBAAccountNo: string = '';
  category: string = '';
  category_SHOW: string = '';
  BidPriceBid1: number = 0;
  NoofSharesBid1: number = 0;
  NoofLotsBid1: number = 0;
  TrinityFlag: string = 'N';
  TotalBidAmount: number = 0;
  TotalBidAmount_Show: number = 0;
  TotalBidQuantity: number = 0;
  IsAgree: boolean = false;
  ArrClientData: any;
  CutOffFlag: any;
  G_ClientBasicInfoId: any = '';
  IPO_CurrentListData: any[] = [];
  IsShowDpid: boolean = true;
  ArrBidDetails: any = [];
  PaymentMode : any = "";
  IsMessgeSufficient:string="0";
  ArrMonthName = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  NewFlag:any ="";
  modalRef?: BsModalRef;
  allowCutoff: number = 0;
  constructor(private EncrdecrService: EncrdecrService,
    private iposervice: IPOServiceService,
    private Loader: CustomLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,private hireasdkask :  JksdgfuehdnoService) { }

  ngOnInit() {
debugger
    this.Loader.show();

    if (sessionStorage.getItem('dfsfsefcdvgdrter6456dg') != null && sessionStorage.getItem('dfsfsefcdvgdrter6456dg') != undefined) {
      this.allowCutoff = +sessionStorage.getItem('dfsfsefcdvgdrter6456dg');
    }

    sessionStorage.setItem("pshreuuddjkaeun",'1')
    console.log('session= '+ sessionStorage.getItem("kfnekfmcejfem"));
    this.PaymentMode = sessionStorage.getItem("kfnekfmcejfem");
    
    if (this.allowCutoff == 1) {
      if (this.PaymentMode == 0) {
        this.CallIPOSpecialModal("Funds will be blocked in your bank account on 1st March, post successful fund block application will be processed with Exchange.")
      } else if (this.PaymentMode == 1) {
        this.CallIPOSpecialModal("You will receive UPI Mandate Authentication request for your application on 1st March.")
      }
    }
    //Asba - 0
    //UPI - 1

    let trinity: any = sessionStorage.getItem('cfhf5@6nS$vxhb=');
    this.TrinityFlag = trinity;
    let cbid = sessionStorage.getItem('UZT6qHaDZSz66kx')
    if (cbid != undefined && cbid != null && cbid != '') {
      this.G_ClientBasicInfoId = sessionStorage.getItem('UZT6qHaDZSz66kx');
    }
    let cid: any = sessionStorage.getItem('nsd#d@l;d*g#hjb');
    if (cid != undefined && cid != null) {
      cid = cid
      let d = sessionStorage.getItem('cd&jdk#2R5nk4@jfs');
      if (d != undefined && d != null) {
        this.IPO_CurrentListData = JSON.parse(d);
        let data = this.IPO_CurrentListData.find(arr => arr.COMPANY_ID == cid);
        if (data != undefined) {
          let bd: any = {};
          bd.COMPANY_NAME = data.COMPANY_NAME;
          bd.CompId = data.COMPANY_ID;
          bd.SCRIPID = data.SCRIPID;
          bd.LowerPriceBand = data.LowerPriceBand;
          bd.UpperPriceBand = data.UpperPriceBand;
          bd.BidLot = data.BidLot;
          bd.IssueStartDateDisplay = data.IssueStartDateDisplay;
          bd.IssueEndDateDisplay = data.IssueEndDateDisplay;
          bd.TotalSize = data.TotalSize;
          this.ArrBasicDetails.push(bd);
         sessionStorage.setItem('jkhg$8fsdnL9Hgfsdhjfh', JSON.stringify(this.ArrBasicDetails));
        }
        var loaderInterval = setInterval(() => {
          let str = document.readyState;
          if (str == 'complete') {
            this.Loader.hide();
            clearInterval(loaderInterval)
          }
        }, 1000);
      }
    }

    let cat = sessionStorage.getItem('gdfgg(%fgshgd=');
    sessionStorage.setItem('gdfgg(%fgshgd=2f2', cat);
    if (cat != null && cat != undefined) {
      let c = JSON.parse(cat);
      this.category = c.VALUEFIELD;
      this.category_SHOW = c.TEXTFIELD;
      if(this.category == 'HNI'){
        sessionStorage.setItem('uytewknc','HNI')
      }else{
        sessionStorage.setItem('uytewknc', 'jgas');
      }
    }
    //
    let pd: any = sessionStorage.getItem('fdfsdf*%gsdfhdf=');
    sessionStorage.setItem('fdfsdf*%gsdfhdf=2g2', pd)
    if (pd != undefined && pd != null) {
      pd = pd;
      this.ArrBidDetails = JSON.parse(pd);
      this.ArrBidDetails.map(arr => {
        arr.NoofSharesBid1 = Number(arr.NoofLotsBid1 * arr.BidLot);
      });
      this.TotalBidAmount = this.ArrBidDetails.reduce((t, per) => t + per.totalBidAmountBid1, 0);
      this.TotalBidQuantity = this.ArrBidDetails.reduce((t, per) => t + per.NoofSharesBid1, 0);

      let se = JSON.parse(pd);
      let mm = se.sort((a, b) => b.totalBidAmountBid1 - a.totalBidAmountBid1)[0];
      this.TotalBidAmount_Show = mm.totalBidAmountBid1;
      console.log(this.ArrBidDetails)
    }
    let u: any = sessionStorage.getItem('dfsd*sdfsd$dg=');
    if (u != undefined && u != null && u != '') {
      let r = JSON.parse(u);
      this.ClientUPIId = r.name + r.handler;
    }
    let cd: any = sessionStorage.getItem('dfushgucdslnsdl');
    if (cd != undefined && cd != null) {
      cd = cd
      cd = JSON.parse(cd);
      if (cd.nsdlcdsl == 'NSDL') {
        this.IsShowDpid = true;
      }
      else {
        this.IsShowDpid = false;
      }
      this.clientDPId = cd.ClientDPID;
      this.ClientID = cd.ClientID;
    }
    this.GetClientData();
    $(document).keyup(function(e) {
      if(e.keyCode==13){
          if(!$(e.target).closest('.modal fade in').length) {
              $('.modal').each(function(){
                $('.modal').modal('hide');
             });
          }
      }
    });
  }
  GetClientData() {
    let d = sessionStorage.getItem('mhsd#d@l;d*g#hjb');
    if (d != undefined && d != null) {
      this.ArrClientData = JSON.parse(d);
      if (this.ArrClientData.objIPOBD != null && this.ArrClientData.objIPOBD.length > 0) {
        this.ASBAAccountNo = this.ArrClientData.objIPOBD[0].BankAccountNo;
      }
    }
  }
  OnClickPlaceOrder() {
    debugger
    this.Loader.show();
    let OldAmount: any;
    this.PaymentMode = sessionStorage.getItem('kfnekfmcejfem');
    if(!isNullOrUndefined(sessionStorage.getItem('pReV#uihfenkj&*d')))
    {
      OldAmount= sessionStorage.getItem('pReV#uihfenkj&*d');
    } 
    else
    {
      //some time above the session doesn't fetch the data
      OldAmount = sessionStorage.getItem('getPayableAmount');
    }
    let pd = this.ArrClientData.objIPOClientPD[0];
    let ud = this.ArrClientData.objUPIDet[0];
    let dd = this.ArrClientData.objIPOClientDD[0];
    let category = this.category;
    if (this.PaymentMode =='1') {
      let ACTIONCODE = 'N';
      let ApplicationNo = "";
      let BidId = "";
      if (sessionStorage.getItem('gjh$jbLjk') == "1") {
        let d = sessionStorage.getItem('lfdhW&<kGtP*nh');
        if (d != undefined && d != null && d != '') {
          let rr = JSON.parse(d);
          ApplicationNo = rr.ApplicationNo;
          BidId = rr.BidID;
          if (BidId != '' && BidId != null && BidId != undefined 
            && ApplicationNo != '' &&
            ApplicationNo != null && ApplicationNo != undefined) {
            ACTIONCODE = 'M';
          }
          else if((BidId == '' || BidId == null || BidId == undefined)
          && ApplicationNo != '' &&
          ApplicationNo != null && ApplicationNo != undefined){
            ACTIONCODE = 'M';
          }
        }
      }
      let request: any = {
        "IssueType": 'I',
        "BIDID": BidId,
        "ACTIONCODE": ACTIONCODE,
        "APPLICATIONNO": ApplicationNo,
        "APPLICANTNAME": pd.FirstApplicant,
        "CATEGORY": category,
        "CHEQUEAMOUNT": this.TotalBidAmount,
        "COMPANY_ID": this.ArrBasicDetails[0].CompId,
        "DPID": dd.DPID,
        "CLIENTID": dd.ClientID,
        "DPType": dd.NSDLCDSL,
        "PANNO": pd.FirstApplicantPAN,
        "QUANTITY": this.TotalBidQuantity,
        "RATE": this.ArrBidDetails[0].bidPriceBid1,
        "SCRIPID": this.ArrBasicDetails[0].SCRIPID,
        "UPIID": this.ClientUPIId,
        "LOCATION": "",
        "BANKACCOUNT": "",
        "BANKCODE": "",
        "SERIES": "",
        "SrNo": pd.clientdataSrNo,
        "SubbrokerCode": pd.SubbrokerCode,
        "EmpCode": pd.EmpCode,
        "Message": "",
        "NONASBA": "",
        "ORDERNO": "",
        "BidFrom": "",
        "CreatedBy": this.G_ClientBasicInfoId,
        "MobileNo": pd.Mobile,
        "CutOffFlag": this.ArrBidDetails[0].CutOffFlag
      }
      let thankyou: any = request;
      request = JSON.stringify(request);
      let inputdata: any = {
        data: request
      }
      this.iposervice.IPONCDBiding(inputdata, 'IPO').subscribe(res => {
        this.Loader.hide();
        debugger
        if (res.Message.toLowerCase().includes('not authorized')) {
          let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
        }
        else{
          let r = JSON.parse(res.Message);
          if (res.ID > 0) {
            if (r.ID > 0) {
              sessionStorage.removeItem('gjh$jbLjk');
              thankyou.APPLICATIONNO = r.Refference_No;
              sessionStorage.setItem('jkhg$8fsdnL9Hg', JSON.stringify(thankyou));
              this.router.navigateByUrl('/ipo/thank-you-upi');
            }
            else {
              this.CallIPOModal(r.Message);
            }
          }
          else {
            this.CallIPOModal(r.Message);
          }
        }
        
      },
        err => {
          this.Loader.hide();
          console.log(err)
        });
    }
    if(this.TrinityFlag == 'Y'){
      if(this.PaymentMode == '0') {
        //
        let BidDetails: any = [];
        this.ArrBidDetails.map(arr => {
          let rr: any = {};
          rr.asbaid = arr.asbaid;
          rr.actioncode = arr.ActionCode;
          rr.cuttoffflag = arr.CutOffFlag;
          rr.bidid = arr.bidid;
          rr.quantity = arr.NoofSharesBid1;
          rr.rate = arr.bidPriceBid1;
          rr.amount = arr.totalBidAmountBid1;
          BidDetails.push(rr);
        });
        let ArrBid = BidDetails.map(a => a.bidid);
        let isBlankBid = this.CheckAllBlanks(ArrBid);
        let ACTIONCODE = 'N';
        let ApplicationNo = "";
        if (sessionStorage.getItem('gjh$jbLjk') == "1") {
          let d = sessionStorage.getItem('lfdhW&<kGtP*nh');
          if (d != undefined && d != null && d != '') {
            let rr = JSON.parse(d);
            ApplicationNo = rr.ApplicationNo;
            let dt = JSON.parse(OldAmount)
            const h = dt.length > 0 ? dt.sort((a, b) => b.Amount - a.Amount)[0] : dt;
            if (!isBlankBid && ApplicationNo != '' && ApplicationNo != null && ApplicationNo != undefined) {
              ACTIONCODE = 'M';          
              // if (this.TotalBidAmount >= (JSON.parse(OldAmount)[0])) {
              if (this.TotalBidAmount_Show >= (h)) {
              this.NewFlag='N';
              }
              else{
                this.NewFlag='A2';
              }
            }
            else if (isBlankBid && ApplicationNo != '' && ApplicationNo != null && ApplicationNo != undefined) {
              ACTIONCODE = 'M';
              // if (this.TotalBidAmount >= (JSON.parse(OldAmount)[0])) {
              if (this.TotalBidAmount_Show >= (h)) {
              this.NewFlag='N';
              }
              else{
                this.NewFlag='A2';
              }
            }
          }
        }
        if(ACTIONCODE == "N")
        {
          this.NewFlag= 'A';
        }
        let request: any = {
          "IssueType": "I",
          "BIDID": "",
          "ACTIONCODE": ACTIONCODE,
          "APPLICATIONNO": ApplicationNo,
          "APPLICANTNAME": pd.FirstApplicant,
          "CATEGORY": category,
          "CHEQUEAMOUNT": 0,
          "COMPANY_ID": this.ArrBasicDetails[0].CompId,
          "DPID": dd.DPID,
          "CLIENTID": dd.ClientID,
          "DPType": dd.NSDLCDSL,
          "PANNO": pd.FirstApplicantPAN,
          "QUANTITY": 0,
          "RATE": 0,
          "SCRIPID": this.ArrBasicDetails[0].SCRIPID,
          "UPIID": "",
          "LOCATION": this.ArrClientData.objIPOBD[0].LocationCode,
          "BANKACCOUNT": this.ASBAAccountNo,
          "BANKCODE": this.ArrClientData.objIPOBD[0].BankASBACode,
          "SERIES": "",
          "SrNo": pd.clientdataSrNo,
          "SubbrokerCode": pd.SubbrokerCode,
          "Message": "",
          "NONASBA": "1",
          "ORDERNO": "",
          "BidFrom": "",
          "CreatedBy": this.G_ClientBasicInfoId,
          "MobileNo": pd.Mobile,
          "CutOffFlag": 1,
          "bids": BidDetails,
          "NewFlag": this.NewFlag
        }
        let thankyou: any = request;
        request = JSON.stringify(request);
        let inputdata: any = {
          data: request
        }
        
          debugger;
          this.iposervice.PostASBAOrder(inputdata).subscribe(res => {
            this.Loader.hide();
            
            if (res.Message.toLowerCase().includes('not authorized')) {
              let ngbModalOptions: NgbModalOptions = {
                backdrop: 'static',
                keyboard: false
              };
              this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
            }
            else if (res.Message == "Exception Occurred" || res.Message == "Response Not Received from Main API") {
              this.CallIPOModal("Your order couldn't be processed.");
            }
            else {
              this.Loader.show();
              let r = JSON.parse(res.Message);
              if (res.ID > 0) {
                if (r.ID > 0) {
                  sessionStorage.removeItem('gjh$jbLjk');
                  thankyou.APPLICATIONNO = r.Refference_No;
                  thankyou.CHEQUEAMOUNT = this.TotalBidAmount_Show;
                  thankyou.NewFlag = r.Message;
                  sessionStorage.setItem('jkhg$8fsdnL9Hg', JSON.stringify(thankyou));
                  this.router.navigateByUrl('/order-result');
                }
                else {
                  
                  if (r.Message.toLowerCase().includes('insufficient')) {
                    this.IsMessgeSufficient = '1';
                  }
                  this.Loader.hide();
                  this.CallIPOModal(r.Message);
                }
              }
              else {
                
                if (r.Message.toLowerCase().includes('insufficient')) {
                  this.IsMessgeSufficient = '1';
                }
                this.Loader.hide();
                this.CallIPOModal(r.Message);
              }
            }
          },
            err => {
              this.Loader.hide();
              console.log(err);
              this.CallIPOModal("Your order couldn't be processed.");
            });
        
      }
    }
  }
  CheckAllBlanks(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== "") return false;
    }
    return true;
  }
  OnChangeTC(e) {
    
    this.IsAgree = !this.IsAgree;
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
  
  ConvertToShortDate(ipd) {
    let r1 = ipd.getDate();
    let r2 = ipd.getMonth() + 1;
    let r3 = ipd.getFullYear();
    return `${r1}/${r2}/${r3}`;
  }
 // ChangeDateFormat(inputDate) {
  //  let d = inputDate.substring(0, 10);
  //  let r = d.split('-');
  //  let m = parseInt(r[1]) - 1;
   // return `${r[2]} ${this.ArrMonthName[m]}`;
   // //return `${r[2]}-${r[1]}-${r[0].substring(2, 4)}`;
 // }
  ShowTCPopup() {
    $("#TCModal").modal({
      backdrop: 'static',
      keyboard: false
    });
  }
  onCloseTC(){
    ;
    console.log(this.IsAgree)
  }
}
