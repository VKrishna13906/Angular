import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
declare var $: any;
@Component({
  selector: 'app-ipoview-more',
  templateUrl: './ipoview-more.component.html',
  styleUrls: ['./ipoview-more.component.scss']
})
export class IPOViewMoreComponent implements OnInit {
  CommonBaseHref: string = environment.CommonBaseHref;
  IPOList: any[] = [];
  G_SubBrokerId: string;
  G_SubbrokerCode: string;
  G_UserType: number = 2;
  IssueList: any[] = [];
  FromDate: string;
  Todate: string;
  IPOViewMoreform: FormGroup;
  IPOViewMoreformsubmited: boolean;
  modalRef?: BsModalRef;
  constructor(private IPOService: IPOServiceService, private EncrdecrService: EncrdecrService,
    private Loader: CustomLoaderService, 
    private fb: FormBuilder, private router: Router, 
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private hireasdkask :  JksdgfuehdnoService) {
    this.IPOViewMoreform = this.fb.group({
      FromDate: [''],
      ToDate: [''],
      IssueName: ['0']
    })
  }
  get f() { return this.IPOViewMoreform.controls }
  ngOnInit() {
    this.BindIssueList();
    if ((sessionStorage.getItem('F44sGAGh2xwkpUL')) != null) {
      this.G_UserType = parseInt((sessionStorage.getItem('L2D3506kIHSk3E0')));
      this.G_SubBrokerId = (sessionStorage.getItem('F44sGAGh2xwkpUL'));

      //to bind all clients
      this.BindAllData();
    }
  }
  BindAllData(){
    let request = { "Flag": "IPONCDData" }
      let data = JSON.stringify(request)
      this.IPOService.getIPOviewmoreData(data).subscribe((res: any) => {
        let data = JSON.parse((res));
        if (data.Message.toLowerCase().includes('not authorized')) {
          let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
        }
        else{
          this.IPOList = data.ArrayOfResponse;
          this.CallDataTable();
        }
      });
  }
  BindIssueList() {
    this.IPOService.GetIPOCompanyList('I').subscribe((res: any) => {
      let data = JSON.parse((res));
      if (data.Message.toLowerCase().includes('not authorized')) {
        let ngbModalOptions: NgbModalOptions = {
          backdrop: 'static',
          keyboard: false
        };
        this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
      }
      else{
      this.IssueList = data.ArrayOfResponse;
      }
    });
  }
  ngAfterViewInit() {
    $(".clsDatePickerToDate").datepicker({
      //orientation: "top left",
      autoclose: true,
      endDate: '0+',
      format: "dd/mm/yyyy",
      todayBtn: 'linked',
      //startDate: '-7d',
      todayHighlight: true,
      orientation: "auto bottom",
    }).on('change', (e: any) => this.IPOViewMoreform.controls['ToDate'].setValue(e.target.value));

    $(".clsDatePickerFromDate").datepicker({
      //orientation: "top left",
      autoclose: true,
      startDate: new Date('01/01/1993'),
      endDate: '0+',
      format: "dd/mm/yyyy",
      todayBtn: 'linked',
      todayHighlight: true,
      orientation: "auto bottom",
    }).on('change', (e: any) => this.SetToDateValidation(e));
    $('.CustomSelectIssueName').select2().on('change', (e: any) => this.OnChangeIssueName(e.target.value));
  }
  OnChangeIssueName(val) {
    this.f.IssueName.setValue(val)
  }
  SetToDateValidation(e: any) {
    this.IPOViewMoreform.controls['FromDate'].setValue(e.target.value);
    //   var date2 = $('.clsDatePickerFromDate').datepicker('getDate');
    // $(".clsDatePickerToDate").datepicker("setStartDate", date2);
  }
  onSubmitIPOViewMore() {
    this.IPOViewMoreformsubmited = true;
    if (this.IPOViewMoreform.invalid) {
      return;
    }
    else {
      
      let request = {
        "COMPANY_ID" : this.IPOViewMoreform.controls['IssueName'].value,
        "FromDate" : this.IPOViewMoreform.controls['FromDate'].value,
        "ToDate" : this.IPOViewMoreform.controls['ToDate'].value,
        "Flag": "GetIPOData"
      }
      let body = JSON.stringify(request);
      this.IPOService.GetIPONCDSearchList(body).subscribe((res: any) => {
        let data = JSON.parse((res));
        if (data.Message.toLowerCase().includes('not authorized')) {
          let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
        }
        else{
          this.IPOList = data.ArrayOfResponse;
          this.CallDataTable();
        }
      });
    }
  }
  CallDataTable() {
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
  ClearControl() {
    this.IPOViewMoreform.controls['FromDate'].setValue('');
    this.IPOViewMoreform.controls['ToDate'].setValue('');
    $('.CustomSelectIssueName').val('0').trigger('change');
    this.BindAllData();
  }
  ViewBidStatus(companyid) {
    sessionStorage.removeItem('vSkHjmpACBxAvk9kaUmreZqR');
    sessionStorage.setItem('vSkHjmpACBxAvk9kaUmreZqR', (companyid));
    sessionStorage.removeItem('89FQ3p+Dc8RiOff6po4SQ');
    sessionStorage.setItem('89FQ3p+Dc8RiOff6po4SQ', ('I'));
    this.router.navigate(['/ipo/BidStatus'], { relativeTo: this.route });
  }
}
