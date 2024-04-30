import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomLoaderService } from '../../services/custom-loader.service';
import { ReportService } from 'src/app/services/report.service';
import { EncrdecrService } from '../../Auth/encrdecr.service';
import { IsValidPAN } from 'src/app/validation';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { ExcelService } from '../../services/export/excel.service';
import { environment } from 'src/environments/environment';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NotAuthorizedAlertComponent } from '../not-authorized-alert/not-authorized-alert.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
import { disableDebugTools } from '@angular/platform-browser';

declare var $: any;
@Component({
  selector: 'app-report-allotment-page-new',
  templateUrl: './report-allotment-page-new.component.html',
  styleUrls: ['./report-allotment-page-new.component.scss']
})
export class ReportAllotmentPageNewComponent implements OnInit {
  CommonBaseHref: string = environment.CommonBaseHref;
  IPOList: any[] = [];
  FinancialYearList: any[] = [];
  IssueList: any[] = [];
  ExportToExcelData: any[] = [];
  G_SubBrokerId: string;
  SelectIssue: any[] = [];
  LoginUserId: string;
  G_SubbrokerCode: string;
  G_UserType: number;

  IPOBindingform: FormGroup;
  IPOBindingformsubmitted: boolean = false;
  modalRef?: BsModalRef;
  visiblePass: boolean = true;
  changeType: boolean = true;
  constructor(private reportservice: ReportService, private EncrdecrService: EncrdecrService,
    private hireasdkask :  JksdgfuehdnoService,
    private Loader: CustomLoaderService, 
    private fb: FormBuilder, private IPOService: IPOServiceService, 
    private ExcelService: ExcelService,
    private modalService: BsModalService,) {
    this.IPOBindingform = this.fb.group({
      SubBrokerId: [this.G_SubBrokerId],
      IssueType: ['', Validators.required],
      FinancialYear: ['ALL', Validators.required],
      IssueName: ['', Validators.required],
      ClientName: [''],
      PANNo: ['', Validators.pattern(IsValidPAN)],
      Status: ['']
    });
  }

  ngOnInit() {
    debugger
    if ((sessionStorage.getItem('F44sGAGh2xwkpUL')) != null) {
      this.G_UserType = parseInt((sessionStorage.getItem('L2D3506kIHSk3E0')));
      this.G_SubBrokerId = (sessionStorage.getItem('F44sGAGh2xwkpUL'));
      this.LoginUserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'))
      let sbcode = sessionStorage.getItem('Hldq31TLYwRbLJ8');
      if (sbcode != null && sbcode != undefined && sbcode != '') {
        this.G_SubbrokerCode = (sbcode);
      }
    }
    this.IPOService.getIssueList('I').subscribe((resdata: any) => {
      let data = JSON.parse((resdata))
      if (data.Message.toLowerCase().includes('not authorized')) {
        let ngbModalOptions: NgbModalOptions = {
          backdrop: 'static',
          keyboard: false
        };
        this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
      }
      else{
        this.SelectIssue = data.ArrayOfResponse;
        this.IssueList = data.ArrayOfResponse;
      }
    });
    
    this.IPOList.map((arr: any, index: number) => {
      let data = [arr.IssueName, arr.SBCode, arr.ApplNo, arr.InvestorName, arr.PAN, arr.DPClientID, arr.IssuePrice, arr.Category, arr.ShareApplied, arr.AppliedAmt, arr.AllotedShare, arr.AllotedAmt];
      this.ExportToExcelData.push(data);
    })
    // c=this.IPOList;
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

    this.FYBind();
  }
  viewPass() {
    this.visiblePass = !this.visiblePass;
    this.changeType = !this.changeType;
  }
  ngAfterViewInit() {
    $('select').select2();
    $('.CustomSelectIssueType').select2({
      minimumResultsForSearch: -1
    }).on('change', (e: any) => this.IPOBindingform.controls['IssueType'].setValue(e.target.value));
    //$('.CustomSelectIssueType').on('change', (e: any) => this.IPOBindingform.controls['IssueType'].setValue(e.target.value));
    $('.CustomSelectFinancialYear').on('change', (e: any) => this.OnChangeFY(e));
    $('.CustomSelectIssueName').on('change', (e: any) => this.IPOBindingform.controls['IssueName'].setValue(e.target.value));
  }
  FYBind() {
    //
    var currentDate = new Date();
    var cMonth = currentDate.getMonth() + 1;
    var cYear = currentDate.getFullYear();
    if (cMonth < 4) {
      cYear = cYear - 1;
    }
    for (let i = cYear; i > 2010; i--) {
      let obj = {
        "Text": `${i}-${i + 1}`,
        "Value": i.toString()
      }
      this.FinancialYearList.push(obj);
    }
    console.log(this.FinancialYearList);
  }
  OnChangeFY(e: any) {
    debugger
    this.IPOBindingform.controls['FinancialYear'].setValue(e.target.value);
    let IType = this.IPOBindingform.controls['IssueType'].value;
    this.IPOService.GetIssueByFinacialYear(IType, e.target.value).subscribe((resdata: any) => {
      let data = JSON.parse((resdata))
      this.IssueList = data.ArrayOfResponse;
    });
  }
  get f() {
    return this.IPOBindingform.controls;
  }

