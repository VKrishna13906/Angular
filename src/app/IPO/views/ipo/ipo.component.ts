import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CustomLoaderService } from "src/app/services/custom-loader.service";
import { IPOServiceService } from "src/app/services/iposervice.service";
import { EncrdecrService } from '../../../Auth/encrdecr.service';
import { NotAuthorizedAlertComponent } from "../../not-authorized-alert/not-authorized-alert.component";
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
import { LocationStrategy } from "@angular/common";
declare var $:any;
@Component({
  selector: "app-ipo",
  templateUrl: "./ipo.component.html",
  styleUrls: ["./ipo.component.css"],
})
export class IpoComponent implements OnInit {
  bidAddInApp: boolean = false;
  ClientCode: string = '';
  G_UserType: number = 0;
  SSOLogin : string;
  data:any[] = [];
  modalRef?: BsModalRef;
  IsShowReport:boolean = false;
  selectedTab : boolean = true;
  ArrClientData: any;
  constructor(private router: Router,
    private location : LocationStrategy,
    private route: ActivatedRoute,
    private EncrdecrService: EncrdecrService,
    private iposervice: IPOServiceService,
    private Loader: CustomLoaderService,
    private modalService: BsModalService,
    private hireasdkask :  JksdgfuehdnoService,
    ) {}

  ngOnInit() {
    
    sessionStorage.removeItem('hasdfhuirec');
    sessionStorage.removeItem('kfnekfmcejfem');
    sessionStorage.removeItem('kfrisnekfmcejfem');
    //To handle the Report and Ipo active tab
    let data = sessionStorage.getItem('gjh$hyuqjdjbLjk2r2nw');
    this.selectedTab = data == '1'? true: false;
    sessionStorage.removeItem('gjh$hyuqjdjbLjk2r2nw')

    //To hide the clientcode for ssoLogin
    this.SSOLogin = sessionStorage.getItem('5V5uSYBoBVqAvBIBqUEBhv6ELFF');

    localStorage.setItem('OnInitStart', `${JSON.stringify(new Date().getTime())}`);
    let u = sessionStorage.getItem('L2D3506kIHSk3E0');
    if (u != undefined && u != null && u != '') {
      this.G_UserType = parseInt((u));
      let c = sessionStorage.getItem('gjhfHunj#n&fdghcod');
      if (c != undefined && c != null && c != '') {
        this.ClientCode = (c);
      }
    }
    let pan = sessionStorage.getItem('gjhfHunj#n&fdgh'); //'DDJPS6803R' //
    if (pan != null && pan != undefined && pan != '') {
      let request: any = {
        "SrNo": "0",
        "MobileNo": "",
        "PANNo": pan,
        "ClientCode":this.ClientCode
      }
      request = JSON.stringify(request);
      //his.GetBankDetails(pan, this.ClientCode);
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
            debugger
            this.data = JSON.parse(this.hireasdkask.getPageNotFound(res.Message));
            sessionStorage.setItem('count',  this.data.length.toString())
            //this.data = JSON.parse((res.Message));
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
    let sso = sessionStorage.getItem('5V5uSYBoBVqAvBIBqUEBhv6ELFF');
    if(sso == '10')
    {      
    this.preventBackButton();
    }
  }
  CallAlertModal(msg: any) {
    $("#AlertModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#AlertModalContent').text(msg);
  }
  ShowReport(){
    this.IsShowReport = true;
  }
  preventBackButton()
  {    
    history.pushState(null, null, window.location.href);  
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }
}
