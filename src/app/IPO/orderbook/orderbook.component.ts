import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomLoaderService } from '../../services/custom-loader.service';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { EncrdecrService } from '../../Auth/encrdecr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ExcelService } from '../../services/export/excel.service';
import { NotAuthorizedAlertComponent } from '../not-authorized-alert/not-authorized-alert.component';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
declare var $: any;
@Component({
  selector: 'app-orderbook',
  templateUrl: './orderbook.component.html',
  styleUrls: ['./orderbook.component.scss']
})
export class OrderbookComponent implements OnInit {
  CommonBaseHref: string = environment.CommonBaseHref;
  IPOList: any[] = [];
  IssueList: any[] = [];
  ApplicationNo: string = '';
  PANNO: string = '';
  IPOOrderbookform: FormGroup;
  IPOOrderbookformsubmited: boolean;
  G_SubBrokerId: string = '';
  G_SubbrokerCode: string = '';
  G_UserType: number;
  LoginId: string = '';
  EmpCode: string = '';
  G_CompanyId: any;
  G_IssueType: any;
  G_CStatus: string = '';
  IssueType: string = '';
  ExportToExcelData: any[] = [];
  IsShowExportToExcel: boolean = false;
  CustomerFlag: string = '';
  modalRef?: BsModalRef;
  visiblePass: boolean = true;
  changeType: boolean = true;
  constructor(private IPOService: IPOServiceService, 
    private EncrdecrService: EncrdecrService, private ExcelService: ExcelService,
    private Loader: CustomLoaderService, 
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
    private modalService: BsModalService,private hireasdkask :  JksdgfuehdnoService) {
    this.IPOOrderbookform = this.fb.group({
      IssueName: ['all'],
      ApplicationNo: [''],
      PANNo: [''],
      IssueType: ['']
    })

  }

