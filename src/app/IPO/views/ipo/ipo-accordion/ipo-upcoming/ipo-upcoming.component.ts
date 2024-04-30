import { Component, Input, OnInit } from '@angular/core';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';
import { IPOServiceService } from 'src/app/services/iposervice.service';
declare var $: any;
import * as fs from 'file-saver';
@Component({
  selector: 'app-ipo-upcoming',
  templateUrl: './ipo-upcoming.component.html',
  styleUrls: ['./ipo-upcoming.component.css']
})
export class IpoUpcomingComponent implements OnInit {
@Input() data:any = [];
  constructor(private Loader: CustomLoaderService,
    private iposervice: IPOServiceService,) { }

  ngOnInit() {
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
