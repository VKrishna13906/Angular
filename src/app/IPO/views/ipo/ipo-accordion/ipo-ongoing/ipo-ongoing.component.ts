import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { EncrdecrService } from "src/app/Auth/encrdecr.service";
import { NotAuthorizedAlertComponent } from "src/app/IPO/not-authorized-alert/not-authorized-alert.component";
import { CustomLoaderService } from "src/app/services/custom-loader.service";
import { IPOServiceService } from "src/app/services/iposervice.service";
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
declare var $: any;

@Component({
  selector: "app-ipo-ongoing",
  templateUrl: "./ipo-ongoing.component.html",
  styleUrls: ["./ipo-ongoing.component.css"],
})
export class IpoOngoingComponent implements OnInit {
  @Input() data: any = [];
  modalRef?: BsModalRef;
  constructor(private iposervice: IPOServiceService,
    private Loader: CustomLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private EncrdecrService: EncrdecrService,
    private modalService: BsModalService,private hireasdkask :  JksdgfuehdnoService) { }

  ngOnInit() {
    debugger
    var loaderInterval = setInterval(() => {
      let str = document.readyState;
      if (str == 'complete' && this.data.length > 0) {
        this.BindData();
        setInterval(() => this.BindData(), 60000);
        //console.log(this.data)
        clearInterval(loaderInterval)
      }
    }, 1000);
  }

  BindData() {
    this.data.map(arr => {
      let d = arr.IssueEndDate.split('T')[0];
      let t = this.pendingTimeCounter(d, arr.IssueAcceptanceTime);
      switch (arr.TimerFlag.toUpperCase()) {
        case 'D':
          if ((t.split('|'))[0] == '0') {
            arr.TimeLeft = `Last day left`;
          }
          else if((t.split('|'))[0] == '1'){
            arr.TimeLeft = `${(t.split('|'))[0]} Day left`;
          }
          else {
            arr.TimeLeft = `${(t.split('|'))[0]} Days left`;
          }
          break;
        case 'H':
          arr.TimeLeft = `${(t.split('|'))[1]} HRs left`;
          break;
        default:
          arr.TimeLeft = '';
          break;
      }
    })
  }
  pendingTimeCounter(d, t) {
    let dd = d.split('-');
    let m = parseInt(dd[1]) - 1;
    let tt = t.split(':');
    const lastDate = new Date(dd[0], m, dd[2], tt[0], tt[1], tt[2]).getTime();
    const currentDate = new Date().getTime();
    const gap = lastDate - currentDate;
    let days = Math.floor(gap / (1000 * 60 * 60 * 24));
    let hours = Math.floor(((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days * 24);
    let minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((gap % (1000 * 60)) / 1000);

    return `${days}|${hours.toLocaleString()}:${minutes.toLocaleString()}`;
  }
  OnClickApplyNow(data: any) {
    this.Loader.show();
    debugger
    let pan = sessionStorage.getItem('gjhfHunj#n&fdgh'); //'DDJPS6803R'
    sessionStorage.setItem('jsdhkfjhkueudbk',data.IssueEndDate);

    sessionStorage.setItem('dfsfsefcdvgdrter6456dg',data.allowCutoff);

    let ClientCode = '';
    let c = sessionStorage.getItem('gjhfHunj#n&fdghcod');
      if (c != undefined && c != null && c != '') {
        ClientCode = (c);
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
            debugger
            let rk = JSON.parse((res.Message));
            let rr = rk[0];
            let pd = rr.objIPOClientPD;
            if (pd.length > 0) {
              let trinity = pd[0].TrinityFlag;
              if (trinity == 'Y') {
                if (rr.objIPOBD.length > 0) {
                  sessionStorage.setItem('buvbe#jbY', rr.objIPOBD[0].BankAccountNo);
                  this.SetApplyNowData(rr, data, trinity);
                }
                else {
                  this.CallAlertModal('Your ASBA details not found.');
                }
              }
              else {
                let Status = (pd[0].Status).toLowerCase();
                if (Status != 'corporate') {
                  this.SetApplyNowData(rr, data, trinity);
                }
                else {
                  this.CallAlertModal('Bidding is not supported under this particular category.');
                }
              }
            }
            else {
              this.CallAlertModal('Client details not found.');
            }
          }
          else {
            this.CallAlertModal('Client details not found.');
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
  SetApplyNowData(rr, data, trinity) {
    if (rr.objIPOClientDD.length > 0) {
      let beneficiaryStatus = rr.objIPOClientDD[0].DPStatus;
      if (beneficiaryStatus == '1') {
        sessionStorage.setItem('mhsd#d@l;d*g#hjb', (JSON.stringify(rr)));
        sessionStorage.setItem('nsd#d@l;d*g#hjb', (data.COMPANY_ID));
        sessionStorage.setItem('cfhf5@6nS$vxhb=', (trinity)); // trinity
        sessionStorage.setItem('jgD#56nS$vxhb=', ("1")); // beneficiaryStatus
        sessionStorage.setItem('gjh$jbLjk', "0"); // ordertype
        this.router.navigate(['/order-placement'], { relativeTo: this.route });
        //this.router.navigate([]).then(result => { window.open('/order-placement', '_blank'); }); 
      }
      else {
        this.CallAlertModal('Your beneficiary status is not active.');
      }
    }
    else {
      this.CallAlertModal('Your beneficiary status is not active.');
    }
  }
  CallAlertModal(msg: any) {
    $("#AlertModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#AlertModalContent').text(msg);
  }
  OpenCompanyURL(data) {
    if (data != undefined && data != null && data != '') {
      window.open(`${data}`, '_blank');
    } else {
      this.CallAlertModal('Company details not found.');
    }
  }
}