  ngOnInit() {
    //
    this.Loader.show();
    if ((sessionStorage.getItem('L2D3506kIHSk3E0')) != null && parseInt((sessionStorage.getItem('L2D3506kIHSk3E0'))) == 2) {
      this.G_UserType = parseInt((sessionStorage.getItem('L2D3506kIHSk3E0')));
      this.LoginId = (sessionStorage.getItem('F44sGAGh2xwkpUL'))
      this.G_SubbrokerCode = (sessionStorage.getItem('Hldq31TLYwRbLJ8'));
    }
    if ((sessionStorage.getItem('L2D3506kIHSk3E0')) != null && parseInt((sessionStorage.getItem('L2D3506kIHSk3E0'))) == 1) {

      this.G_UserType = parseInt((sessionStorage.getItem('L2D3506kIHSk3E0')));
      this.LoginId = (sessionStorage.getItem('F44sGAGh2xwkpUL'))
      this.EmpCode = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    }
    if ((sessionStorage.getItem('L2D3506kIHSk3E0')) != null && parseInt((sessionStorage.getItem('L2D3506kIHSk3E0'))) == 3) {
      this.G_UserType = parseInt((sessionStorage.getItem('L2D3506kIHSk3E0')));
      this.LoginId = (sessionStorage.getItem('F44sGAGh2xwkpUL'))
      //this.PANNO = (sessionStorage.getItem('Hldq31TLYwRbLJ8'));
      //console.log(this.PANNO);
    }
    let issue = sessionStorage.getItem('X7OcEYSyuMXI48rLeiFyZCyVe');
    if (issue != undefined && issue != null && issue != '') {
      this.G_CompanyId = (issue);
      sessionStorage.removeItem('X7OcEYSyuMXI48rLeiFyZCyVe')
    }
    let status = sessionStorage.getItem('jvRlcr2b5EkSoNRRi7BnPtTg');
    if (status != undefined && status != null && status != '') {
      this.G_CStatus = (status);
      sessionStorage.removeItem('jvRlcr2b5EkSoNRRi7BnPtTg')
    }
    let type = sessionStorage.getItem('iLjzloeqF0+OdakqrkVE7NMgt');
    if (type != undefined && type != null && type != '') {
      this.G_IssueType = (type);
      sessionStorage.removeItem('iLjzloeqF0+OdakqrkVE7NMgt')
      //this.IPOBindingstatusform.controls.IssueType.setValue(IssueType);
    }
    let flag = sessionStorage.getItem('dfghhtru%75bnb');
    if (flag != undefined && flag != null && flag != '') {
      this.CustomerFlag = (flag);
      sessionStorage.removeItem('dfghhtru%75bnb')
    }
    if (this.G_CompanyId != '' && this.G_CompanyId != undefined && this.G_CompanyId != null
     && this.G_IssueType != '' && this.G_IssueType != undefined && this.G_IssueType != null) {

      setTimeout(() => {
        this.IPOOrderbookform.controls.IssueType.setValue(this.G_IssueType);
        $('.CustomSelectIssueType').val(this.G_IssueType).trigger('change');
      }, 1000);
      // setTimeout(() => {
      //   if (this.G_CompanyId != undefined) {
      //     this.IPOOrderbookform.controls.IssueName.setValue(this.G_CompanyId);
      //     $('.CustomSelectIssueName').val(this.G_CompanyId).trigger('change');
      //   }
      //   else {
      //     this.IPOOrderbookform.controls.IssueName.setValue('all');
      //     $('.CustomSelectIssueName').val('all').trigger('change');
      //   }
      //   this.onSubmitIPOOrderbook();
      // }, 3000);
      let loaderInterval2 = setInterval(() => {
        let str = document.readyState;
        if (str == 'complete' && this.IssueList.length > 0) {
          //
          if (this.G_CompanyId != undefined) {
            this.IPOOrderbookform.controls.IssueName.setValue(this.G_CompanyId);
            $('.CustomSelectIssueName').val(this.G_CompanyId).trigger('change');
          }
          else {
            this.IPOOrderbookform.controls.IssueName.setValue('all');
            $('.CustomSelectIssueName').val('all').trigger('change');
          }
          this.onSubmitIPOOrderbook();
          clearInterval(loaderInterval2)
        }
      }, 1000);
    }
    else{
      this.Loader.hide();
    }
    this.clickDisa(1) 
  }
  get i() { return this.IPOOrderbookform.controls }
  BindCompayList(IssueType) {
    this.IPOService.GetIPOCompanylistDetails(IssueType).subscribe(data => {
      let res = JSON.parse((data))
        if (res.Message.toLowerCase().includes('not authorized')) {
          let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
        }
        else{
          this.IssueList = res.ArrayOfResponse;
        }
    });
  }
  viewPass() {
    this.visiblePass = !this.visiblePass;
    this.changeType = !this.changeType;
  }
  ngAfterViewInit() {
    $('select').select2();
    $('.CustomSelectIssueType').select2({
      minimumResultsForSearch: -1
    }).on('change', (e: any) => this.OnIssueTypeChange(e));
    $('.CustomSelectIssueName').on('change', (e: any) => this.OnIssueChange(e));
  }
  OnIssueTypeChange(e) {
    if (this.G_CompanyId == '' && this.G_IssueType == '') {
      this.Loader.hide();
    }
    let issueType = e.target.value;
    this.IssueType = issueType;
    this.IPOOrderbookform.controls['IssueType'].setValue(issueType);
    this.BindCompayList(issueType);
  }
  IsNullOrEmpty(data: any): boolean {
    var val = false;
    if (data == '' || data == null || data == undefined) {
      val = true;
    }
    else {
      val = false;
    }
    return val;
  }
  OnIssueChange(e) {
    this.IPOOrderbookform.controls['IssueName'].setValue(e.target.value);

    // if (!this.IsNullOrEmpty(this.G_CStatus)) {
    //   this.onSubmitIPOOrderbook();
    // } else {
    //   this.Loader.hide();
    // }

  }
  onSubmitIPOOrderbook() {
    //
    this.IPOList = [];
    $('#IPODataTable').DataTable().destroy();
    let data = {
      "Flag":this.CustomerFlag,
      "COMPANY_ID":this.IPOOrderbookform.controls['IssueName'].value,
      "SUBBROKER_CODE":"",
      "ApplicationNo":this.IPOOrderbookform.controls['ApplicationNo'].value,
      "PANNo":this.IPOOrderbookform.controls['PANNo'].value,
      "CStatus":this.G_CStatus,
      "EmpCode":this.EmpCode,
      "ClientID":""
  }
    this.IPOService.GetOrderBookReport(data).subscribe(resdata => {
      this.Loader.hide();
      let res = JSON.parse((resdata))
      if (res.Message.toLowerCase().includes('not authorized')) {
        let ngbModalOptions: NgbModalOptions = {
          backdrop: 'static',
          keyboard: false
        };
        this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
      }
      else{
      if (res != null) {
        debugger
        console.log(res.ArrayOfResponse);
        if (res.ArrayOfResponse.length > 0) {
          // let ArrayOfResponseData = res.ArrayOfResponse;
          this.IsShowExportToExcel = true;
          
          this.IPOList = res.ArrayOfResponse;
          this.ExportToExcelData = [];
          this.IPOList.map((arr: any, index: number) => {
            let SingleData = [index + 1, arr.COMPANY_NAME, arr.FirstApplicant, arr.ApplicationNo,arr.FirstApplicantPAN, arr.BidID,
            arr.Biding, arr.Quantity, arr.Amount, arr.ClientID, arr.ClientCode, arr.UPIID, arr.CATEGORY, arr.Status,arr.Remarks]
            this.ExportToExcelData.push(SingleData);
          });
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
        else {
          this.IsShowExportToExcel = false;
        }
      }
    }
    },
    err => {
      this.Loader.hide();
    });
  }
  ClearControl() {
    this.IPOOrderbookform.controls['PANNo'].setValue('');
    this.IPOOrderbookform.controls['ApplicationNo'].setValue('');
    //this.IPOOrderbookform.controls['IssueName'].setValue('0');
    $('.CustomSelectIssueName').val('all').trigger('change');
    $('.CustomSelectIssueType').val('').trigger('change');
    //this.IPOOrderbookform.controls['IssueType'].setValue('');
  }
  ExportToExcel() {
    let ExcelWorkbookName = "Order Trade Book";
    let ReportMainHeading = "";
    let ReportSubHeading = [];
    let TableHeading = [];
    let ExcelHeader = [];
    let ExcelData = [];
    TableHeading[0] = ExcelWorkbookName;
    ExcelHeader[0] = ["Sr No", "Issue Name", "Applicatnt Name", "App. No",
      "PAN No", "BID ID", "Price", "Quantity", "Amount", "DP & Client Id","Client Code", "UPI ID", "Category", "Status", "Remark"]
    ExcelData[0] = this.ExportToExcelData;
    this.ExcelService.generateMultipleTabInOneExcelSheet(ExcelWorkbookName, ReportMainHeading, ReportSubHeading, TableHeading, ExcelHeader, ExcelData);
  }
  ValueMasking(value, Flag) {
   
    let MaskValue = "";
    if (value != undefined && value != null && value != '') {
     if (Flag == 'PAN') {
      MaskValue = value.substring(0, 1) + 'XXXXXXX' + value.substring(8); //display only first and last two charcter
    }

    return MaskValue;
    }
  }
  clickDisa(d: any)
  {
    if(d == 1)
    {
      this.IPOOrderbookform.controls['ApplicationNo'].disable();
      this.IPOOrderbookform.controls['PANNo'].disable();
    }
    else if(d==0)
    {
      this.IPOOrderbookform.controls['ApplicationNo'].enable();
      this.IPOOrderbookform.controls['PANNo'].enable();
    }    
  }
}
