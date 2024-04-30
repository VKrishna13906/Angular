import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';
import { EncrdecrService } from "src/app/Auth/encrdecr.service";
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { NotAuthorizedAlertComponent } from '../../not-authorized-alert/not-authorized-alert.component';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { isNullOrUndefined } from '../../../validation';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
declare var $: any;
@Component({
  selector: "app-order-status",
  templateUrl: "./order-status.component.html",
  styleUrls: ["./order-status.component.css"],
})
export class OrderStatusComponent implements OnInit {
  heading: string = "Application Details";
  link: string = "order-placement";
  data: any;
  flag : any;
  ArrClientData: any;
  G_ClientBasicInfoId: any = '';
  BidPriceBid1: number = 0;
  NoofSharesBid1: number = 0;
  NoofLotsBid1: number = 0;
  TotalBidAmount: number = 0;
  CutOffFlag: any;
  DeleteOrder: boolean = false;
  IsShowButtons: boolean = false;
  ArrASBA: any[] = [];
  ArrASBADelet: any[] = [];
  HideWithdrow: boolean = false;
  modalRef?: BsModalRef;
  data_of_resp: any;
  IsNewApplicationAllow: string;
  IsModifyApplicationAllow: string;
  IsCancelApplicationAllow: string;
  ApplicationNo: any;
  CompanyId: any;
  CompanyName: any;
  constructor(private Loader: CustomLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private EncrdecrService: EncrdecrService,
    private iposervice: IPOServiceService,
    private modalService: BsModalService,
    private hireasdkask :  JksdgfuehdnoService) { }

