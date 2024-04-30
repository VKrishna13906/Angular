import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal";
import { EncrdecrService } from 'src/app/Auth/encrdecr.service';
import { IPOServiceService } from 'src/app/services/iposervice.service';

@Component({
  selector: "app-filter-popup",
  templateUrl: "./filter-popup.component.html",
  styleUrls: ["./filter-popup.component.css"],
})
export class FilterPopupComponent implements OnInit {
  bsValue1 = new Date();
  bsValue2 = new Date();
  FinancialYear: any = [];
  ArrIssueType: any = [
    {
      "VALUEFIELD": "I",
      "TEXTFIELD": "Equity"
    },
    {
      "VALUEFIELD": "B",
      "TEXTFIELD": "NCD"
    },
    {
      "VALUEFIELD": "S",
      "TEXTFIELD": "SGB"
    },
  ]
  ArrStatus: any = [
    {
      "VALUEFIELD": "S",
      "TEXTFIELD": "Successful"
    },
    {
      "VALUEFIELD": "C",
      "TEXTFIELD": "Cancelled"
    },
    {
      "VALUEFIELD": "A",
      "TEXTFIELD": "Allotted"
    },
  ]
  FromDate: string = '';
  ToDate: string = '';
  SelectedIssueType :string = '';
  SelectedStatus :string = '';
  constructor(public bsModalRef: BsModalRef,
    private iposervice: IPOServiceService,
    private ENcryptionService : EncrdecrService) { }

  ngOnInit() {
    let req = {
      "TRANS_TYPE": "FinancialYears",
      "REFF_ID": "",
      "REFF_ID2": "",
      "REFF_ID3": "",
      "CON_STR": "IPO"
    };
    let data = JSON.stringify(req)
    this.iposervice.GetFinancialYear(data).subscribe(data => {
      let res = JSON.parse((data))
      if (res.ArrayOfResponse.length > 0) {
        this.FinancialYear = res.ArrayOfResponse;
        console.log(this.FinancialYear)
      }
    },
      err => {
        console.log(err)
      });
  }
  OnclickFinancialYear(val) {
    let r = val.split('~');
    this.FromDate = r[0];
    this.ToDate = r[1];
  }
  OnclickIssueType(val){
    this.SelectedIssueType = val;
  }
  OnclickStatus(val){
    this.SelectedStatus = val;
  }
  onChangeFromDate(e){
    this.FromDate = this.ChangeDateFormat(e);
  }
  onChangeToDate(e){
    this.ToDate = this.ChangeDateFormat(e);
  }
  ChangeDateFormat(ipdate) {
    if (ipdate != '') {
      let k = ipdate.toLocaleDateString();
      let r = k.split('/');
      let d = r[1];
      let m = r[0];
      let y = r[2];
      if (d.length < 2) {
        d = `0${d}`;
      }
      if (m.length < 2) {
        m = `0${m}`;
      }
      return `${y}-${m}-${d}T00:00:00`;
    }
    else {
      return '';
    }
  }
  OnClickApplyFilter(){
    let obj = {
      SelectedIssueType:this.SelectedIssueType,
      SelectedStatus : this.SelectedStatus,
      FromDate:this.FromDate,
      ToDate : this.ToDate
    }
    sessionStorage.setItem('kldfj$hjkOp',JSON.stringify(obj));
    this.modalClose()
  }
  OnClickResetFilter(){
    let obj = {
      SelectedIssueType:'',
      SelectedStatus : '',
      FromDate:'',
      ToDate : ''
    }
    sessionStorage.setItem('kldfj$hjkOp',JSON.stringify(obj));
    this.modalClose()
  }
  modalClose() {
    let obj = {
      SelectedIssueType:'',
      SelectedStatus : '',
      FromDate:'',
      ToDate : ''
    }
    sessionStorage.setItem('kldfj$hjkOp',JSON.stringify(obj));
    this.bsModalRef.hide();
  }
}
