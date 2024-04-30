import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientDataService } from '../services/client-data.service';

@Injectable({
  providedIn: 'root'
})
export class PageRestrictionGuard implements   CanActivate{
  constructor(private router: Router,
    private ClientDataService:ClientDataService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean
    | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let url =window.location.href;
    //////
    //this.getCompanyDetails();
    const CorporateFag = sessionStorage.getItem('Vbhs@#%LMKIo=');
    //alert(CorporateFag);

    if(CorporateFag !='C' && CorporateFag !=null && CorporateFag!=undefined){
      if(url.indexOf('/cp-login')>-1
      || url.indexOf('/login-corp')>-1
      || url.indexOf('/login-corp/investor') >-1
      || url.indexOf('/employee-login')>-1
      || url.indexOf('/cp-forgot-password')>-1
      || url.indexOf('/forgot-password-corp')>-1
      //|| url.indexOf('/cp-forgot-password')>-1
      )
      {
        return this.router.parseUrl("**");

      }
      else{
        return true;
      }
    }
    else if(CorporateFag =='C' ){
      if(url.indexOf('/login')>-1
      || url.indexOf('/forgot-password')>-1
      || url.indexOf('login/investor')>-1)
      {///////////////////
        return this.router.parseUrl("**");

      }
      else{
        return true;
      }
    }
    // if(url.indexOf('/cp-login')>-1)
    // //alert(url);
    // else
    // alert('not found');
   //return true;
  }
  // getCompanyDetails(){
  //   this.ClientDataService.getCompanyDetails(1).subscribe((data:any)=>{

  //     if(data != null && data.ArrayOfResponse.length!=0){
  //       sessionStorage.setItem('E#$%#XCha7%*=',data.ArrayOfResponse[0].Dummy2);
  //           sessionStorage.setItem('Vbhs@#%LMKIo=',data.ArrayOfResponse[0].Dummy1)
  //     }
  //   });
  //     }

}
