import { Component, Input, OnInit } from '@angular/core';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';
import { IPOServiceService } from 'src/app/services/iposervice.service';
declare var $: any;
import * as fs from 'file-saver';
@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() DiscountDetails: any[] = [];
  @Input() TrinityFlag;
  @Input() CompId;
  @Input() ArrCategory: any[] = [];
  CategoryData: any[] = [];

  constructor(private Loader: CustomLoaderService,
    private iposervice: IPOServiceService) { }

  ngOnInit() {
localStorage.setItem('BasicDetailsStart', JSON.stringify(new Date().getTime()))
    console.log(this.data)
    var loaderInterval = setInterval(() => {
      let str = document.readyState;
      //
      if (str == 'complete' && this.DiscountDetails.length > 0 && this.ArrCategory.length > 0) {
        let CategoryData = this.ArrCategory;
        if (this.TrinityFlag == "N") {
          CategoryData = CategoryData.filter(s => (s.VALUEFIELD.toLowerCase() == 'ind' || s.VALUEFIELD.toLowerCase() == 'sha' || s.VALUEFIELD.toLowerCase() == 'emp' || s.VALUEFIELD.toLowerCase() == 'pol'));
        }
        CategoryData.map(c => {
          let rr: any = {};
          let cat = c.VALUEFIELD.toLowerCase();
          if (cat in this.DiscountDetails[0]) {
            let val: any = 0;
            Object.entries(this.DiscountDetails[0]).forEach(([key, value]) => {
              if (key == cat) {
                val = value;
              }
            });
            rr.name = c.TEXTFIELD;
            rr.value = val;
            if (rr.value != 0) {
              this.CategoryData.push(rr)
            }
          }
        })
        localStorage.setItem('BasicDetailsEnd', JSON.stringify(new Date().getTime()))
        clearInterval(loaderInterval)
      }
    }, 1000);
  }
  OpenCompanyURL(data) {
    if (data != undefined && data != null && data != '') {
      window.open(`${data}`, '_blank');
    } else {
      this.CallAlertModal('Company details not found.');
    }
  }
  DownloadProductNote(COMPANY_ID: number, para: string) {
    this.Loader.show();
    let obj: any;
    if (para == 'Prospectus') {
      obj = {
        "COMPANY_ID": COMPANY_ID
      }
    }
    else {
      obj = {
        "COMPANY_ID": COMPANY_ID,
        "TransType": "DraftProsepectNote"
      }
    }
    let JSONobj = JSON.stringify(obj);
    this.iposervice.GetRHPDocumentDetails(JSONobj).subscribe(res => {

      let rr = res.ArrayOfResponse;
      if (rr.length > 0) {
        let ProductNote = res.ArrayOfResponse[0].ProductNoteBase64;
        if (ProductNote != '' || ProductNote != null || ProductNote != undefined) {
          fs.saveAs(`data:application/pdf;base64,${ProductNote}`, 'ProductNote.pdf');
        }
        else {
          this.CallAlertModal("Product note not found.")
        }
      }
      else {
        this.CallAlertModal("Product note not found.")
      }
      this.Loader.hide();
    },
      err => {
        console.log(err)
        this.Loader.hide();
      })
  }
  CallAlertModal(msg: any) {
    $("#AlertModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#AlertModalContent').text(msg);
  }
}
