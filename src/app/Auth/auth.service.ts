import { Injectable } from '@angular/core';
//import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //public jwtHelper: JwtHelperService = new JwtHelperService();
  constructor() { }
  public isAuthenticated(): boolean {
    //////////
    const token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');

    // Check whether the token is expired and return
    // true or false
    //return !this.jwtHelper.isTokenExpired(token);
    if(token != null){
      return true;
    }
    else{
      return false;
    }
  }
}
