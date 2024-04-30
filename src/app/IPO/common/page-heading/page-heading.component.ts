import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from '../../../validation';
import { EncrdecrService } from '../../../Auth/encrdecr.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
@Component({
  selector: 'app-page-heading',
  templateUrl: './page-heading.component.html',
  styleUrls: ['./page-heading.component.css']
})
export class PageHeadingComponent implements OnInit {
  ClientCode: string = '';
  G_UserType: number = 0;
  logo : string;
  constructor(private EncrdecrService: EncrdecrService,
    private router: Router,
    private route: ActivatedRoute,private hireasdkask :  JksdgfuehdnoService) { }

  ngOnInit() {
    this.logo = sessionStorage.getItem('logo')
    let u = sessionStorage.getItem('L2D3506kIHSk3E0');
    if (u != undefined && u != null && u != '') {
      this.G_UserType = parseInt((u));
      let c = sessionStorage.getItem('gjhfHunj#n&fdghcod');
      if (c != undefined && c != null && c != '') {
        this.ClientCode = (c);
      }
    }
  }
  GoToHome(){
    if(!isNullOrUndefined(sessionStorage.getItem('sfjsgueiid'))){
      sessionStorage.removeItem('sfjsgueiid');
    }
    if(this.G_UserType == 1 && this.ClientCode != ''){
      this.router.navigate(['/ipo/dashboardmain'], { relativeTo: this.route });
    }
    else{
      //this.router.navigate(['/ipo'], { relativeTo: this.route });
      //this.router.navigateByUrl('/ipo')
      //window.location.href = '/preipo/ipo';
    }
  }
}
