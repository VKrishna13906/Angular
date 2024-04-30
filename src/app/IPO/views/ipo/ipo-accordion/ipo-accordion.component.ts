import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotAuthorizedAlertComponent } from 'src/app/IPO/not-authorized-alert/not-authorized-alert.component';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { EncrdecrService } from '../../../../Auth/encrdecr.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
@Component({
  selector: "app-ipo-accordion",
  templateUrl: "./ipo-accordion.component.html",
  styleUrls: ["./ipo-accordion.component.css"],
})
export class IpoAccordionComponent implements OnInit {
  @Input() InputData: any[] = [];
  //bidAddInApp: boolean = false;
  IPO_CurrentListData: any = [];
  IPO_CurrentListData_Length: string = '';
  IPO_ForthcomingListData: any = [];
  IPO_ForthcomingListData_Length: string = '';
  IPO_ClosedListData: any = [];
  AboutTo_ClosedListData: any = [];
  Recentaly_ClosedListData: any = [];
  MyAppCount: any = '0';
  count : number = 0;
  modalRef?: BsModalRef;
  ArrMonthName = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  IsShowUpcomingIPOs: boolean = false;
  IsShowMyApplication: boolean = false;
  IsShowRecentlyListedIPOs: boolean = false;
  HttpRespGot: any;
  DataBindingEnd:any;
  constructor(
    private iposervice: IPOServiceService,
    private Loader: CustomLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private EncrdecrService: EncrdecrService, private modalService: BsModalService,private hireasdkask :  JksdgfuehdnoService,) {
  }