  CallDataTable() {
    //
    //let companyid = this.IPOBindingform.controls['IssueName'].value;
   //let issuetype = this.IPOBindingform.controls['IssueType'].value;
    //let financialyear = this.IPOBindingform.controls['FinancialYear'].value;

    //let ClientName = this.IPOBindingform.controls['ClientName'].value;
    //let PANNo = this.IPOBindingform.controls['PANNo'].value;
    debugger;
    let request = {
      "TRANS_TYPE":"ReportAllotment",
      "EmpCode":this.LoginUserId,
      "COMPANY_ID":this.IPOBindingform.controls['IssueName'].value,
      "IssueType":this.IPOBindingform.controls['IssueType'].value,
      "FinancialYear":this.IPOBindingform.controls['FinancialYear'].value,
      "ApplicationNo":this.IPOBindingform.controls['PANNo'].value,
      "ClientID":"",
      "FromDate":"",
      "ToDate":"",
      "Flag":"Subbroker",
      "FirstName":this.IPOBindingform.controls['ClientName'].value,
      "CompanyName":"",
      "ARDataType":"A",
      "PageIndex":"1",
      "PageSize":"1000",
      "status":0,
      "SUBBROKER_CODE":""
  }


let data = JSON.stringify(request)
    this.IPOService.AllotmentReport(data).subscribe((data: any) => {
        {
          this.IPOList = data.ArrayOfResponse;
          this.ExportToExcelData = data.ArrayOfResponse;
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
  CallAlertModal(msg: any) {
    $("#AlertModal").modal({ backdrop: 'static', keyboard: false });
    $('#AlertModalContent').text(msg);
  }
  onSubmitIPOBinding() {
    this.IPOBindingformsubmitted = true;
    if (this.IPOBindingform.invalid) {
      return;
    } else {
      //
      this.Loader.show();
      //to bind report
      this.CallDataTable();
      //
      this.Loader.hide();
    }

  }

  ExportToExcel() {
    if(this.ExportToExcelData.length>0)
    {
    //
    let ExcelWorkbookName = "Allotment Report";
    let ReportMainHeading = ExcelWorkbookName;
    let ReportSubHeading = [];
    let TableHeading = [];
    let ExcelHeader = [];
    let ExcelData = [];



    TableHeading[0] = ExcelWorkbookName;
    ExcelHeader[0] = ["Issue Name", "Appl No", "Invester Name", "Invester PAN", "Dp  Benf Id", "Issue Price", "Category", "Share Applied", "Applied Amount", "Alloted Share", "Alloted Amount", "Remark"];
    ExcelData[0] = this.ExportToExcelData;
    //
    this.ExcelService.generateMultipleTabInOneExcelSheet(ExcelWorkbookName, ReportMainHeading, ReportSubHeading, TableHeading, ExcelHeader, ExcelData);
  }
}
}
