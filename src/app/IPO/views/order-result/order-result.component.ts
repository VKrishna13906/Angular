
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncrdecrService } from 'src/app/Auth/encrdecr.service';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';
import { environment } from 'src/environments/environment'; 
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
@Component({
  selector: "app-order-result",
  templateUrl: "./order-result.component.html",
  styleUrls: ["./order-result.component.css"],
})
export class OrderResultComponent implements OnInit {
  showBidAddedMsg: boolean = true;
  ApplicationNo: string = '';
  AppliedAmount: any = '';
  TrinityFlag: string = "";
  KotakMessage: string="";
  IPOEndate: string="";
  constructor(private router: Router,
    private EncrdecrService: EncrdecrService,
    private Loader: CustomLoaderService,
    private hireasdkask :  JksdgfuehdnoService) { }

  ngOnInit() {
    debugger;
    //history.pushState(null, null, window.location.href);
    //history.back();
    //window.onpopstate = () => history.forward();
    this.Loader.show();
    //var loaderInterval = setInterval(() => {
      //let str = document.readyState;
      //if (str == 'complete') {
        let value: any = sessionStorage.getItem('cfhf5@6nS$vxhb=');
        this.TrinityFlag = (value);
        let data = sessionStorage.getItem('jkhg$8fsdnL9Hg');
        let enddate = sessionStorage.getItem('jsdhkfjhkueudbk');
        sessionStorage.removeItem('jkhg$8fsdnL9Hg');
        if (enddate != undefined && enddate != null && enddate != '') {
          this.IPOEndate = enddate;
        }
        if (data != undefined && data != null && data != '') {
          let d = JSON.parse(data)
          this.ApplicationNo = d.APPLICATIONNO;
          this.AppliedAmount = (d.CHEQUEAMOUNT).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          this.Loader.hide();
          if(environment.CompayName == "Kotak")
          {
            this.KotakMessage= d.NewFlag;
          }
          else{
            this.KotakMessage= "₹" + this.AppliedAmount + "will be blocked in your linked a/c within one working day after the closure of the issue; please maintain sufficient balance.";
          }
        }
        else {
          this.Loader.hide();
          this.router.navigateByUrl('/ipo');
        }
        //clearInterval(loaderInterval)
     // }
   // }, 1000);

  }

  backToHome() {
    let u = sessionStorage.getItem('L2D3506kIHSk3E0');
    if (u != undefined && u != null && u != '') {
      let ut = parseInt((u));
      if(ut == 1){
        this.router.navigateByUrl("/ipo/dashboardmain");
      }
      else{
        this.router.navigateByUrl("/ipo");
      }
    }
    else{
      this.router.navigateByUrl("/ipo");
    }
  }
}
