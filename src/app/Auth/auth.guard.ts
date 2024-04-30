import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService} from '../services/login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService , private router: Router, private LoginService : LoginService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.authService.isAuthenticated();
    if(token){
      return true;
    }
    else{
      return this.router.parseUrl("/employee-login");
    }
    //const token = this.LoginService.AuthData;
    //if(token !='' && token != undefined && token != null){
    //  return true;
    //}
    //else{
    //  return this.router.parseUrl("/login");
    //}
  }
  
}