  ngOnInit() {
    debugger
    //history.pushState(null, null, window.location.href);
    //history.back();
    //window.onpopstate = () => history.forward();
    
    let d = sessionStorage.getItem('lfdhW&<kGtP*nh');
    if (d != undefined && d != null && d != '') {
      this.data = JSON.parse(d);
      this.CompanyId = this.data.COMPANY_ID;
      this.CompanyName = this.data.CompanyName;
      this.ApplicationNo = this.data.ApplicationNo;
      if (this.data.CATEGORY == 'HNI') {
        this.HideWithdrow = true;
      }
      else {
        if (this.data.CATEGORY == 'SHA') {
          if (this.data.ASBAType == 1) {
            let asba = this.data.asba;
            let m = asba.filter(a => a.Amount > 200000);
            if (m.length > 0) {
              this.HideWithdrow = true;
            }
            else {
              this.HideWithdrow = false;
            }
          }
          else {
            if (this.data.Amount > 200000) {
              this.HideWithdrow = true;
            }
            else {
              this.HideWithdrow = false;
            }
          }
        }
      }
      let arr = this.data;
      let r = arr.IssueEndDate.split('T')[0];
      let rr = `${r}T${arr.IssueAcceptanceTime}`;
      if (+new Date(rr) >= +new Date()) {
        if (arr.BidStatus.toLowerCase() == "bid cancelled by client" || arr.BidStatus.toLowerCase() == 'bid rejected' || arr.BidStatus.toLowerCase().includes('cancellation')) {
          this.IsShowButtons = false;
        }
        else {
          this.IsShowButtons = true;
        }
      }
      else {
        this.IsShowButtons = false;
      }

      this.GetClientData();
      this.getFlags();
      let cbid = sessionStorage.getItem('UZT6qHaDZSz66kx')
      if (cbid != undefined && cbid != null && cbid != '') {
        this.G_ClientBasicInfoId = (sessionStorage.getItem('UZT6qHaDZSz66kx'));
      }
      //
      if (this.data.ASBAType != undefined && this.data.ASBAType != null && this.data.ASBAType != 0) {
        let BidLot = this.data.BidLot;
        if (this.data.asba != undefined && this.data.asba != null) {

          this.data.asba.map(arr => {
            if (arr.CutOffFlag == 1) {
              arr.CutOffFlagShow = true
            }
            else {
              arr.CutOffFlagShow = false
            }
            if (BidLot != 0) {
              arr.NoofLotsBid1 = (arr.Quantity / BidLot);
              arr.BidLot = BidLot;
            }
            else {
              arr.NoofLotsBid1 = '';
              arr.BidLot = 0;
            }
          });
          if (this.data.CATEGORY == 'SHA') {
            this.ArrASBA = this.data.asba.filter(a => (a.ActionCode != "D") && a.Amount <= 200000);
          }
          else {
            this.ArrASBA = this.data.asba.filter(a => a.ActionCode != "D");
          }
        }

      }

      let rrr = this.data;
      this.TotalBidAmount = rrr.Amount;
      this.NoofLotsBid1 = (rrr.Quantity / rrr.BidLot);
      this.NoofSharesBid1 = rrr.Quantity;
      this.BidPriceBid1 = rrr.Price;
      this.CutOffFlag = rrr.CutOffFlag;
      //sessionStorage.setItem('sfdfsdfsddfgdfdf=',this.hireasdkask.setPageNotFound(this.BidPriceBid1.toString()));
    }
    else {
      this.router.navigate(['/ipo'], { relativeTo: this.route });
    }

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

  getFlags() {

  let json = {
    ApplicationNo: this.ApplicationNo,
    CompanyId : this.CompanyId,
  }
  this.iposervice.ASBAOrderStatus(json).subscribe(response => {debugger
    let res = JSON.parse((response));
    let data = res.ArrayOfResponse[0];
    this.IsModifyApplicationAllow = data.IsModifyApplicationAllow;
    this.IsNewApplicationAllow = data.IsNewApplicationAllow;
    this.IsCancelApplicationAllow = data.IsCancelApplicationAllow;
  })
}
  GetClientData() {
    this.Loader.show();
    let pan = sessionStorage.getItem('gjhfHunj#n&fdgh'); //'DDJPS6803R'
    let ClientCode = '';
    let c = sessionStorage.getItem('gjhfHunj#n&fdghcod');
      if (c != undefined && c != null && c != '') {
        ClientCode = c;
      }
    if (pan != null && pan != undefined && pan != '') {
      this.iposervice.GetIPOClientDetails(pan, "", "", ClientCode).subscribe(res => {
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
            let rr = JSON.parse(res.Message);
            this.ArrClientData = rr[0];
            sessionStorage.setItem('mhsd#d@l;d*g#hjb',JSON.stringify(rr[0]));
            if (this.ArrClientData.objIPOBD.length > 0) {
              sessionStorage.setItem('buvbe#jbY', this.ArrClientData.objIPOBD[0].BankAccountNo);
            }
          }
        }
        
      },
        err => {
          localStorage.setItem('IpoClientdetailErr', JSON.stringify(err));
          this.Loader.hide();
        });
    }
    else {
      this.Loader.hide();
      this.router.navigate(['/'], { relativeTo: this.route });
    }
  }

  // OnClickModify() {
  //   let trinity = ''
  //   if (this.data.ASBAType == 0) {
  //     trinity = 'N'
  //   }
  //   else {
  //     trinity = 'Y'
  //   }
  //   sessionStorage.setItem('cfhf5@6nS$vxhb=', this.hireasdkask.setPageNotFound(trinity)); // beneficiaryStatus
  //   sessionStorage.setItem('nsd#d@l;d*g#hjb', this.hireasdkask.setPageNotFound(this.data.COMPANY_ID));
  //   sessionStorage.setItem('nsd#d@l;d*g#hjb222', this.hireasdkask.setPageNotFound(JSON.stringify(this.data)));
  //   sessionStorage.setItem('gjh$jbLjk', "1");
  //   this.router.navigate(['/order-placement'], { relativeTo: this.route });
  // }
  // OnClickWithdraw() {
  //   this.Loader.show();
  //   this.DeleteOrder = false;
  //   let d = this.data;
  //   if (d.ASBAType != 1) {
  //     let pd = this.ArrClientData.objIPOClientPD[0];
  //     let dd = this.ArrClientData.objIPOClientDD[0];
  //     console.log(d);

  //     let request:any = {
  //       "IssueType": 'I',
  //       "BIDID": d.BidID,
  //       "ACTIONCODE": "D",
  //       "APPLICATIONNO": d.ApplicationNo,
  //       "APPLICANTNAME": pd.FirstApplicant,
  //       "CATEGORY": this.data.CATEGORY,
  //       "CHEQUEAMOUNT": d.Amount,
  //       "COMPANY_ID": d.COMPANY_ID,
  //       "DPID": dd.DPID,
  //       "CLIENTID": dd.ClientID,
  //       "DPType": dd.NSDLCDSL,
  //       "PANNO": pd.FirstApplicantPAN,
  //       "QUANTITY": d.Quantity,
  //       "RATE": this.BidPriceBid1,
  //       "SCRIPID": d.SCRIPID,
  //       "UPIID": d.UPIID,
  //       "LOCATION": "",
  //       "BANKACCOUNT": "",
  //       "BANKCODE": "",
  //       "SERIES": "",
  //       "SrNo": pd.clientdataSrNo,
  //       "SubbrokerCode": pd.SubbrokerCode,
  //       "EmpCode": pd.EmpCode,
  //       "Message": "",
  //       "NONASBA": "",
  //       "ORDERNO": "",
  //       "BidFrom": "",
  //       "CreatedBy": this.G_ClientBasicInfoId,
  //       "MobileNo": pd.Mobile,
  //       "CutOffFlag": this.CutOffFlag
  //     }
  //     request = JSON.stringify(request);
  //     let inputdata: any = {
  //       data: this.hireasdkask.setPageNotFound(request)
  //     }
  //     this.iposervice.IPONCDBiding(inputdata, 'IPO').subscribe(res => {
  //       this.Loader.hide();
  //       if (res.Message.toLowerCase().includes('not authorized')) {
  //         let ngbModalOptions: NgbModalOptions = {
  //           backdrop: 'static',
  //           keyboard: false
  //         };
  //         this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
  //       }
  //       else{
  //         let r = JSON.parse(this.hireasdkask.getPageNotFound(res.Message));
  //         if (res.ID > 0) {
  //           if (r.ID > 0) {
  //             this.DeleteOrder = true;
  //           }
  //           this.CallIPOModal(r.Message);
  //         }
  //         else {
  //           this.CallIPOModal(r.Message);
  //         }
  //       }
        
  //     },
  //       err => {
  //         this.Loader.hide();
  //         console.log(err)
  //       });
  //   }
  //   else {
  //     if (d.asba != null && d.asba != undefined) {
  //       if (this.ArrASBA.length > 1) {
  //         $("#ArrASBAModal").modal({
  //           backdrop: 'static',
  //           keyboard: false
  //         });
  //         this.Loader.hide();
  //       }
  //       else {
  //         this.WithdrawASBA(0);
  //       }
  //     }
  //   }
  // }

  OnClickModify() {
    debugger;
    let trinity = ''
    if(this.IsModifyApplicationAllow == 'N' && !isNullOrUndefined(this.IsModifyApplicationAllow))
    {
      this.CallIPOModal("Your order request for "+ this.CompanyName +" could not be processed due to an internal error. Kindly get in touch with our toll free number 18002099191");
    }else{
    if (this.data.ASBAType == 0) {
      trinity = 'N'
      this.flag='0'
    }
    else {

      trinity = 'Y'
      this.flag='1'
    }
    sessionStorage.setItem('cfhf5@6nS$vxhb=', trinity); // beneficiaryStatus
    sessionStorage.setItem('nsd#d@l;d*g#hjb', (this.data.COMPANY_ID));
    sessionStorage.setItem('nsd#d@l;d*g#hjb222', JSON.stringify(this.data));
    sessionStorage.setItem('hasdfhuirec',JSON.stringify(this.data));
    sessionStorage.setItem('gjh$jbLjk', "1");
    sessionStorage.setItem("kfrisnekfmcejfem", 'M')
     let JSondata:any=
     {
      "COMPANY_ID" :  this.data.COMPANY_ID,//added by adarsh
        "CATEGORY": this.data.CATEGORY,//added by adarsh
        "flag": this.flag//added by adarsh
     }
   
    this.iposervice.GetIns_Mod_Del_BIDFLAG(JSondata).subscribe((res :any)=>{     
      let resp_data = JSON.parse((res));
       if (resp_data.ArrayOfResponse[0]!=null && resp_data.ArrayOfResponse[0].rev_flag =='Y')
       {
             this.router.navigate(['/order-placement'], { relativeTo: this.route });
       }
       else{
         alert('ModifyBid time is exceeded')
         this.router.navigate(['/ipo'], { relativeTo: this.route });
       }
       })
      }
  }
  OnClickWithdraw() {
    debugger
    if (this.IsCancelApplicationAllow == 'N' && !isNullOrUndefined(this.IsCancelApplicationAllow)) {
      this.CallIPOModal("Your order request for " + this.CompanyName + " could not be processed due to an internal error. Kindly get in touch with our toll free number 18002099191");
    } else {
      this.Loader.show();
      this.DeleteOrder = false;
      let d = this.data;
      if (d.ASBAType != 1) {
        let pd = this.ArrClientData.objIPOClientPD[0];
        let dd = this.ArrClientData.objIPOClientDD[0];
        console.log(d);
        let json: any = {//added by adarsh
          "CATEGORY": this.data.CATEGORY,
          "COMPANY_ID": d.COMPANY_ID,
          "flag": '0'
        }
        this.iposervice.GetIns_Mod_Del_BIDFLAG(json).subscribe((res: any) => { 
          debugger//ADDED BY ADARSH 
          let data_resp = JSON.parse((res));
          if (data_resp.ArrayOfResponse[0].rev_flag == 'Y') {
            let request: any = {
              "IssueType": 'I',
              "BIDID": d.BidID,
              "ACTIONCODE": "D",
              "APPLICATIONNO": d.ApplicationNo,
              "APPLICANTNAME": pd.FirstApplicant,
              "CATEGORY": this.data.CATEGORY,
              "CHEQUEAMOUNT": d.Amount,
              "COMPANY_ID": d.COMPANY_ID,
              "DPID": dd.DPID,
              "CLIENTID": dd.ClientID,
              "DPType": dd.NSDLCDSL,
              "PANNO": pd.FirstApplicantPAN,
              "QUANTITY": d.Quantity,
              "RATE": this.BidPriceBid1,
              "SCRIPID": d.SCRIPID,
              "UPIID": d.UPIID,
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
              "CutOffFlag": this.CutOffFlag,

            }
            request = JSON.stringify(request);
            let inputdata: any = {
              data: (request)
            }
            debugger
            this.iposervice.IPONCDBiding(inputdata, 'IPO').subscribe(res => {
              debugger
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
                    this.DeleteOrder = true;
                  }
                  if(r.Message.includes('BID ENTRY HAS CANCELLED.'))
                  {
                    let data = r.Message.split(' ').pop();
                    this.CallIPOModal('BID ENTRY CANCELLED. BID ID: '+ data);
                  }
                  else
                  {
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
          else {
            alert('Withdrawal time is exceeded')//added by adarsh
            this.router.navigate(['/ipo'], { relativeTo: this.route });
          }
        });

      }
      else {
        let json: any = {//added by adarsh
          "CATEGORY": this.data.CATEGORY,
          "COMPANY_ID": d.COMPANY_ID,
          "Flag": '1'
        }
        //json = JSON.stringify(json)
        if (d.asba != null && d.asba != undefined) { //added by adarsh
          this.iposervice.GetIns_Mod_Del_BIDFLAG(json).subscribe((res: any) => {
            debugger
            let data_resp = JSON.parse((res));
            if (data_resp.ArrayOfResponse[0].rev_flag == 'Y') {
              let pd = this.ArrASBA.sort((a, b) => a.asbaid - b.asbaid);
              if (this.ArrASBA.length > 1) {
                $("#ArrASBAModal").modal({
                  backdrop: 'static',
                  keyboard: false
                });
		      pd.forEach((a, i)=>{
                this.ArrASBADelet.push(i);
              });
                this.Loader.hide();
              }
              else {
                this.WithdrawASBA(0);
              }
            }

            else {
              alert('Withdrawal time has exceeded!!')
              this.router.navigate(['/ipo'], { relativeTo: this.route });
            }
          })

          // if (this.ArrASBA.length > 1) {
          //   $("#ArrASBAModal").modal({
          //     backdrop: 'static',
          //     keyboard: false
          //   });
          //   this.Loader.hide();
          // }
          // else {
          //   this.WithdrawASBA(0);
          // }
        }
      }

    }
  }

  WithdrawASBA(para) {
    debugger
    this.Loader.show();
    let pd = this.ArrClientData.objIPOClientPD[0];
    let dd = this.ArrClientData.objIPOClientDD[0];
    let d = this.data;
    console.log(d);
    let category = this.data.CATEGORY;
    if (d.asba != null && d.asba != undefined) {
      let BidDetails: any = [];
      this.ArrASBA.map((arr, i) => {
        let rr: any = {};
        rr.asbaid = arr.asbaid;
        rr.actioncode = arr.ActionCode;
        rr.cuttoffflag = arr.CutOffFlag;
        rr.bidid = arr.BidId;
        rr.quantity = arr.Quantity;
        rr.rate = arr.Rate;
        rr.amount = arr.Amount;
        let index = this.ArrASBADelet.indexOf(i);
        if (para == 0) {
          rr.actioncode = "D"
          BidDetails.push(rr);
        }
        else {
          if (index != -1) {
            rr.actioncode = "D"
            BidDetails.push(rr);
          }
        }
      });
      let request:any = {
        "IssueType": "I",
        "BIDID": "",
        "ACTIONCODE": 'D',
        "APPLICATIONNO": d.ApplicationNo,
        "APPLICANTNAME": pd.FirstApplicant,
        "CATEGORY": category,
        "CHEQUEAMOUNT": d.Amount,
        "COMPANY_ID": d.COMPANY_ID,
        "DPID": dd.DPID,
        "CLIENTID": dd.ClientID,
        "DPType": dd.NSDLCDSL,
        "PANNO": pd.FirstApplicantPAN,
        "QUANTITY": 0,
        "RATE": 0,
        "SCRIPID": d.SCRIPID,
        "UPIID": "",
        "LOCATION": this.ArrClientData.objIPOBD[0].LocationCode,
        "BANKACCOUNT": this.ArrClientData.objIPOBD[0].BankAccountNo,
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
        "NewFlag": "B2"
      }
      request = JSON.stringify(request);
      let inputdata: any = {
        data: request
      }
      this.iposervice.PostASBAOrder(inputdata).subscribe(res => {
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
              this.DeleteOrder = true;
            }
            this.CallIPOModal(r.Message);
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
  }
  DeleteIndex(i) {
    let index = this.ArrASBADelet.indexOf(i);
    if (index == -1) {
      this.ArrASBADelet.push(i);
    } else {
      this.ArrASBADelet.splice(index, 1);
    }
  }
  CallIPOModal(msg: any) {
    $("#IPOModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#IPOModalContent').text(msg);
  }
}
