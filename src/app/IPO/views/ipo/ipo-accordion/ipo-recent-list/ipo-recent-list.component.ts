import { Component, Input, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-ipo-recent-list',
  templateUrl: './ipo-recent-list.component.html',
  styleUrls: ['./ipo-recent-list.component.css']
})
export class IpoRecentListComponent implements OnInit {
@Input() data:any = [];
  constructor() { }

  ngOnInit() {
    console.log(this.data)
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
