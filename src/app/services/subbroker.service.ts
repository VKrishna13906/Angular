import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConvertToJSONService } from './convert-to-json.service';
import { EncrdecrService } from './../Auth/encrdecr.service';
import { Observable } from 'rxjs';
import { JksdgfuehdnoService } from '../jksdgfuehdno.service';
const headers = { headers: new HttpHeaders({ 'content-type': 'application/json' }) }
const headersnojson = { headers: new HttpHeaders({ }) }

@Injectable({
  providedIn: "root",
})
export class SubbrokerService {
  baseUrl = environment.ServerUrl;
  constructor(
    private http: HttpClient,
    private EncrdecrService: EncrdecrService,
    private ConvertToJSON: ConvertToJSONService,
    private hireasdkask : JksdgfuehdnoService
  ) {}
  GetToken() {
    let token = sessionStorage.getItem("`huR,8@RK9^??b4 -.hfs!!uR,XX");
    let UserId = (
      sessionStorage.getItem("m5JkoXISmYRAIuY")
    );
    let User_Type = (
      sessionStorage.getItem("L2D3506kIHSk3E0")
    );
    let IpAddress = sessionStorage.getItem("Tgsh@#3734fjfskshh==");
    console.log(
      "token::  " + token + "@" + UserId + "|" + User_Type + "|" + IpAddress
    );
    const TOKEN = btoa(
      token + "@" + UserId + "|" + User_Type + "|" + IpAddress
    );
    const tokenOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Basic ${TOKEN}`,
      }),
    };
    return tokenOption;
  }
  getApprovedList(Search, Login_Id, Flag): Observable<any> {
    const url = `${this.baseUrl}/api/SubbrokerList/Details?TRANS_TYPE=${Flag}&PageIndex=1&PageSize=0&Search=${Search}&LOGIN_ID=${Login_Id}`;
    const json = this.ConvertToJSON.QueryStringToJSON(url.split("?")[1]);
    return this.http.post<any>(url, json, this.GetToken());
  }
  getPendingList(Search, Login_Id, Flag): Observable<any> {
    const url = `${this.baseUrl}/api/SubbrokerList/Details?TRANS_TYPE=${Flag}&PageIndex=1&PageSize=0&Search=${Search}&LOGIN_ID=${Login_Id}`;
    const json = this.ConvertToJSON.QueryStringToJSON(url.split("?")[1]);
    return this.http.post<any>(url, json, this.GetToken());
  }
  DownloadApplicationForm(formdata: any) {
    const url = `${this.baseUrl}/api/BindPdfdata/BindDataToPdfFile`;
    return this.http.post<any>(url, formdata, headers);
  }
  FinalSubmit(DataBody): Observable<any> {
    const url = `${this.baseUrl}/api/SBSignUpLog/Details`;
    return this.http.post<any>(url, DataBody, headers);
  }
  getBranchList(): Observable<any> {
    const url = `${this.baseUrl}/api/DropDown/Details?TRANS_TYPE=Branch_master&REFF_ID=&CON_STR=&REFF_ID2=`;
    return this.http.get<any>(url, this.GetToken());
  }
  getEmpList(BranchId): Observable<any> {
    const url = `${this.baseUrl}/api/DropDown/Details?TRANS_TYPE=BRANCH_ROLE_WISE_EMP&REFF_ID=${BranchId}&CON_STR=SMC&REFF_ID2=6`;
    return this.http.get<any>(url);
  }
}
