import { Component, Input, OnInit } from '@angular/core';
import { EncrdecrService } from 'src/app/Auth/encrdecr.service';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
@Component({
  selector: 'app-order-status-stepper',
  templateUrl: './order-status-stepper.component.html',
  styleUrls: ['./order-status-stepper.component.css']
})
export class OrderStatusStepperComponent implements OnInit {
  @Input() data: any;
  IsShow: boolean = false;
  OrderNo: string = '';
  CurrentStatus: string = "";
  IsApplicationInit: boolean = false;
  IsSubmitedToExchange: string = '';
  Payment: string = '';
  Allotement: string = '';
  ApplicationOn: string = '';
  SubmittedOn: string = '';
  PaymentOn: string = '';
  AllotedOn: string = '';
  Amount:any = '';
  ASBAType: any;
  ApplicationNo: any;
  CompanyId: any;
  Type: any;
  JourneyStatus: any;
  LineMarkingVerbiage: string = '';
  ExchangeVerbiage: string = '';
  AllotmentVerbiage: string = '';
  IsAsbaApplicationinit: boolean = false;
  IsAsbaSubmitedToLineMark:  string = '';
  IsAsbaSubmitedToExchange:  string = '';
  IsAsbaSubmitedToAllotment:  string = '';
  IsAsbaApplicationModification : string = '';
  ModificationVerbiage: any;
  CancelVerbiage:any;
  IsLien:string = '';
  IsExcange:string = '';
  IsStatic:string = 's';
  IsAllot:string = '';
  ISModify:string = '';
  constructor(private iposervice : IPOServiceService,
    private EncrdecrService: EncrdecrService,
    private hireasdkask :  JksdgfuehdnoService) { }

