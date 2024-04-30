import { Component, OnInit } from '@angular/core';
import { EncrdecrService } from 'src/app/Auth/encrdecr.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
@Component({
  selector: 'app-client-dp-id',
  templateUrl: './client-dp-id.component.html',
  styleUrls: ['./client-dp-id.component.css']
})
export class ClientDpIdComponent implements OnInit {
  DPID: string = "";
  ClientId: string = "";
  IsShowDpid: boolean = true;
  constructor(private EncrdecrService: EncrdecrService,private hireasdkask :  JksdgfuehdnoService) { }

  ngOnInit() {
    localStorage.setItem('ClientDPIdDetailsStart', JSON.stringify(new Date().getTime()))
    if (sessionStorage.getItem('gjh$jbLjk') == "0") {
      let d = sessionStorage.getItem('mhsd#d@l;d*g#hjb');
      if (d != undefined && d != null) {
        let r = JSON.parse((d));
        let cd: any = {};
        if (r != null) {
          if (r.objIPOClientDD != null) {
            let nsdlcdsl = r.objIPOClientDD[0].NSDLCDSL;
            if (nsdlcdsl == 'CDSL') {
              this.IsShowDpid = false;
              this.ClientId = r.objIPOClientDD[0].ClientID;
            }
            else {
              this.IsShowDpid = true;
              this.ClientId = (r.objIPOClientDD[0].ClientID).substring(0, 8);
              this.DPID = r.objIPOClientDD[0].DPID;
            }
            cd.ClientDPID = this.DPID;
            cd.ClientID = r.objIPOClientDD[0].ClientID;
            cd.nsdlcdsl = nsdlcdsl
          }
        }
        sessionStorage.setItem('dfushgucdslnsdl', (JSON.stringify(cd)));
      }

    }
    else {
      let cd: any = {};
      let d = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
      if (d != undefined && d != null) {
        let r = JSON.parse((d));
        if (r.DPType == 'CDSL') {
          this.IsShowDpid = false;
          this.ClientId = r.ClientID
        }
        else {
          this.IsShowDpid = true;
          this.ClientId = r.ClientID.substring(0, 8);
          this.DPID = r.DPID;
        }
        cd.ClientDPID = this.DPID;
        cd.ClientID = this.ClientId;
        cd.nsdlcdsl = r.DPType
        sessionStorage.setItem('dfushgucdslnsdl', (JSON.stringify(cd)));
      }
    }
    localStorage.setItem('ClientDPIdDetailsEnd', JSON.stringify(new Date().getTime()))
  }

}
