import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { EncrdecrService } from './../Auth/encrdecr.service';
import { LoginService} from '../services/login.service';
import { AuthService } from './auth.service';
import { CustomLoaderService } from '../services/custom-loader.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
@Injectable({
  providedIn: 'root'
})
export class EmpAccessGuard implements CanActivate {
  constructor(private EncrdecrService: EncrdecrService,
    private authService: AuthService , private router: Router,
     private LoginService : LoginService,
     private Loader: CustomLoaderService,private hireasdkask :  JksdgfuehdnoService,){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      //////
      this.Loader.hide();

      const UserType = parseInt((sessionStorage.getItem('L2D3506kIHSk3E0')));
      if(UserType == 1){
        return true;
      }
      else{
        return this.router.parseUrl("/access-denied");
      }

  }
}
