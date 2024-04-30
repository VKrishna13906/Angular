import {formatDate} from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
//const headers = { headers: new HttpHeaders({ 'content-type': 'application/json' }) }
import { EncrdecrService } from '../Auth/encrdecr.service';
import { catchError } from 'rxjs/operators';
import { JksdgfuehdnoService } from '../jksdgfuehdno.service';
const headers = { headers: new HttpHeaders({ 'content-type': 'application/json' }) }
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  AuthData : string;
  GlobalARN : string;
  ServerUrl5 = environment.ServerUrl5;
  ServerUrl9 = environment.ServerUrl9;
  ServerUrl10 = environment.ServerUrl10;
  errorData: {};
  constructor(private http: HttpClient, private EncrdecrService : EncrdecrService,private hireasdkask :  JksdgfuehdnoService) { }

  PostLoginInfo(formData:any,UserType:number,IP:string = ''): Observable<any> {
    ////////
      debugger
    let DataUrl = `${this.ServerUrl5}/api/Authenticate/Authenticate`;
    let fd = JSON.parse(formData);
    if(UserType === 2){
      fd.Username = `ARN-${fd.Username}`
    }
    let un = (fd.Username);
    let pd = (fd.Password);
    let ut = UserType;
    let TOKEN = btoa(`${un}:${pd}:${ut}`);

    //alert(TOKEN);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${TOKEN}`
      })
    }
    return this.http.post<any>(DataUrl, '', httpOptions).pipe(
      catchError(this.handleError)
    );
    // let DataUrl = `${this.ServerUrl9}/api/Authenticate/Authenticate`;
    // let fd = JSON.parse(formData);
    // // if(UserType === 2){
    // //   fd.Username = `ARN-${fd.Username}`
    // // }
    // //console.log(fd);
    // let un = (fd.Username);


    // let pd = (fd.Password);

    // let ut = UserType;
    // let ip = (IP);

    // //console.log('un=' + un + '\npd =' + pd);
    // //////
    // let TOKEN = btoa(`${un}:${pd}:${ut}`);  //:${ip}
    // let req ={
    //   "USER_ID":un,
    //   "PWD":pd,
    //   "USER_TYPE":ut,
    //   "IPAddress":ip
    // }
    // const jsonbody = JSON.stringify(req);
    // const httpOptions = {
    //   headers:
    //   new HttpHeaders(
    //     {'Content-Type': 'application/json', 'Authorization': `Basic ${TOKEN}`})
    // }
    // return this.http.post<any>(DataUrl, jsonbody, httpOptions).pipe(
    //   catchError(this.handleError)
    // );
  }

  //SaveLogFrontEnd(msg:string,exception:string): Observable<any> {
  //  let DataUrl = `${this.ServerUrl}/api/ErrorLog/FrontEndLog?Message=${msg}&Exception=${exception}`;
  //  return this.http.get<any>(DataUrl).pipe();
  //}

  //SaveLogBackEnd(msg:string,exception:string): Observable<any> {
  //  let DataUrl = `${this.ServerUrl}/api/ErrorLog/BackEndLog?Message=${msg}&Exception=${exception}`;
  //  return this.http.get<any>(DataUrl).pipe();
  //}

  Logout(TokenID:string): Observable<any> {
    let DataUrl = `${this.ServerUrl5}/api/Logout/Logout`;
    //?TOKEN_ID=${TokenID}
    console.log(DataUrl);
    console.log(TokenID);
    const req = {
      "TOKEN_ID":TokenID.split('-')[0]
    }

    const body = JSON.stringify(req);
    console.log(body);
    return this.http.post<any>(DataUrl,body,headers).pipe();
  }

  SendOTP(body): Observable<any[]> {
    let url = `${this.ServerUrl5}/api/OTP/Details`;
    return this.http.post<any[]>(url,body, headers).pipe();
  }

  VerifyOTP(body): Observable<any[]> {
    let url = `${this.ServerUrl5}/api/Forgotpass/VerifyOTP`;
    return this.http.post<any[]>(url,body, headers).pipe();
  }

  ChangePassword(formData): Observable<any[]> {
    ////////
    let url = `${this.ServerUrl5}/api/Forgotpass/Details`;
    return this.http.post<any>(url, formData, headers).pipe();
  }

  //-----------------------------------------------------------------------
  PostLogin_NSE_Info(formData:any,UserType:number,IP:string = ''): Observable<any> {
    //////
    debugger
    let DataUrl = `${this.ServerUrl10}/api/Authenticate/Authenticate`;
    //let DataUrl = `${this.ServerUrl9}/api/Authenticate/Authenticate`;
    let fd = JSON.parse(formData);
    // if(UserType === 2){
    //   fd.Username = `ARN-${fd.Username}`
    // }
    //console.log(fd);
    let un =(fd.Username);
    
    // let iv = '345Nspb#$#479KJN';
    // let un = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(fd.Username.toString()), '345Nspb#$#479KJN'+ formatDate(new Date(), 'dd/mm/yyyy', 'en'),
    // {
    //     keySize: 128 / 8,
    //     iv: iv,
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7
    // });


    let pd =(fd.Password);
    // let pd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(fd.Password.toString()), '345Nspb#$#479KJN'+ formatDate(new Date(), 'dd/mm/yyyy', 'en'),
    // {
    //     keySize: 128 / 8,
    //     iv: iv,
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7
    // });

    let ut = UserType;
    let ip =(IP);
    // let ip = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(IP.toString()), '345Nspb#$#479KJN'+ formatDate(new Date(), 'dd/MM/yyyy', 'en'),
    // {
    //     keySize: 128 / 8,
    //     iv: iv,
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7
    // });

    //console.log('un=' + un + '\npd =' + pd);
    //////
    let TOKEN = btoa(`${un}:${pd}:${ut}`);  //:${ip}
    let req ={
      "USER_ID":un,
      "PWD":pd,
      "USER_TYPE":ut,
      "IPAddress":ip
    }
    const jsonbody = JSON.stringify(req);
    const httpOptions = {
      headers:
      new HttpHeaders(
        {'Content-Type': 'application/json', 'Authorization': `Basic ${TOKEN}`})
    }
    
    return this.http.post<any>(DataUrl, jsonbody, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  SendOTP_NSE(body): Observable<any[]> {
    let url = `${this.ServerUrl9}/api/OTP`;
    return this.http.post<any[]>(url,body, headers).pipe();
  }

  VerifyOTP_NSE(body): Observable<any[]> {
    let url = `${this.ServerUrl9}/api/Forgotpass/VerifyOTP`;
    return this.http.post<any[]>(url,body, headers).pipe();
  }

  ChangePassword_NSE(formData): Observable<any[]> {
    let url = `${this.ServerUrl9}/api/Forgotpass/Details`;
    return this.http.post<any>(url, formData, headers).pipe();
  }

  //-----------------EMPLOYEE LOGIN-----------------------
  Post_EmployeeLogin(formData:any,UserType:number,IP:string = ''): Observable<any> {
    debugger
    let DataUrl = `${this.ServerUrl10}/api/Authenticate/Authenticate`;
    //let DataUrl = `${this.ServerUrl5}/api/Authenticate/Authenticate`;
    // let fd = JSON.parse(formData);
    // let un = (fd.Username);
    // let pd = (fd.Password);
    // let ut = UserType;
    // let ip = (IP);
      let fd = JSON.parse(formData);
    // if(UserType === 2){
    //   fd.Username = `ARN-${fd.Username}`
    // }
    //console.log(fd);
    let un =(fd.Username);
    
  


    let pd =(fd.Password);
    

    let ut = UserType;
    let ip =(IP);
  
    //console.log('un=' + un + '\npd =' + pd);
    let TOKEN = btoa(`${un}:${pd}:${ut}`);
    let req ={
      "USER_ID":un,
      "PWD":pd,
      "USER_TYPE":ut,
      "IPAddress":ip
    }
    const jsonbody = JSON.stringify(req);
    console.log(jsonbody);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', //'Authorization': `Basic ${TOKEN}`
    })
    }
    debugger
    console.log(DataUrl);
    return this.http.post<any>(DataUrl, jsonbody, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    ////////
    //if (error.error instanceof ErrorEvent) {
    //  console.error('An error occurred:', error.error.message);
    // // this.SaveLogFrontEnd(`${error.error.message}`,``);
    //} else {
    //  console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    //  //this.SaveLogBackEnd(`${error.error.message}`,`${error.error}`);
    //}
    // return an observable with a user-facing error message
    //this.errorData = {
    //  status: error.status,
    //  res: error.error
    //};
    return throwError(error);
  }

  test(formData): Observable<any> {
    let DataUrl = `${this.ServerUrl5}/api/SMSService/SendOTP`;
    //console.log(DataUrl)
    return this.http.post<any>(DataUrl, formData, headers);
  }

  SaveUserData(formData): Observable<any[]> {
    let url = `${this.ServerUrl9}/api/MahindraUser/Details`;
    return this.http.post<any>(url, formData, headers).pipe();
  }

  SSOLogin(Token:string):Observable<any[]>{

    Token = Token.replace(/\+/g,'%2B')
    let url = `${this.ServerUrl9}/api/AutoLogin/GetDetails?brokerToken=${Token}`;
    return this.http.get<any>(url, headers).pipe();
  }
}
