import { Component, OnInit } from '@angular/core';
import { EncrdecrService } from '../../../Auth/encrdecr.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-show-client-code',
  templateUrl: './show-client-code.component.html',
  styleUrls: ['./show-client-code.component.scss']
})
export class ShowClientCodeComponent implements OnInit {
  ClientCode: string = '';
  G_UserType: number = 0;
  SSOLogin : string;
  Response : boolean = true;
  constructor(private EncrdecrService: EncrdecrService,
    private router: Router,
    private hireasdkask :  JksdgfuehdnoService,private route: ActivatedRoute) { }

  ngOnInit() {
    debugger
    let u = sessionStorage.getItem('L2D3506kIHSk3E0');
    this.SSOLogin = sessionStorage.getItem('5V5uSYBoBVqAvBIBqUEBhv6ELFF');
    let link : string = this.router.url;
    if(link.includes('summary'))
    {
      this.SSOLogin = '00'
    }    
    if (u != undefined && u != null && u != '') {
      this.G_UserType = parseInt((u));
      let c = sessionStorage.getItem('gjhfHunj#n&fdghcod');
      if (c != undefined && c != null && c != '') {
        this.ClientCode = (c);
      }
    }
  }
}
