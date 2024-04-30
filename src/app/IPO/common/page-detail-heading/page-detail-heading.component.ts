import { Component, OnInit , Input} from '@angular/core';
import { EncrdecrService } from 'src/app/Auth/encrdecr.service';

@Component({
  selector: 'app-page-detail-heading',
  templateUrl: './page-detail-heading.component.html',
  styleUrls: ['./page-detail-heading.component.css']
})
export class PageDetailHeadingComponent implements OnInit {

  @Input() hedingText: string;
  @Input() redirectionLink: string;

  constructor(
    private EncriptionService : EncrdecrService
  ) { }

  ngOnInit() {
  }
OnClickBack(link:string){
  debugger
  if(link == "order-placement"){
    sessionStorage.setItem('sfjsgueiid',this.EncriptionService.getDecr('Back'));
    sessionStorage.setItem('gjh$jbLjk2r2', "1");
    sessionStorage.setItem('gjh$jbLjk2r2nw', "1");
  }  
  else{
    sessionStorage.removeItem('sfjsgueiid');
  }
  if(this.hedingText == "Application Details")
  {
    sessionStorage.setItem('gjh$hyuqjdjbLjk2r2nw', "1");
  }
}
  

}