  ngOnInit() {
    sessionStorage.removeItem('dfushgucdslnsdl');
    sessionStorage.removeItem('dfsd*sdfsd$dg=');
    sessionStorage.removeItem('fdfsdf*%gsdfhdf=');
    sessionStorage.removeItem('fdfsdf*%gsdfhdf=2g2');
    sessionStorage.removeItem('gdfgg(%fgshgd=');
    sessionStorage.removeItem('gdfgg(%fgshgd=2f2');
    sessionStorage.removeItem('mhsd#d@l;d*g#hjb');
    sessionStorage.removeItem('cd&jdk#2R5nk4@jfs');
    sessionStorage.removeItem('cfhf5@6nS$vxhb=');
    sessionStorage.removeItem('nsd#d@l;d*g#hjb');
    sessionStorage.removeItem('nsd#d@l;d*g#hjb222');
    sessionStorage.removeItem('gjh$jbLjk');
    sessionStorage.removeItem('gjh$jbLjk2r2');
    sessionStorage.removeItem('gjh$jbLjk2r2nw');
    sessionStorage.removeItem('buvbe#jbY');
    sessionStorage.removeItem('pReV#uihfenkj&*d');
    this.Loader.show();
    //this.getOrderData();
    let pan = sessionStorage.getItem('gjhfHunj#n&fdgh'); //'DDJPS6803R' //
    if (pan != null && pan != undefined && pan != '') {
      let ToDate = new Date();
      let td = new Date();
      let fd = new Date(td.setMonth(td.getMonth() - 6));
      let obj = {
        "FromDate": this.ConvertToShortDate(fd),
        "ToDate": this.ConvertToShortDate(ToDate)
      }
      let JSONobj = JSON.stringify(obj);
      let HttpCallStart = new Date().getTime();
      debugger
      this.iposervice.GetIPOCompanyDetails(JSONobj).subscribe(resData => {
        let res = JSON.parse((resData));
        this.HttpRespGot = new Date().getTime();
        if (res.Message.toLowerCase().includes('not authorized')) {
          let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
        }
        else {
          debugger
          if (res.ArrayOfResponse.length > 0) {
            let ArrayOfResponseData = res.ArrayOfResponse;
           // sessionStorage.setItem('cd&jdk#2R5nk4@jfs', this.hireasdkask.setPageNotFound(JSON.stringify(ArrayOfResponseData)));
            let CurrentDate = new Date();
            // Ongoing IPO

            this.IPO_CurrentListData = [];
            ArrayOfResponseData[0].objIPONdNCD.map(arr => {
              debugger
              // let s = arr.IssueStartDate.toString().substring(0, 10);
              // let st = new Date(s);
              // let rr = new Date();
              // let r1 = rr.getDate().toString();
              // if (r1.toString().length == 1) {
              //   r1 = "0" + r1;
              // }
              // let r2 = rr.getMonth() + 1;
              // let r3 = rr.getFullYear();
              // let cd = new Date(`${r3}-${r2}-${r1}`);
              //  let e = arr.IssueEndDate.toString().substring(0, 10);
              // let ed = new Date(e);
              // //let ed = +new Date(arr.IssueEndDate.toString().substring(0,10));
              // if (arr.IssueType == 'I' && st <= cd && ed >= cd) {
              //   this.IPO_CurrentListData.push(arr)
              // }
              if (arr.ShowFlag == "Y") {
                this.IPO_CurrentListData.push(arr)
              }
            });
            if (this.IPO_CurrentListData.length > 9) {
              this.IPO_CurrentListData_Length = this.IPO_CurrentListData.length;
            }
            else {
              this.IPO_CurrentListData_Length = '0' + this.IPO_CurrentListData.length;
            }
            //console.log(this.IPO_CurrentListData)
            // Upcoming IPO
            //this.IPO_ForthcomingListData = ArrayOfResponseData[0].objIPONdNCD.filter(atr => (atr.IssueType == 'I' && new Date(atr.IssueStartDate) >= CurrentDate))
            this.IPO_ForthcomingListData = ArrayOfResponseData[0].objIPONdNCD.filter(atr => ((atr.ShowFlag == 'U') || atr.IssueStartDate == '0001-01-01'))
            
            if (this.IPO_ForthcomingListData.length > 9) {
              this.IPO_ForthcomingListData_Length = this.IPO_ForthcomingListData.length;
            }
            else {
              this.IPO_ForthcomingListData_Length = '0' + this.IPO_ForthcomingListData.length;
            }
            console.log(this.IPO_ForthcomingListData)
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
             sessionStorage.setItem('cd&jdk#2R5nk4@jfs', (JSON.stringify(this.IPO_CurrentListData)));
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
            this.DataBindingEnd = new Date().getTime();
          }
          else {
            this.Loader.hide();
          }
        }

      });
      // var loaderInterval = setInterval(() => {
      //   debugger
      //   let str = document.readyState;
      //   if (str == 'complete') {
      //     localStorage.setItem('MyAppData', JSON.stringify(this.InputData))
      //     if (this.InputData.length < 9) {
      //       this.MyAppCount = `0${this.InputData.length}`;
      //     }
      //     else {
      //       this.MyAppCount = this.InputData.length;
      //     }
      //     localStorage.setItem('HttpCallStart', `${HttpCallStart}`)
      //     localStorage.setItem('HttpRespGot', `${this.HttpRespGot}`)
      //     localStorage.setItem('HTTPDataBindingEnd', `${this.DataBindingEnd}`)
      //     localStorage.setItem('PageDataBindingEnd', `${JSON.stringify(new Date().getTime())}`);
      //     this.Loader.hide();
      //     clearInterval(loaderInterval)
      //   }
      // }, 1000);

      var loaderInterval = setInterval(() => {
        debugger
        let str = document.readyState;
        if (str == 'complete') {
          //localStorage.setItem('MyAppData', JSON.stringify(this.InputData))
          if (this.InputData.length < 9) {
            this.MyAppCount = `0${this.InputData.length}`;
          }
          else {
            this.MyAppCount = this.InputData.length;
          }
          
          this.count = this.count + 1;
          if (this.InputData.length > 0 || this.count > 9) {
            clearInterval(loaderInterval)
          }
        }
      }, 1000);
    }
    else {
      this.Loader.hide();
      this.router.navigate(['/'], { relativeTo: this.route });
    }
  }
  ShowUpcomingIPOs() {
    this.IsShowUpcomingIPOs = true;
  }
  ShowMyApplication() {
    this.IsShowMyApplication = true;
  }
  ShowRecentlyListedIPOs() {
    this.IsShowRecentlyListedIPOs = true;
  }
  //MyApplicationCount(count) {
  // if (count < 9) {
  //   this.MyAppCount = `0${count}`;
  // }
  // else {
  //   this.MyAppCount = count;
  // }
  //}
  ConvertToShortDate(ipd) {
    let r1 = ipd.getDate();
    let r2 = ipd.getMonth() + 1;
    let r3 = ipd.getFullYear();
    return `${r1}/${r2}/${r3}`;
  }
  ChangeDateFormat(inputDate) {
    let d = inputDate.substring(0, 10);
    let r = d.split('-');
    let m = parseInt(r[1]) - 1;
    return `${r[2]} ${this.ArrMonthName[m]}`;
  }
  ChangeDateFormat3DigitYear(inputDate) {
    let d = inputDate.substring(0, 10);
    let r = d.split('-');
    return `${r[2]}-${r[1]}-${r[0].substring(1, 4)}`;
  }
  getOrderData()
  {   
    let ClientCode = "";
    let c = sessionStorage.getItem('gjhfHunj#n&fdghcod');
    if (c != undefined && c != null && c != '') {
      ClientCode = (c);
    }
    let pan = sessionStorage.getItem('gjhfHunj#n&fdgh'); //'DDJPS6803R' //
    if (pan != null && pan != undefined && pan != '') {
      let request: any = {
        "SrNo": "0",
        "MobileNo": "",
        "PANNo": pan,
        "ClientCode":ClientCode
      }
      request = JSON.stringify(request);
      let inputdata: any = {
        data: this.hireasdkask.setPageNotFound(request)
        //data: (request)
      }
      this.iposervice.IPONCDOrderStatus(inputdata).subscribe(res => {
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
            let data = JSON.parse(this.hireasdkask.getPageNotFound(res.Message));
            let countvalue = Number(data.length.toString()); 
            if (countvalue < 9) {
              this.MyAppCount = `0${countvalue}`;
            }
            else {
              this.MyAppCount = countvalue;
            }
          }
        }
      },
        err => {
          this.Loader.hide();
        });
    }
    else {
      this.Loader.hide();
      this.router.navigate(['/'], { relativeTo: this.route });
    }
  }
}
