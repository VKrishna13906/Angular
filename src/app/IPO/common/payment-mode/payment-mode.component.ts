import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncrdecrService } from 'src/app/Auth/encrdecr.service';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
declare var $:any;
@Component({
  selector: "app-payment-mode",
  templateUrl: "./payment-mode.component.html",
  styleUrls: ["./payment-mode.component.css"],
})
export class PaymentModeComponent implements OnInit {
  @Input() TrinityFlag;
  @Input() ClientUPIId;
  @Input() CompId;
  @Input() ASBAAccountNo:string = '';
  UPIIDName: string = '';
  UPiIdExtension: string = ''
  extension: string = ''
  SelectedValue;
  UPIHandlerList:any[] = [];
  UPIForm: FormGroup;
  UPIFormsubmitted: boolean = false;
  constructor(private iposervice: IPOServiceService,
    private EncrdecrService: EncrdecrService,private hireasdkask :  JksdgfuehdnoService,
    private fb: FormBuilder) {
      this.UPIForm = this.fb.group({
        upi: ['', [Validators.required]],
     })
    }

    ngOnInit() {
      debugger
      localStorage.setItem('PaymentDetailsStart', JSON.stringify(new Date().getTime()));
      if (this.TrinityFlag == 'Y') {
        sessionStorage.setItem("kfnekfmcejfem", "0");
      } else {
        sessionStorage.setItem("kfnekfmcejfem", "1");
      }
      this.iposervice.IPOFillDetails('', this.CompId, 'UPIHandlerList').subscribe((res) => {
        let data = JSON.parse((res))
        if (data != null){
          if (data.ArrayOfResponse.length > 0){
            
            this.UPIHandlerList = data.ArrayOfResponse;
            this.UPIHandlerList.map(arr => {
              arr.TEXTFIELD = (arr.TEXTFIELD).toLowerCase();
            })
          }
        }
      }) 
      var loaderInterval = setInterval(() => {
        let str = document.readyState;
        if (str == 'complete') {
          if (this.ClientUPIId != undefined && this.ClientUPIId != null) {
            if (this.ClientUPIId != '') {
              let u = this.ClientUPIId.split('@');
              this.k.upi.setValue(u[0]);
              this.SelectedValue = `@${u[1]}`;
              let r = this.UPIHandlerList.find(a => a.TEXTFIELD == this.SelectedValue);
              if(r != undefined && r != null){
                $('.CustomSelect0').val(r.VALUEFIELD).trigger('change');
              }
              else{
                this.k.upi.setValue('');
                $('.CustomSelect0').val('').trigger('change');
              }
            }
            else{
              this.k.upi.setValue('');
                $('.CustomSelect0').val('').trigger('change');
            }
            this.BindNameAndExtension();
            localStorage.setItem('PaymentDetailsEnd', JSON.stringify(new Date().getTime()))
            clearInterval(loaderInterval);
          }
        }
      }, 1000);
    }

    get k() {
      return this.UPIForm.controls;
    }

    ngAfterViewInit() {
      $('.CustomSelect0').select2().on('change', (e: any) => this.onChangeHandler(e));
    }

    onChangeUPIId(event){
      $('.CustomSelect0').val('').trigger('change');
    }

    onChangeHandler(e){
      let r = this.UPIHandlerList.find(a => a.VALUEFIELD == e.target.value);
      if(r != undefined && r != null){
        this.SelectedValue = r.TEXTFIELD;
      }
      else{
        this.SelectedValue = "";
      }
      this.BindNameAndExtension();
    }

    BindNameAndExtension(){
      let UPIId = {
        "name":this.k.upi.value,
        "handler":this.SelectedValue
      }
      sessionStorage.setItem('dfsd*sdfsd$dg=', (JSON.stringify(UPIId)));
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
        //
        //return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 45 || k == 46 || k == 95 || (k >= 48 && k <= 57));
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
    
    OnChangeRadio(e){
      debugger
      sessionStorage.setItem("kfnekfmcejfem", e.target.value);
    }
}