  ngOnInit() {
    debugger
    let d = this.data;
    this.OrderNo = d.BidID;
    this.ApplicationNo = d.ApplicationNo;
    this.CompanyId = d.COMPANY_ID;
    this.ASBAType = d.ASBAType;
    if(this.ASBAType != 1){
    this.CurrentStatus = d.BidStatus;
    this.Amount = (d.Amount).toLocaleString("en-IN", { minimumFractionDigits: 2 , maximumFractionDigits: 2 });
    this.GetTime(d.DateOfApplication, 0);
    this.GetTime(d.BidDate, 1);
    this.GetTime(d.PaymentDate,2);
    this.GetTime(d.AllotementDate,3);
    if (this.CurrentStatus.toLowerCase() == "bid initiated" || this.CurrentStatus.toLowerCase() == "bid cancelled by client" || this.CurrentStatus.toLowerCase() == "pending for bid" || this.CurrentStatus.toLowerCase() == 'bid rejected' || this.CurrentStatus.toLowerCase().includes('cancellation')) {
      this.IsApplicationInit = true;
      this.IsSubmitedToExchange = 'i';
      this.Payment = 'p';
      this.Allotement = 'p';
    }
    else if (this.CurrentStatus.toLowerCase() == "success bid" || this.CurrentStatus.toLowerCase() == "pan/dp mismatch" || this.CurrentStatus.toLowerCase() == "upi mandate rejected due to other reason" || this.CurrentStatus.toLowerCase() == "status not received from exchange" || this.CurrentStatus.toLowerCase() == "upi mandate pending" || this.CurrentStatus.toLowerCase() == "upi mandate declined by client") {
      this.IsApplicationInit = true;
      this.IsSubmitedToExchange = 'c';
      this.Payment = 'i';
      this.Allotement = 'p';
    }
    else if (this.CurrentStatus.toLowerCase() == "upi mandate accepted") {
      this.IsApplicationInit = true;
      this.IsSubmitedToExchange = 'c';
      this.Payment = 'c';
      this.Allotement = 'i';
    }
  }
    else{
      let  json = {
        ApplicationNo: this.ApplicationNo,
        CompanyId : this.CompanyId,
      }
      this.iposervice.ASBAOrderStatus(json).subscribe(response => {
        if(response !=null){
        
          let res = JSON.parse((response));
          
           let data = res.ArrayOfResponse[0];
           this.Type = data.Type; 
           this.JourneyStatus = data.JourneyStatus;
           this.LineMarkingVerbiage = data.LineMarkingVerbiage;
           if(data.LineMarkingVerbiage.toLowerCase().includes('success'))
           {
            this.IsLien = 's'
           }
           else if(data.LineMarkingVerbiage.toLowerCase().includes('fail'))
           {
            this.IsLien = 'r'
           }
           else if(data.LineMarkingVerbiage.toLowerCase().includes('process'))
           {
            this.IsLien = 'p'
           }
           console.log('ISLIen =' + this.IsLien);
           this.IsAsbaApplicationinit = true;
           this.ExchangeVerbiage = data.ExchangeVerbiage;
           this.IsStatic = 's'
           if(data.ExchangeVerbiage.toLowerCase().includes('success'))
           {
            this.IsExcange = 's'
           }
           else if(data.ExchangeVerbiage.toLowerCase().includes('fail'))
           {
            this.IsExcange = 'r'
           }
           else if(data.ExchangeVerbiage.toLowerCase().includes('process'))
           {
            this.IsExcange = 'p'
           }
           console.log('ISExhange =' + this.IsExcange);
           this.AllotmentVerbiage = data.AllotmentVerbiage;
           console.log('ISAllot =' + data.AllotmentVerbiage);
           if(data.AllotmentVerbiage.toLowerCase().includes('success'))
           {
            this.IsAllot = 's'
           }
           else if(data.AllotmentVerbiage.toLowerCase().includes('not been alloted'))
           {
            this.IsAllot = 'r'
           }
           else if(data.AllotmentVerbiage.toLowerCase().includes('awaiting'))
           {
            this.IsAllot = 'p'
           }
           this.ModificationVerbiage = data.ModificationVerbiage;
           if(data.ModificationVerbiage.toLowerCase().includes('success'))
           {
            this.ISModify = 's'
           }
           else if(data.ModificationVerbiage.toLowerCase().includes('fail'))
           {
            this.ISModify = 'r'
           }
           else if(data.ModificationVerbiage.toLowerCase().includes('process'))
           {
            this.ISModify = 'p'
           }
           console.log('IsModify = '+ this.ISModify);
          if(this.Type == 'C' || this.Type == 'N'){
           switch(this.JourneyStatus){
            case 0:
            case 1:
              this.IsAsbaApplicationinit = true;
              this.IsAsbaSubmitedToLineMark = 'i';
              this.IsAsbaSubmitedToExchange = 'p';
              this.IsAsbaSubmitedToAllotment = 'p';
              break;
            case 2:
              this.IsAsbaApplicationinit = true;
              this.IsAsbaSubmitedToLineMark = 'c';
              this.IsAsbaSubmitedToExchange = 'i';
              this.IsAsbaSubmitedToAllotment = 'p';
              break;
            case 3:
              this.IsAsbaApplicationinit = true;
              this.IsAsbaSubmitedToLineMark = 'c';
              this.IsAsbaSubmitedToExchange = 'c';
              this.IsAsbaSubmitedToAllotment = 'i';
              break;
            case 4: 
              this.IsAsbaApplicationinit = true;
              this.IsAsbaSubmitedToLineMark = 'c';
              this.IsAsbaSubmitedToExchange = 'c';
              this.IsAsbaSubmitedToAllotment = 'c';
              break;
           }
          }else{
            switch(this.JourneyStatus){
              case 1:
                this.IsAsbaApplicationinit = true;
                this.IsAsbaSubmitedToLineMark = 'c';
                this.IsAsbaSubmitedToExchange = 'c';
                this.IsAsbaSubmitedToAllotment = 'p';
                this.IsAsbaApplicationModification = 'i'
                break;
              case 2:
                this.IsAsbaApplicationinit = true;
                this.IsAsbaSubmitedToLineMark = 'c';
                this.IsAsbaSubmitedToExchange = 'c';
                this.IsAsbaSubmitedToAllotment = 'p';
                this.IsAsbaApplicationModification = 'i'
                break;
              case 3:
                this.IsAsbaApplicationinit = true;
                this.IsAsbaSubmitedToLineMark = 'c';
                this.IsAsbaSubmitedToExchange = 'c';
                this.IsAsbaSubmitedToAllotment = 'i';
                this.IsAsbaApplicationModification = 'c'
                break;
              case 4: 
                this.IsAsbaApplicationinit = true;
                this.IsAsbaSubmitedToLineMark = 'c';
                this.IsAsbaSubmitedToExchange = 'c';
                this.IsAsbaSubmitedToAllotment = 'c';
                this.IsAsbaApplicationModification = 'c'
                break;
             }
          }
        }
      })
    }
  }
  GetTime(t, para) {
    var time = '';
    if (t != undefined && t != null && t != '') {
      let t2 = (((t.split('T'))[1]).split('.'))[0];
      let t3 = t2.split(':');
      if (Number(t3[0]) < 12) {
        time = `${t2} AM`;
      }
      else {
        time = `${t2} PM`;
      }
    }
    switch (para) {
      case 0:
        this.ApplicationOn = time;
        break;
      case 1:
        this.SubmittedOn = time;
        break;
        case 2:
        this.PaymentOn = time;
        break;
      case 3:
        this.AllotedOn = time;
        break;
    }
  }
  ShowHide(){
    debugger
      this.IsShow = !this.IsShow;
  }
}
