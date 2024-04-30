import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomLoaderService } from '../../services/custom-loader.service';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { EncrdecrService } from '../../Auth/encrdecr.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as fs from 'file-saver';
import { environment } from 'src/environments/environment';
import { NotAuthorizedAlertComponent } from '../not-authorized-alert/not-authorized-alert.component';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
import { isNullOrUndefined } from 'src/app/validation';
declare var $: any;

@Component({
  selector: 'app-ipodashboard',
  templateUrl: './ipodashboard.component.html',
  styleUrls: ['./ipodashboard.component.scss']
})
export class IPODashboardComponent implements OnInit {
  CommonBaseHref: string = environment.CommonBaseHref;
  IPOList: any[] = [];
  NCDList: any[] = [];
  IPOListAll: any[] = [];
  NCDListAll: any[] = [];
  G_SubBrokerId: string;
  G_SubbrokerCode: string;
  G_UserType: number;
  modalRef?: BsModalRef;
  constructor(private IPOService: IPOServiceService, private EncrdecrService: EncrdecrService,
    private Loader: CustomLoaderService, private fb: FormBuilder, 
    private router: Router, private route: ActivatedRoute,
    private modalService: BsModalService,
    private hireasdkask :  JksdgfuehdnoService) { }

  ngOnInit() {
    
    this.Loader.show();
    //let LoginToken = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    //if (LoginToken != null && LoginToken != undefined && LoginToken != '') {
      let sbid = sessionStorage.getItem('F44sGAGh2xwkpUL');
      if (sbid != null) {
        this.G_UserType = parseInt((sessionStorage.getItem('L2D3506kIHSk3E0')));
        this.G_SubBrokerId = (sessionStorage.getItem('F44sGAGh2xwkpUL'));
        let request = {
          "Flag": "IPONCDData"
        }
        let data = JSON.stringify(request)
        this.IPOService.getDashboardIPONCDData(data).subscribe((res: any) => {
          debugger
          let data =  typeof(res) == 'object' ? res : JSON.parse((res));      
          if (data.Message.toLowerCase().includes('not authorized')) {
            let ngbModalOptions: NgbModalOptions = {
              backdrop: 'static',
              keyboard: false
            };
            this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
            this.Loader.hide();
          }
          else{
            this.Loader.hide();
            this.IPOListAll = data.ArrayOfResponse;
            this.IPOList = this.IPOListAll.slice(0, 5);
            this.NCDListAll = data.ArrayOfResponse2;
            this.NCDList = this.NCDListAll.slice(0, 5);
          }
          
          //}

        },
          err => {
            this.Loader.hide();
            console.log(err)
          });
      }
      else {
        this.Loader.hide();
      }
    //}
    //else {
      //this.Loader.hide();
      //this.router.navigateByUrl('/employee-login');
    //}

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
  GetMoreIPO() {
    this.router.navigate(['/ipo/ipoview-more'], { relativeTo: this.route });
  }
  GetMoreNCD() {
    this.router.navigate(['/ipo/ncdview-more'], { relativeTo: this.route });
  }
  ViewBidStatus(companyid, IssueType) {
    sessionStorage.removeItem('vSkHjmpACBxAvk9kaUmreZqR');
    sessionStorage.setItem('vSkHjmpACBxAvk9kaUmreZqR', (companyid));
    sessionStorage.removeItem('89FQ3p+Dc8RiOff6po4SQ');
    sessionStorage.setItem('89FQ3p+Dc8RiOff6po4SQ', (IssueType));
    this.router.navigate(['/ipo/BidStatus'], { relativeTo: this.route });
  }
}
