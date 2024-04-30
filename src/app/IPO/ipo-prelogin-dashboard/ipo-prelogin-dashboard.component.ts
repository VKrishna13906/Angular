import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { EncrdecrService } from '../../Auth/encrdecr.service';
import { CustomLoaderService } from '../../services/custom-loader.service';
import { NotAuthorizedAlertComponent } from '../not-authorized-alert/not-authorized-alert.component';
import { JksdgfuehdnoService } from '../../jksdgfuehdno.service';
declare var $: any;
@Component({
  selector: 'app-ipo-prelogin-dashboard',
  templateUrl: './ipo-prelogin-dashboard.component.html',
  styleUrls: ['./ipo-prelogin-dashboard.component.scss']
})
export class IpoPreloginDashboardComponent implements OnInit {
  IsMobile:boolean = false;

  IPO_CurrentListData: any = [];
  IPO_ForthcomingListData: any = [];
  IPO_ClosedListData: any = [];


  NCD_CurrentListData: any = [];
  NCD_ForthcomingListData: any = [];
  NCD_ClosedListData: any = [];
  G_UserType:number;
  modalRef?: BsModalRef;
  constructor(private iposervice: IPOServiceService,
    private EncrdecrService:EncrdecrService,
    private router:Router,
    private Loader:CustomLoaderService,
    private modalService: BsModalService,
    private hireasdkask : JksdgfuehdnoService) { }


  CheckTime(IssueCloseTime,AcceptanceTime): boolean {


    let CurrentDate = new Date();
    //let time = CurrentDate.getHours()+':'+CurrentDate.getMinutes(); //CurrentDate.getHours();
    var systemtime = CurrentDate.getHours() + ':' + CurrentDate.getMinutes();
    var SystemDate = new Date('01 Jan 1970 ' + systemtime); // 01 Jan 1970 this date hardecode because we only check time but date is require so we pass tis dummy date

    var IssueCloseDate = new Date('01 Jan 1970 ' + IssueCloseTime);

    var AcceptanceDate = new Date('01 Jan 1970 ' + AcceptanceTime);
    var CloseDate;
    if(AcceptanceDate < IssueCloseDate){
      CloseDate = AcceptanceDate;
    }
    else{
      CloseDate = IssueCloseDate;
    }
    if (CurrentDate.getHours() > 12) {
      return SystemDate  < CloseDate;
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
    if(NCDEarlyCloserDate < NCDCloseDate){
      NCD_CloseDate = NCDEarlyCloserDate;
    }else{
      NCD_CloseDate = NCDCloseDate;
    }
     var d = CurrentDate < NCD_CloseDate;
    if (CurrentDate.getHours() > 12) {
      if(CurrentDate < NCD_CloseDate)
      return SystemDate < NCD_CloseTime
      else
      return false
    } else {
      return true;
    }

  }
  ngOnInit() {
    this.Loader.show();
    $('.modal').modal('hide');
    $('.MainOuter').css('min-height', window.innerHeight);
   if(sessionStorage.getItem('L2D3506kIHSk3E0')!=null && sessionStorage.getItem('L2D3506kIHSk3E0')!=undefined && sessionStorage.getItem('L2D3506kIHSk3E0')!=''){
    this.G_UserType = parseInt((sessionStorage.getItem('L2D3506kIHSk3E0')));
    }
    let ToDate = new Date();
    let td = new Date();
    let fd = new Date(td.setMonth(td.getMonth() - 6));
    let obj = {
      "FromDate" : this.ConvertToShortDate(fd),
      "ToDate" : this.ConvertToShortDate(ToDate)
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
      else{
      if (res.ArrayOfResponse.length > 0) {

        let ArrayOfResponseData = res.ArrayOfResponse;
        let CurrentDate = new Date();

        // IPO Current
        this.IPO_CurrentListData = ArrayOfResponseData[0].objIPONdNCD.filter(
          atr => (atr.IssueType == 'I' && new Date(atr.IssueStartDate) < CurrentDate
          &&  new Date(atr.IssueEndDate).toString().includes(CurrentDate.toString().substring(0,10))? this.CheckTime(atr.IssueCloseTime,atr.IssueAcceptanceTime):true)
          );

        //  IPO ForthCommimg
        this.IPO_ForthcomingListData = ArrayOfResponseData[0].objIPONdNCD.filter(atr => (atr.IssueType == 'I' && new Date(atr.IssueStartDate) > CurrentDate))

        /// NCD Current Data

        this.NCD_CurrentListData = ArrayOfResponseData[0].objIPONdNCD.filter(atr => (atr.IssueType == 'B'
          &&  this.CheckNCDTime(atr.IssueCloseTime,atr.IssueAcceptanceTime,atr.IssueEndDate,atr.earlyclosure)))


        // NCD ForthComming
        this.NCD_ForthcomingListData = ArrayOfResponseData[0].objIPONdNCD.filter(atr => (atr.IssueType == 'B' && new Date(atr.IssueStartDate) > CurrentDate))

        // IPO- Closed
        this.IPO_ClosedListData = ArrayOfResponseData[0].objIPOdetails.slice(0, 5);

        // NCD- CLosed
        var loaderInterval = setInterval(()=>{
          let str = document.readyState;
          if(str == 'complete'){
            this.Loader.hide();
            clearInterval(loaderInterval)
          }
        },1000);
      }
    }
    });

    // if(!this.IsNullOrEmpty(sessionStorage.getItem('fbPxEvwQayKqnyUY/vuP9GtBLBew0RP'))){
    //   const val = (sessionStorage.getItem('fbPxEvwQayKqnyUY/vuP9GtBLBew0RP'));
    //   if(val=="true"){
    //     this.IsShowDetails=true;
    //   }
    // }
  }
  ConvertToShortDate(ipd) {
    let r1 = ipd.getDate();
    let r2 = ipd.getMonth() + 1;
    let r3 = ipd.getFullYear();
    return `${r1}/${r2}/${r3}`;
  }
  OnSubmitApplyIPO(CompanyID: number) {
    sessionStorage.setItem('HqNlocCKACjWB+JZNeOUa4iuhxO', (CompanyID.toString()));
    this.router.navigateByUrl('/ipo/applyIPO');
  }
  ViewBidStatus(companyid,IssueType)
  {

    sessionStorage.removeItem('vSkHjmpACBxAvk9kaUmreZqR');
    sessionStorage.setItem('vSkHjmpACBxAvk9kaUmreZqR', (companyid));
    sessionStorage.removeItem('89FQ3p+Dc8RiOff6po4SQ');
    sessionStorage.setItem('89FQ3p+Dc8RiOff6po4SQ', (IssueType));
    this.router.navigate(['/ipo/BidStatus']);
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
  onTrackIPONCD(Id,Flag){
    try{
      sessionStorage.setItem('E3JezQHPouE9YDaMhhP',(Id));
      sessionStorage.setItem('ZNqj+2iZuOfT2H5sVFYQ9p4CFKL',(Flag));
      this.router.navigateByUrl('/ipo/orderStatus');
    }catch(e){

    }
  }
  DownloadProductNote(ProductNote){
    try{
      const source = `data:application/pdf;base64,${ProductNote}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `ProductNote.pdf`
      link.click();
    }
    catch(e){

    }
  }
}
