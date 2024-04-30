import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConvertToJSONService } from './convert-to-json.service';
const headers = { headers: new HttpHeaders({ 'content-type': 'application/json' }) }
@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  private WelcomeText:any;
  private CompanyName:any;
  ServerUrl4 = environment.ServerUrl4;


  constructor(private http: HttpClient,private ConvertToJSON: ConvertToJSONService) { }
  SetWelcomeText(message: string) {
    this.WelcomeText = message;
  }
  GetWelcomeText() {
    return this.WelcomeText;
  }
  SetCompanyName(name: string) {
    this.CompanyName = name;
  }
  GetCompanyName() {
    return this.CompanyName;
  }

  clearData() {
    this.WelcomeText = '';
    this.CompanyName = '';
  }
  // getCompanyDetails(CompanyId) {
  //   let Url = `${this.ServerUrl4}/api/CompanyDetails/Details`;
  //   const QueryString = `Flag=CompanyWise&CompanyId=${CompanyId}`;
  //   const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
  //   return this.http.post<any>(Url,body,headers);
  // }
}
