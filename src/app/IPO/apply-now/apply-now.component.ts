import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { AlphaNumericOnly } from 'src/app/validation';
import { EncrdecrService } from '../../Auth/encrdecr.service';
import { NotAuthorizedAlertComponent } from '../not-authorized-alert/not-authorized-alert.component';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';
declare var $: any;
@Component({
  selector: 'app-apply-now',
  templateUrl: './apply-now.component.html',
  styleUrls: ['./apply-now.component.scss']
})
export class ApplyNowComponent implements OnInit {
  clientDetailsForm: FormGroup;
  LoginId: string;
  clientDetailsFormSearch: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  modalRef?: BsModalRef;
  constructor(public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private ipoService: IPOServiceService,
    private EncrdecrService: EncrdecrService,
    private router: Router,
    private route: ActivatedRoute,
    private hireasdkask :  JksdgfuehdnoService,
    private loader : CustomLoaderService) {
    this.clientDetailsForm = this.fb.group({
      clientCode: ['', [Validators.required, Validators.pattern(AlphaNumericOnly)]]
    });
  }


  ngOnInit() {
    //
    this.LoginId = sessionStorage.getItem('F44sGAGh2xwkpUL');
    console.log("loginID", this.LoginId);
   
  }
  get k() {
    return this.clientDetailsForm.controls;
  }
  modalClose() {
    this.bsModalRef.hide();
  }

  SearchClient() {
    this.loader.show();
    this.clientDetailsFormSearch = true;
    if (this.clientDetailsForm.invalid) {
      this.loader.hide();
      return;
    }
    else {
      let request:any = {
        EmpCode: this.LoginId,
        client_code: this.clientDetailsForm.controls['clientCode'].value
      }
      debugger
      request = JSON.stringify(request);
      let inputdata: any = {
        data: this.hireasdkask.setPageNotFound(request)
        //data: (request)
      }
      this.ipoService.GetIPONCDClientSearch(inputdata).subscribe(res => {
        this.modalClose();
        if (res.Message.toLowerCase().includes('not authorized')) {
          this.loader.hide();
          let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          this.modalRef = this.modalService.show(NotAuthorizedAlertComponent, ngbModalOptions);
        }
        else{
          if (res.ID > 0) {
            debugger
            let r = JSON.parse(res.Message);
            let pan = r[0].client_pan;
            sessionStorage.setItem('gjhfHunj#n&fdghcod', r[0].client_code);
            sessionStorage.setItem('gjhfHunj#n&fdgh', pan);
            this.loader.hide();
            this.router.navigate(['/ipo'], { relativeTo: this.route });
          }
          else {
            this.loader.hide();
            this.CallAlertModal('Client data not found.')
          }
        }
        
      });
    }
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
  // OnPaste(e) {
  //   e.preventDefault();
  // }
  // OnDrop(e) {
  //   e.preventDefault();
  // }
  CallAlertModal(msg: any) {
    $("#AlertModal").modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#AlertModalContent').text(msg);
  }
}
