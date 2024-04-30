import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { EncrdecrService } from '../../../../../Auth/encrdecr.service';
declare var $: any;
@Component({
  selector: "app-ipo-applications",
  templateUrl: "./ipo-applications.component.html",
  styleUrls: ["./ipo-applications.component.css"],
})
export class IpoApplicationsComponent implements OnInit {
  @Input() InputData: any[] = [];
  //@Output() MyApplicationCount: EventEmitter<any> = new EventEmitter()
  data: any[] = [];
  ArrASBAdata: any[] = [];
  ArrMonthName = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  ShowRecordCount:number = 0;
  constructor(private Loader: CustomLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private iposervice : IPOServiceService,
    private EncryptionService : EncrdecrService) { }

  ngOnInit() {
    
    var loaderInterval = setInterval(() => {
      let str = document.readyState;
      let rr = this.InputData;
      if (str == 'complete' && rr.length > 0) {
        rr.map(arr => {
          if (arr.DateOfApplication != '' && arr.DateOfApplication != null) {
            arr.DisplayDateOfApplication = this.ConvertDateFormate(arr.DateOfApplication);
          }
          else {
            arr.DisplayDateOfApplication = '';
          }

          let r = arr.IssueEndDate.split('T')[0];
          let rr = `${r}T${arr.IssueAcceptanceTime}`;
          let s = arr.BidStatus.toLowerCase();
          if (+new Date(rr) >= +new Date()) {
            if (s == "bid cancelled by client" || s == 'bid rejected' || s.toLowerCase().includes('cancellation') || s.toLowerCase().includes('reject')) {
              arr.IsShowButtons = false;
            }
            else {
              arr.IsShowButtons = true;
            }
          }
          else {
            arr.IsShowButtons = false;
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
          if (s == "bid cancelled by client" || s == "bid rejected" || s == "upi mandate rejected due to other reason" || s.toLowerCase().includes('cancellation')
            || s == "upi mandate declined by client" || s=="not-allotted") {
            arr.BidColor = 'BidCancelled'
          }
          else if(s == 'pending for bid'){
            arr.BidColor = 'BidPending'
          }
          else{
            arr.BidColor = 'BidSuccess'
          }
          if(s.includes('accept') || s.includes('success'))
          {
            arr.BidColor = 'BidSuccess';
          }
          else if(s.includes('reject') || s.includes('fail'))
          {
            arr.BidColor = 'BidCancelled'
          }
          else if(s.includes('pending'))
          {
            arr.BidColor = 'BidPending';
          }
        });
        this.data = rr;
        //
        debugger
        this.data.map(arr => {
          debugger
          let rr: any = {};
          rr.DisplayDateOfApplication = arr.DisplayDateOfApplication;
          rr.BidStatus = arr.BidStatus;
          rr.CompanyName = arr.CompanyName;
          rr.CATEGORY_SHOW = arr.CATEGORY_SHOW;
          rr.IsShowButtons = arr.IsShowButtons;
          rr.BidColor = arr.BidColor;
          rr.IsShowLoadMore = false;
          
          if (arr.ASBAType == 1) {
            if (arr.asba != undefined && arr.asba != null) {
              // let ArrASBA = arr.asba.filter(a => a.ActionCode != 'D');
              let ArrASBA = arr.asba;
              if (ArrASBA != undefined && ArrASBA != null) {
                if (ArrASBA.length > 0) {
                  const h = ArrASBA.sort((a, b) => b.Amount - a.Amount)[0];
                  rr.Amount = h.Amount;//Math.max.apply(Math, asba.map(function (k) { return k.Amount }))
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
          if (rr.BidStatus == "Cancelled") {
            rr.BidColor = "BidCancelled";
            rr.IsShowButtons = false;
          }

          //if(rr.Amount > 0){
          this.ArrASBAdata.push(rr);
          //}
        })
        //this.MyApplicationCount.emit(this.ArrASBAdata.length);
        this.ShowRecordCount = 2;
        this.Loader.hide();
        clearInterval(loaderInterval)
      }
    }, 1000);
  }
  ConvertDateFormate(date: string) {
    let d = (date.split('T'))[0].split('-');
    let m = parseInt(d[1]) - 1;
    return `${d[2]} ${this.ArrMonthName[m]} ${d[0]}`;
  }
  CallAlertModal(msg: any) {
    $("#AlertModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#AlertModalContent').text(msg);
  }
  // OpenCompanyURL(data) {
  //   if (data != undefined && data != null && data != '') {
  //     window.open(`${data}`, '_blank');
  //   } else {
  //     this.CallAlertModal('Company details not found.');
  //   }
  // }
  OnClickModify(i) {
    debugger;
    let data = this.data[i]
    sessionStorage.setItem('lfdhW&<kGtP*nh', JSON.stringify(data));
    if(data.ASBAType== 1) {
      let data_of_resp:any
      this.iposervice.GetIns_Mod_Del_BIDFLAG(data).subscribe((res :any)=>{//added by adarsh
        let resp_data = JSON.parse((res));
     data_of_resp = resp_data.ArrayOfResponse[0]
      console.log( data_of_resp);
      if ( data_of_resp!=null &&  data_of_resp.rev_flag =='Y')
      {
        this.router.navigate(['/order-status'], { relativeTo: this.route });
      }
      else{
        alert('ModifyBid time is exceeded')
        this.router.navigate(['/ipo'], { relativeTo: this.route });
      }
      })
    }
    else{
      //this.router.navigate(['/order-status'], { relativeTo: this.route }); //same things is added For UPI Added by adarsh
      let data_of_resp:any
      this.iposervice.GetIns_Mod_Del_BIDFLAG(data).subscribe((res :any)=>{
        let resp_data = JSON.parse((res));
     data_of_resp = resp_data.ArrayOfResponse[0]
      console.log( data_of_resp);
      if ( data_of_resp!=null &&  data_of_resp.rev_flag=='Y')
      {
        this.router.navigate(['/order-status'], { relativeTo: this.route });
      }
      else{
        alert('ModifyBid time is exceeded')
        this.router.navigate(['/ipo'], { relativeTo: this.route });
      }
      })
    }
  }
  LoadMoreData() {
      this.ShowRecordCount = this.ShowRecordCount + 2;
    } 
    
}
