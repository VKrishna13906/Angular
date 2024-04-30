import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IPOServiceService } from '../../services/iposervice.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EncrdecrService } from '../../Auth/encrdecr.service';
import { CustomLoaderService } from '../../services/custom-loader.service';
import { environment } from 'src/environments/environment';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NotAuthorizedAlertComponent } from '../not-authorized-alert/not-authorized-alert.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
declare var $: any;
@Component({
  selector: 'app-bid-status',
  templateUrl: './bid-status.component.html',
  styleUrls: ['./bid-status.component.scss']
})
export class BidStatusComponent implements OnInit {
  CommonBaseHref: string = environment.CommonBaseHref;
  IPOList: any[] = [];

  G_EmpCode: string;
  G_SubbrokerCode: string;
  G_UserType: number = 2;
  IPOBindingstatusform: FormGroup;
  IPOBindingstatussubmitted: boolean = false;
  //MasterData: any[] = [];
  IssueNameList: any[] = [];
  G_CompanyId: any;
  G_IssueType: any;
  modalRef?: BsModalRef;
  constructor(private IPOService: IPOServiceService,
    private fb: FormBuilder,
    private EncrdecrService: EncrdecrService,
    private Loader: CustomLoaderService,
    private router: Router,
    private modalService: BsModalService,
    private hireasdkask :  JksdgfuehdnoService) {
    this.IPOBindingstatusform = this.fb.group({
      IssueType: ['', Validators.required],
      Issue: ['', Validators.required],
    });
  }

  ngOnInit() {
    
    this.Loader.show();
    let id = sessionStorage.getItem('m5JkoXISmYRAIuY');
    if (id != null && id != undefined && id != '') {
      this.G_UserType = parseInt((sessionStorage.getItem('L2D3506kIHSk3E0')));
      this.G_EmpCode = (id);
      let sbcode = sessionStorage.getItem('Hldq31TLYwRbLJ8');
      if (sbcode != null && sbcode != undefined && sbcode != '') {
        this.G_SubbrokerCode = (sbcode);
      }
    }
    else {
      this.router.navigateByUrl('/preipo/employee-login');
    }

    if (this.G_UserType == 3) {
      this.router.navigateByUrl('/login-corp');
    }
    //
    //#region this code will run when user redirect from dashboard
    let IssueType = sessionStorage.getItem('89FQ3p+Dc8RiOff6po4SQ');
    if (IssueType != undefined && IssueType != null && IssueType != '') {
      this.G_IssueType = (IssueType);
      //sessionStorage.removeItem('89FQ3p+Dc8RiOff6po4SQ');
      if (this.G_IssueType != '') {
        // setTimeout(() => {
        //   $('.CustomSelectIssueType').val(this.G_IssueType).trigger('change');
        // }, 1000);
        let loaderInterval = setInterval(() => {
          let str = document.readyState;
          if (str == 'complete') {
            $('.CustomSelectIssueType').val(this.G_IssueType).trigger('change');
            clearInterval(loaderInterval)
          }
        }, 1000);
      }
    }
    let CompanyId = sessionStorage.getItem('vSkHjmpACBxAvk9kaUmreZqR');
    if (CompanyId != undefined && CompanyId != null && CompanyId != '') {
      this.G_CompanyId = (CompanyId);
      //sessionStorage.removeItem('vSkHjmpACBxAvk9kaUmreZqR');
      if (this.G_CompanyId != '') {
        // setTimeout(() => {
        //   $('.CustomSelectIssueName').val(this.G_CompanyId).trigger('change');
        //   //this.BindBidStatus(this.G_CompanyId);
        // }, 3000);
        let loaderInterval2 = setInterval(() => {
          let str = document.readyState;
          if (str == 'complete' && this.IssueNameList.length > 0) {
            //
            $('.CustomSelectIssueName').val(this.G_CompanyId).trigger('change');
            clearInterval(loaderInterval2)
          }
        }, 1000);
      }
    }
    else {
      this.Loader.hide()
    }

    //#endregion

  }
  get i() { return this.IPOBindingstatusform.controls }
  ngAfterViewInit() {
    $('select').select2();
    $('.CustomSelectIssueType').on('change', (e: any) => this.GetIssueNames(e.target.value));
    $('.CustomSelectIssueName').on('change', (e: any) => this.BindBidStatus(e.target.value));

  }
  GetIssueNames(e) {
    this.i.IssueType.setValue(e);
    debugger
    this.IPOService.GetIPOCompanyList(e).subscribe(data => {
      let res = JSON.parse((data));
      if (res.Message.toLowerCase().includes('not authorized')) {
        let ngbModalOptions: NgbModalOptions = {
          backdrop: 'static',
          keyboard: false
        };
        this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
      }
      else{
        this.IssueNameList = res.ArrayOfResponse;
      }
    });
  }
  BindBidStatus(CompanyId) {
    this.Loader.show();
    this.i.Issue.setValue(CompanyId);
    let rr = this.IssueNameList.filter(a => a.VALUEFIELD == CompanyId);
    this.IPOBindingstatussubmitted = true;
    if (this.IPOBindingstatusform.invalid) {
      this.Loader.hide();
      return false;
    }
    else {
      this.IPOService.GetBidData(CompanyId, this.G_SubbrokerCode, this.G_EmpCode).subscribe((res) => {
        this.Loader.hide();
        let data = JSON.parse((res));
        if (data.Message.toLowerCase().includes('not authorized')) {
          let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
        }
        else{
          if (data != null) {
            if (data.ArrayOfResponse.length > 0) {

              this.IPOList = data.ArrayOfResponse;
            } else {
              this.IPOList = [];
            }
          } else {
            this.IPOList = [];
          }
          this.i.Issue.updateValueAndValidity();
          $('#IPODataTable').DataTable().destroy();
          $(document).ready(function () {
            $.fn.dataTable.ext.errMode = 'none';
            $('#IPODataTable').DataTable({
              pageLength: 50,
              bLengthChange: false,
              ordering: false,
              searching: false,
              language: {
                paginate: {
                  next: '&#8594;', // or '→'
                  previous: '&#8592;' // or '←'
                }
              }
            });
          });
        }
      });
    }
  }
  CallAlertModal(msg: any) {
    $("#AlertModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#AlertModalContent').text(msg);
  }
  GOTOOrderTradeBook(value, para) {
    sessionStorage.setItem('iLjzloeqF0+OdakqrkVE7NMgt', (this.i.IssueType.value));
    sessionStorage.setItem('X7OcEYSyuMXI48rLeiFyZCyVe', (this.i.Issue.value));
    sessionStorage.setItem('jvRlcr2b5EkSoNRRi7BnPtTg', (value));
    sessionStorage.setItem('dfghhtru%75bnb', (para));
    this.router.navigateByUrl('/ipo/ordertradebook');
  }

}
