import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EncrdecrService } from 'src/app/Auth/encrdecr.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
declare var $: any;

@Component({
  selector: "app-bid-price-quantity",
  templateUrl: "./bid-price-quantity.component.html",
  styleUrls: ["./bid-price-quantity.component.css"],
})
export class BidPriceQuantityComponent implements OnChanges {
  counter1: number = 1;
  totalBidAmount: number = 0;
  BidCount: number = 1;
  @Input() TrinityFlag;
  @Input() UpperPriceBand;
  @Input() LowerPriceBand;
  @Input() BidLot;
  @Input() DiscountDetails;
  @Input() selectedCategory;
  @Input() TotalIpoSize;
  DisableCuttoff: boolean = false;
  //NoofLots: number = 0;
  BidPrice: number = 0;
  isChecked: boolean = true;
  category: string;
  discountPrize: number = 0;
  maxPrice: number = 200000;
  MaxQuantity: number = 10000000;
  BidDetailsForm: FormGroup;
  IsForModify: boolean = false;
  IsAllowAddBid: boolean = true;
  constructor(private EncrdecrService: EncrdecrService,
    private hireasdkask : JksdgfuehdnoService,
    private fb: FormBuilder,) {
    this.BidDetailsForm = this.fb.group({
      BidForm: new FormArray([]),
    });
  }
  get a() {
    return this.BidDetailsForm.controls;
  }
  get b() {
    return this.a.BidForm as FormArray;
  }
  get BidDetailsFormGroup() {
    return this.b.controls as FormGroup[];
  }
  ngOnInit() {
    debugger
    localStorage.setItem('BiddingDetailsStart', JSON.stringify(new Date().getTime()))
    sessionStorage.removeItem('pReV#uihfenkj&*d');
    this.addBid();
    var loaderInterval = setInterval(() => {
      let str = document.readyState;
      if (str == 'complete' && this.UpperPriceBand != 0) {

        this.IsForModify = false;
        if (sessionStorage.getItem('gjh$jbLjk') == "0") {
          sessionStorage.removeItem('nsd#d@l;d*g#hjb222');
        }
        let b = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
        if (b != null && b != undefined && b != '') {
          this.IsAllowAddBid = false;
          let d: any = JSON.parse((b));
          console.log(d)
          if (d.ASBAType == 1) {
            let arrASBA = d.asba.filter(a => a.ActionCode != "D");
            if (arrASBA.length > 0) {
              this.BidCount = arrASBA.length;
            }
            let pd = arrASBA;
            this.addBid("1");
            let ArrPrevAmount: any[] = [];
            for (let i = 0; i < this.BidCount - 1; i++) {
              let rr = this.b.controls[i];
              if (pd[i].CutOffFlag == 1) {
                pd[i].CutOffFlag = true;
              }
              else {
                pd[i].CutOffFlag = false;
              }

              rr.patchValue({
                bidno: pd[i].NoofLotsBid1,
                price: pd[i].Rate,
                cbx: pd[i].CutOffFlag,
                TotalBidAmount: pd[i].Amount,
                NoofLots: pd[i].BidLot,
                bidid: pd[i].BidId,
                asbaid: pd[i].asbaid
              });
              ArrPrevAmount.push(pd[i].Amount);
            }
            sessionStorage.setItem('pReV#uihfenkj&*d', (JSON.stringify(ArrPrevAmount)))
          }
          else {
            let rr = this.b.controls[0];
            if (d.CutOffFlag == 1) {
              d.CutOffFlag = true;
            }
            else {
              d.CutOffFlag = false;
            }
            rr.patchValue({
              bidno: d.totalLot,
              price: d.Price,
              cbx: d.CutOffFlag,
              TotalBidAmount: d.Amount,
              NoofLots: d.BidLot,
            });
            let ArrPrevAmount: any[] = [];
            ArrPrevAmount.push(d.Amount);
            sessionStorage.setItem('pReV#uihfenkj&*d', (JSON.stringify(ArrPrevAmount)))
          }
        }
        else if (sessionStorage.getItem('gjh$jbLjk2r2') == '1') {
          this.IsForModify = true;
          this.IsAllowAddBid = true;
          let pd: any = sessionStorage.getItem('fdfsdf*%gsdfhdf=2g2');
          if (pd != undefined && pd != null) {
            pd = (pd)
            pd = JSON.parse(pd);
            if (pd.length > 0) {
              this.BidCount = pd.length
            }
            this.addBid("1");
            for (let i = 0; i < this.BidCount - 1; i++) {
              let rr = this.b.controls[i];
              if (pd[i].CutOffFlag == 1) {
                pd[i].CutOffFlag = true;
              }
              else {
                pd[i].CutOffFlag = false;
              }
              rr.patchValue({
                bidno: pd[i].NoofLotsBid1,
                price: pd[i].bidPriceBid1,
                cbx: pd[i].CutOffFlag,
                TotalBidAmount: pd[i].totalBidAmountBid1,
                NoofLots: pd[i].BidLot,
              });
            }
          }
        }
        else {
          this.IsAllowAddBid = true;
          let r: any = this.b.controls[0];
          if (this.TrinityFlag == 'Y') {
            r.controls.price.setValue('');
          }
          else {
            r.controls.price.setValue(this.UpperPriceBand);
          }
        }
        localStorage.setItem('BiddingDetailsEnd', JSON.stringify(new Date().getTime()))
        clearInterval(loaderInterval)
      }
    }, 1000);
  }
  CountBidAmountUsingUpperPriceBand(event, i, para?) {
    if (this.selectedCategory != '') {
      let r: any = this.b.controls[i];
      let k = r.controls.TotalBidAmount.value;
      if (this.selectedCategory == 'HNI' && this.TrinityFlag == 'Y') {
        if (para == 'keyup') {
          if (event == '0') {
            event = 1;
            r.controls.bidno.setValue(event);
            this.CallAlertModal(`Please enter lot size greater than 1`);
          }
        }
        else {
          if (event == '0' || event == '') {
            event = 1;
            r.controls.bidno.setValue(event);
            this.CallAlertModal(`Please enter lot size greater than 1`);
          }
        }

        //let PriceBand = 0;
        event = parseInt(event)
        r.controls.NoofLots.setValue(event);
        let amt: any = 0;
        let txtBidPrice = r.controls.price.value;
        if (txtBidPrice != 0) {
          if (r.controls.cbx.value) {
            amt = Number(this.UpperPriceBand) * Number(event * this.BidLot);
            //PriceBand = parseInt(this.UpperPriceBand);
          } else {
            amt = Number(txtBidPrice) * Number(event * this.BidLot);
            //PriceBand = Number(txtBidPrice);
          }
        }
        let rr = parseFloat(this.TotalIpoSize) * 10000000;
        if (amt > rr) {
          this.CallAlertModal(`Total bid amount must be less than total ipo size i.e. ${this.TotalIpoSize} Cr.`)
          r.controls.bidno.setValue(1);
          r.controls.TotalBidAmount.setValue(0);
        }
        else {
          if (amt > 0) {
            r.controls.TotalBidAmount.setValue(amt);
          }
          else {
            r.controls.TotalBidAmount.setValue('');
          }
        }

        this.binddata();
      }
      else {
        if (k <= this.maxPrice) {
          if (para == 'keyup') {
            if (event == '0' || parseInt(event) > this.MaxQuantity) {
              if (this.selectedCategory == 'IND' && parseInt(event) > this.MaxQuantity) {
                let b = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
                if (b != null && b != undefined && b != '') {
                  this.CallAlertModal('The maximum limit for the selected category is Rs 2 lakh.')
                }
                else {
                  this.CallAlertModal('The maximum limit for the selected category clients is Rs 2 lacs. For placing bids above Rs 2 lacs, kindly select the HNI category.');
                }
              }
              else {
                this.CallAlertModal('Check whether quantity is proper i.e. it should be in multiples of specified quantity. <br/><br/> Check whether quantity is proper i.e. it should not be less than min quantity or greater than maximum quantity.')
              }
            }
            else if(event.trim() == ''){
              this.CallAlertModal('Check whether quantity is proper i.e. it should be in multiples of specified quantity. <br/><br/> Check whether quantity is proper i.e. it should not be less than min quantity or greater than maximum quantity.')
            }
            event = 1;
              r.controls.bidno.setValue(event);
          }
          else {
            if (event == '0' || event == '' || parseInt(event) > this.MaxQuantity) {
              if (this.selectedCategory == 'IND' && parseInt(event) > this.MaxQuantity) {
                let b = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
                if (b != null && b != undefined && b != '') {
                  this.CallAlertModal('The maximum limit for the selected category is Rs 2 lakh.')
                }
                else {
                  this.CallAlertModal('The maximum limit for the selected category clients is Rs 2 lacs. For placing bids above Rs 2 lacs, kindly select the HNI category.');
                }
              }
              else {
                this.CallAlertModal('Check whether quantity is proper i.e. it should be in multiples of specified quantity. <br/><br/> Check whether quantity is proper i.e. it should not be less than min quantity or greater than maximum quantity.')
              }
              event = 1;
              r.controls.bidno.setValue(event);
            }
          }

          let PriceBand = 0;
          let InitPriceBand = 0;
          event = parseInt(event)
          r.controls.NoofLots.setValue(event);
          this.SwitchCase(this.DiscountDetails[0]);
          let amt: any = 0;
          let amt2: any = 0;
          let txtBidPrice = r.controls.price.value;
          if (txtBidPrice != 0) {
            if (r.controls.cbx.value) {
              amt = Number(this.UpperPriceBand - this.discountPrize) * Number(event * this.BidLot);
              amt2 = Number(this.UpperPriceBand - this.discountPrize) * Number((event + 1) * this.BidLot);
              InitPriceBand = parseInt(this.UpperPriceBand);
            } else {
              amt = Number(txtBidPrice - this.discountPrize) * Number(event * this.BidLot);
              amt2 = Number(txtBidPrice - this.discountPrize) * Number((event + 1) * this.BidLot);
              InitPriceBand = Number(txtBidPrice);
            }
            PriceBand = InitPriceBand - this.discountPrize;
            let MxQty: number = this.maxPrice / PriceBand;
            this.MaxQuantity = Math.floor(Math.floor(MxQty) / parseInt(this.BidLot));
          }
          if (amt <= this.maxPrice) {
            if (amt > 0) {
              r.controls.TotalBidAmount.setValue(amt);
            }
            else {
              r.controls.TotalBidAmount.setValue('');
            }
          }
          else{
            if(this.selectedCategory == 'IND'){
              this.CallAlertModal('The maximum limit for the selected category clients is Rs 2 lacs. For placing bids above Rs 2 lacs, kindly select the HNI category.');
              r.controls.bidno.setValue(1);
              this.CountBidAmountUsingUpperPriceBand(1, i)
            }
          }
          if (amt2 <= this.maxPrice) {
            $(`#IdBtnBidInc_${i}`).prop("disabled", false);
          }
          else {
            if (this.selectedCategory != 'IND') {
              $(`#IdBtnBidInc_${i}`).prop("disabled", true);
            }
          }
          if (this.selectedCategory == 'SHA' && amt > 200000 && r.controls.cbx.value == true) {
            $(`.cutoffprice_${i}`).css("pointer-events", 'none');
            r.controls.price.setValue('');
            r.controls.cbx.setValue(false);
            r.controls.TotalBidAmount.setValue(0);
            this.CallAlertModal('Cutoff not allowed for bid greater than 200000 in shareholder.')
          }
          else {
            if (this.selectedCategory == 'HNI') {
              $(`.cutoffprice_${i}`).css("pointer-events", 'none');
            }
            else {
              $(`.cutoffprice_${i}`).css("pointer-events", 'all');
            }
          }
          this.binddata();
        }
        else {
          if (this.selectedCategory == 'IND') {
            this.CallAlertModal('The maximum limit for the selected category clients is Rs 2 lacs. For placing bids above Rs 2 lacs, kindly select the HNI category.');
          }
        }
      }
    }
  }
  CountBidAmountUsingBidPrice(event, i, para) {
    
    let r: any = this.b.controls[i];
    // this.UpperPriceBand = 100;
    // this.LowerPriceBand = 90;
    if (event <= this.UpperPriceBand && event >= this.LowerPriceBand) {
      r.controls.price.setValue(event);
      if (this.selectedCategory != 'HNI') {
        this.SwitchCase(this.DiscountDetails[0]);
        let rr = r.controls.bidno.value;
        let p = r.controls.price.value;
        //if (p <= this.UpperPriceBand && p >= this.LowerPriceBand) {
        let PriceBand = p - this.discountPrize;
        let MxQty: number = this.maxPrice / PriceBand;
        this.MaxQuantity = Math.floor(Math.floor(MxQty) / parseInt(this.BidLot));
        if (rr > this.MaxQuantity) {
          rr--;
          r.controls.bidno.setValue(rr);
        }
        this.CountBidAmountUsingUpperPriceBand(rr, i)
        //}
      }
      else {
        let rr = r.controls.bidno.value;
        this.CountBidAmountUsingUpperPriceBand(rr, i)
      }
    }
    else {
      //r.controls.TotalBidAmount.setValue('');
      if (para == 'keyup') {
        if (event.length >= this.UpperPriceBand.toString().length) {
          this.AlertPriceRange(r,i);
        }
      }
      else {
        this.AlertPriceRange(r,i);
      }
    }
  }
  AlertPriceRange(r,i) {
    this.CallAlertModal(`Please enter price between ${this.LowerPriceBand} and  ${this.UpperPriceBand}`);
    //if (this.selectedCategory != 'SHA') {
      r.controls.price.setValue(this.UpperPriceBand);
    //}
    // else {
    //   r.controls.price.setValue('');
    // }
    let rr = r.controls.bidno.value;
    this.CountBidAmountUsingUpperPriceBand(rr, i)
  }
  checkValue(event: any, i) {
    
    let r: any = this.b.controls[i];
    if (event.target.checked == true) {
      r.controls.price.setValue(this.UpperPriceBand);
      r.controls.cbx.setValue(true);
    } else {
      r.controls.price.setValue('');
      r.controls.cbx.setValue(false);
      //this.binddata();
    }
    let rr = r.controls.bidno.value;
    this.CountBidAmountUsingUpperPriceBand(rr, i);
  }
  incCounter1(i) {
    let r: any = this.b.controls[i];
    let rr = r.controls.bidno.value;
    rr++;
    r.controls.bidno.setValue(rr);
    this.CountBidAmountUsingUpperPriceBand(rr, i);
  }
  decCounter1(i) {
    let r: any = this.b.controls[i];
    let rr = r.controls.bidno.value;
    if (rr == 1) {
    } else {
      rr--;
      r.controls.bidno.setValue(rr);
      this.CountBidAmountUsingUpperPriceBand(rr, i);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    //
    debugger
    if (changes.selectedCategory != undefined && changes.selectedCategory != null) {
      let cat = changes.selectedCategory.currentValue;
      switch (cat) {
        case 'IND':
          this.maxPrice = 200000;
          break;
        case 'SHA':
          this.maxPrice = 500000;
          break;
        case 'EMP':
          this.maxPrice = 500000;
          break;
        case 'POL':
          this.maxPrice = 200000;
          break;
        case 'HNI':
          if (this.TrinityFlag == 'N') {
            this.maxPrice = 500000;
          }
          break;
        default:
          this.maxPrice = 200000;
          break;
      }
      if (cat == 'HNI') {
        this.DisableCuttoff = true;
      }
      else {
        this.DisableCuttoff = false;
      }
    }
    let c = this.b.controls;
    let bb = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
    let rk = sessionStorage.getItem('gjh$jbLjk2r2nw');
    if ((bb != null && bb != undefined && bb != '') || rk == '1') {
      for (let i = 0; i < c.length; i++) {
        let r: any = this.b.controls[i];
        let rr = r.controls.bidno.value;
        this.CountBidAmountUsingUpperPriceBand(rr, i);
      }
      if (this.selectedCategory != '') {
        sessionStorage.removeItem('gjh$jbLjk2r2nw');
      }
    }
    else {
      for (let i = 0; i < c.length; i++) {
        let r: any = this.b.controls[i];
        if (this.selectedCategory == 'HNI') {
          r.controls.cbx.setValue(false);
          r.controls.price.setValue('');
        }
        else {
          if (i == 0) {
            r.controls.cbx.setValue(true);
            r.controls.price.setValue(this.UpperPriceBand);
          }
          else {
            r.controls.cbx.setValue(false);
            r.controls.price.setValue('');
          }
        }
        if (this.TrinityFlag == 'Y') {
          r.controls.TotalBidAmount.setValue(0);
          r.controls.bidno.setValue(1);
          //r.controls.price.setValue('');
          //r.controls.cbx.setValue(false);

          this.CountBidAmountUsingUpperPriceBand(1, i);
        }
        else {
          //let rr = r.controls.bidno.value;
          r.controls.bidno.setValue(1);
          //r.controls.price.setValue(this.UpperPriceBand);
          //r.controls.cbx.setValue(true);

          this.CountBidAmountUsingUpperPriceBand(1, i);
        }
        $(`#IdBtnBidInc_${i}`).prop("disabled", false);
      }
    }

  }
  SwitchCase(event) {
    switch (this.selectedCategory) {
      case "IND":
        this.discountPrize = event.ind;
        break;
      case "SHA":
        this.discountPrize = event.sha;
        break;
      case "EMP":
        this.discountPrize = event.emp;
        break;
      case "POL":
        this.discountPrize = event.pol;
        break;
      default:
        this.discountPrize = 0;
        break;
    }
  }
  addBid(val: string = "") {
    let pc = 0;
    if (this.IsForModify) {
      if (val == "1") {
        pc = this.BidCount;
      } else {
        pc = this.BidCount - 1;
      }
    } else {
      pc = this.BidCount;
    }
    this.IsForModify = false;
    let cuttoffflag = true;
    let price = this.UpperPriceBand;
    if (this.TrinityFlag == 'Y' || this.selectedCategory == 'HNI') {
      cuttoffflag = false;
      price = '';
    }
    // if (this.selectedCategory == 'HNI') {
    //      cuttoffflag = false;
    //      price = '';
    // }

    for (let i = this.b.length; i < pc; i++) {
      this.b.push(
        this.fb.group({
          bidno: [1],
          price: [price],
          cbx: [cuttoffflag],
          TotalBidAmount: [this.totalBidAmount],
          NoofLots: [0],
          ActionCode: ['N'],
          bidid: [''],
          asbaid: [0],
        })
      );
      if (this.selectedCategory != '') {
        this.CountBidAmountUsingUpperPriceBand(1, i)
      }
    }
    this.BidCount = this.BidCount + 1;
  }
  DeletBid(i) {
    this.b.removeAt(i);
    this.BidCount = this.BidCount - 1;
    this.binddata();
  }
  binddata() {
    ////
    let final = [];
    for (let i = 0; i < this.b.length; i++) {
      let r: any = this.b.controls[i];
      let binddata: any = {}
      binddata.NoofLotsBid1 = r.controls.NoofLots.value;
      binddata.BidLot = this.BidLot;
      binddata.totalBidAmountBid1 = r.controls.TotalBidAmount.value;
      if (r.controls.cbx.value) {
        binddata.CutOffFlag = 1;
        binddata.bidPriceBid1 = this.UpperPriceBand;
      }
      else {
        binddata.CutOffFlag = 0
        binddata.bidPriceBid1 = r.controls.price.value;
      }
      binddata.bidIndex = i + 1;
      binddata.bidid = r.controls.bidid.value;
      binddata.asbaid = r.controls.asbaid.value;
      binddata.ActionCode = this.SetActionCode(r, i);
      final.push(binddata);
    }

    sessionStorage.setItem('fdfsdf*%gsdfhdf=', (JSON.stringify(final)));
  }
  SetActionCode(r, i) {
    let b = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
    let action = 'N'
    if (b != null && b != undefined && b != '') {
      let d: any = JSON.parse((b));
      if (d.asba != null && d.asba != undefined) {
        if (d.asba.length > 0) {
          let pd = d.asba[i];
          let cbx = r.controls.cbx.value;
          if (cbx) {
            cbx = 1
          }
          else {
            cbx = 0;
          }
          if (pd.Amount != r.controls.TotalBidAmount.value || pd.CutOffFlag != cbx) {
            action = 'M'
          }
        }
      }
    }
    return action;
  }
  CallAlertModal(msg: any) {
    $("#AlertModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#AlertModalContent').html(msg);
  }
  ValidatePattern(flag, e) {

    if (flag == "Number") {
      const charCode = (e.which) ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }
    else if (flag == "NumberandCharc") {
      const k = (e.which) ? e.which : e.keyCode;
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));

    }
    else if (flag == "Chars") {

      const k = (e.which) ? e.which : e.keyCode;
      if ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32) {

      }
      else {
        e.preventDefault();
      }

    }
  }
  OnPaste(e) {
    e.preventDefault();
  }
  OnDrop(e) {
    e.preventDefault();
  }
}
