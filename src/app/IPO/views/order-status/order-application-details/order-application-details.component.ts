import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from '../../../../validation';
declare var $ : any;
@Component({
  selector: 'app-order-application-details',
  templateUrl: './order-application-details.component.html',
  styleUrls: ['./order-application-details.component.css']
})
export class OrderApplicationDetailsComponent implements OnInit {
  @Input() data: any[] = [];
  ArrData: any[] = [];
  ASBAAccountNo: string = '';
  ArrMonthName = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  constructor() { }

  ngOnInit() {
    
    this.ArrData.push(this.data)
    this.ArrData.map(arr => {
      arr.IssueStartDateDisplay = this.ChangeDateFormat(arr.IssueStartDate);
      arr.IssueEndDateDisplay = this.ChangeDateFormat(arr.IssueEndDate);
      if (arr.ASBAType == 1) {
        if (arr.asba != undefined && arr.asba != null) {
          let ArrASBA = arr.asba.filter(a => a.ActionCode != "D");
          if (ArrASBA != undefined && ArrASBA != null) {
            debugger
            const h = ArrASBA.sort((a, b) => b.Amount - a.Amount)[0];
            if (!isNullOrUndefined(h.Amount)) {
              arr.Amount = h.Amount;
              sessionStorage.setItem('getPayableAmount', arr.Amount);
            }
            if (!isNullOrUndefined(h.Quantity)) {
              arr.Quantity = h.Quantity;
            }
            if (h.BidLot != 0) {
              arr.totalLot = (h.Quantity / h.BidLot);
            }
            else {
              arr.totalLot = '';
            }
          }
          else{
            arr.Amount = 0;
            arr.Quantity = 0;
            arr.totalLot = '';
          }
        }
      }
      else {
        //sessionStorage.setItem('getPayableAmount', this.ArrData[0].Amount);
        if (arr.BidLot != 0) {
          arr.totalLot = (arr.Quantity / arr.BidLot);
        }
        else {
          arr.totalLot = '';
        }
      }


    });
    this.ASBAAccountNo = sessionStorage.getItem('buvbe#jbY');
    console.log(this.data)
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
  ChangeDateFormat(inputDate) {
    let d = inputDate.substring(0, 10);
    let r = d.split('-');
    let m = parseInt(r[1]) - 1;
    return `${r[2]} ${this.ArrMonthName[m]}`;
    //return `${r[2]}-${r[1]}-${r[0].substring(2, 4)}`;
  }
}
