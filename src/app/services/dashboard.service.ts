import { ConvertToJSONService } from './convert-to-json.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EncrdecrService } from './../Auth/encrdecr.service';
import { JksdgfuehdnoService } from '../jksdgfuehdno.service';
const headers = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  ServerUrl3 = environment.ServerUrl3;
  ServerUrl4 = environment.ServerUrl4;
  ServerUrl2 = environment.ServerUrl2;
  ServerURL7 = environment.ServerUrl7;
  IsWrapperAPI = environment.IsWrapperAPI;

  constructor(private http: HttpClient,
    private EncrdecrService: EncrdecrService,
    private ConvertToJSON: ConvertToJSONService,
    private hireasdkask :  JksdgfuehdnoService)  {


     }


  GetDashboardDetail(subbrokerId:string,subbrokerCode:string): Observable<any[]> {
    //////////
    let url = `${this.ServerUrl3}/api/BusinessDashboard/Details?SB_ID=${subbrokerId}&SUBBROKERCODE=${subbrokerCode}`;
    //console.log('Dashboard => '+url)
    const header = this.GetToken();
    return this.http.get<any[]>(url,header).pipe();
  }
  GetClientDashboardDetail(clientId:number): Observable<any[]> {

    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let UserType = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token +"@"+UserId+"|"+UserType+"|"+IpAddress);
      const tokenOption = { headers:
      new HttpHeaders(
        {'Content-Type': 'application/json',
        'Authorization': `Basic ${TOKEN}`,
      })
    }
    console.log(token +"@"+UserId+"|"+UserType+"|"+IpAddress);
    let url='';
    let QueryString ='';
    if(this.IsWrapperAPI){
       url = `${this.ServerUrl4}/api/BusinessDashboard/GetDetails`;
       QueryString = `ClientBasicInfoId=${clientId}`;
    }
    else{
       url = `${this.ServerUrl4}/api/BusinessDashboard/Details?ClientBasicInfoId=${clientId}`;
    }
    console.log(url);
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    return this.http.post<any[]>(url,body,tokenOption).pipe();
  }

  GetFamilyDashboardDetail(familyId:number): Observable<any[]> {
    //
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let UserType = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token +"@"+UserId+"|"+UserType+"|"+IpAddress);
      const tokenOption = { headers:
      new HttpHeaders(
        {'Content-Type': 'application/json',
        'Authorization': `Basic ${TOKEN}`,
      })
    }
    let url = `${this.ServerUrl4}/api/BusinessDashboard/Details`;
    const QueryString = `FAMILY_ID=${familyId}`;
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    return this.http.post<any[]>(url,body,tokenOption).pipe();
  }

  GetFamilyGroupDetail(familyGroupId:number): Observable<any[]> {
    ////////
   // familyGroupId = 1148;
   let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let UserType = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token +"@"+UserId+"|"+UserType+"|"+IpAddress);
      const tokenOption = { headers:
      new HttpHeaders(
        {'Content-Type': 'application/json',
        'Authorization': `Basic ${TOKEN}`,
      })
    }
    let url = `${this.ServerUrl2}/api/ClientFamilyGroup/ClientFamilyGroupDetails`;
    const QueryString = `TRANS_TYPE=&REFF_ID=${familyGroupId}`;
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    //console.log(url);
    return this.http.post<any[]>(url,body,tokenOption).pipe();
  }
  getAIFDashboardData(subbrokerId: string, subbrokerCode: string, UserType: string): Observable<any[]> {
    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerURL7}/api/UserDashBoardAIF?LOGIN_ID=${subbrokerId}&Role_ID=0&USER_TYPE=${UserType}&SUB_BROKER_CODE=${subbrokerCode}`;
    console.log(url);
    return this.http.post<any[]>(url,'').pipe();
  }

  getDEDashboardData(subbrokerId: string, subbrokerCode: string, UserType: string): Observable<any[]> {
    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerURL7}/api/UserDashBoardDE/Details?LOGIN_ID=${subbrokerId}&Role_ID=0&USER_TYPE=${UserType}&SUB_BROKER_CODE=${subbrokerCode}`;
    return this.http.post<any[]>(url,'').pipe();
  }

  getPMSDashboardData(subbrokerId: string, subbrokerCode: string, UserType: string): Observable<any[]> {
    // tslint:disable-next-line: max-line-length
     const url = `${this.ServerURL7}/api/UserDashBoardPMS?LOGIN_ID=${subbrokerId}&Role_ID=0&USER_TYPE=${UserType}&SUB_BROKER_CODE=${subbrokerCode}`;
    // const url = `http://173.249.23.172:9099/api/UserDashBoardPMS?LOGIN_ID=1608&Role_ID=1&USER_TYPE=1`;
    return this.http.post<any[]>(url,'').pipe();
  }
  getCPDashboardData(subbrokerId: string, subbrokerCode: string, UserType: string): Observable<any[]> {
    // tslint:disable-next-line: max-line-length
     //const url = `${this.ServerURL7}/api/UserDashBoardPMS?LOGIN_ID=${subbrokerId}&Role_ID=0&USER_TYPE=${UserType}&SUB_BROKER_CODE=${subbrokerCode}`;
    const url = `${this.ServerURL7}/api/BirlaSubbrokerLandingDashBoard?USER_ID=00006220&LOGIN_ID=3001&RoleID=0&USER_TYPE=2`;
    const header = this.GetToken();
    return this.http.get<any[]>(url,header).pipe();
  }
  NetBanking(body): Observable<any>{
    //const header = this.GetToken();
    const url = `${this.ServerURL7}/api/NetBanking/CheckClient?${body}`;
    return this.http.get<any>(url).pipe();
  }
  GetToken(){
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let UserType = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token +"@"+UserId+"|"+UserType+"|"+IpAddress);
     const tokenOption = { headers:
      new HttpHeaders(
        {'Content-Type': 'application/json',
        'Authorization': `Basic ${TOKEN}`,
      })
    }
    return tokenOption;
  }

  GetTopFund(Flag:string): Observable<any[]> {
    let url = `${this.ServerUrl4}/api/Top2SchemeList/Details?ExChangeFlag=${Flag}`;
    return this.http.get<any[]>(url).pipe();
  }
}
