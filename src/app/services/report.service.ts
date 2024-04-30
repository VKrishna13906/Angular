import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { AllocationPDFService } from './export/allocation-pdf.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncrdecrService } from './../Auth/encrdecr.service';
import {ConvertToJSONService} from '../services/convert-to-json.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { JksdgfuehdnoService } from '../jksdgfuehdno.service';
//import { SelectControlValueAccessor } from '@angular/forms';

const headers = { headers: new HttpHeaders({ 'content-type': 'application/json' }) }

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  SetSelectedMenu: string;
  SetSelectedTab: string;
  ExchangeFlag: number;
  CompanyType: number;
  ServerUrl4 = environment.ServerUrl4;
  ServerUrl3 = environment.ServerUrl3;
  ServerUrl2 = environment.ServerUrl2;
  ServerUrl8 = environment.ServerUrl8;
  ServerUrl7 = environment.ServerUrl7;
  ServerUrl9 = environment.ServerUrl9;

  constructor(private http: HttpClient,
    private EncrdecrService: EncrdecrService,
    private ConvertToJSON: ConvertToJSONService,
    private hireasdkask :  JksdgfuehdnoService) {


  }

  //----------------common for all
  GetAllClient(UserType, SubBrokerId): Observable<any> {

    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    const url = `${this.ServerUrl3}/api/ReportFilter/ReportDetails`;
    const QueryString = `TRANS_TYPE=USERCODE_WISE_CLIENT&LOGIN_ID=0&USER_TYPE=${UserType}&ZONE_ID=0&REGION_ID=0&BRANCH_ID=0&SB_ID=${SubBrokerId}&EMP_ID=0&FAMILY_ID=0&CLIENT_ID=0`;
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    let djsd = JSON.stringify(body);
    return this.http.post<any>(url,body, tokenOption).pipe();
  }
  //Used in NatureWise Report
  Get_DropDownDetailsNature(TRANS_TYPE) {
    //console.log("Nature::" + `${this.ServerUrl4}/api/DropDown/Details?TRANS_TYPE=${TRANS_TYPE}&CON_STR=MF`);
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    const url = `${this.ServerUrl4}/api/DropDown/ReportDetails`
    const QueryString = `TRANS_TYPE=${TRANS_TYPE}&CON_STR=MF`;
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    return this.http.post<any>(url,body,tokenOption).pipe();
  }
  //Used in AMCSchemeWise Report
  Get_DropDownDetails(sbid,Flag) {
    //
    let url = `${this.ServerUrl4}/api/DropDown/ReportDetails?TRANS_TYPE=${Flag}&CON_STR=MF&REFF_ID=${sbid}`
    const body = this.ConvertToJSON.QueryStringToJSON(url.split('?')[1]);
    url = url.split('?')[0];
    const token =  this.GetToken();
    //return this.http.get<any>(url).pipe();
    return this.http.post<any>(url,body,token).pipe();
  }
  //Used in AMCSchemeWise Report
  Get_SchemeName_AMCSchemeWise(sbid, AmcCode,Flag) {
    let url =`${this.ServerUrl4}/api/DropDown/ReportDetails?TRANS_TYPE=${Flag}&CON_STR=MF&REFF_ID=${sbid}&REFF_ID2=${AmcCode}`;
    const body = this.ConvertToJSON.QueryStringToJSON(url.split('?')[1]);
    url = url.split('?')[0];
    const token = this.GetToken();
    return this.http.post<any>(url,body,token).pipe();
  }
  //Used in Allocation Report
  Get_SchemeName_AmcCodeWise(AmcCode) {
    return this.http.get<any>(`${this.ServerUrl4}/api/DropDown/ReportDetails?TRANS_TYPE=SchemeList&CON_STR=MF&REFF_ID=${AmcCode}&REFF_ID2=Equity`).pipe();
  }
  //used in Return Summary and Return Detail Report
  GetAssetType() {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    return this.http.get<any>(`${this.ServerUrl4}/api/DropDown/ReportDetails?TRANS_TYPE=ASSET_TYPE&CON_STR=MF`, tokenOption);
  }

  //#region added for family
  Get_AllFamilyGroupDetails(UserType, LoginUserId) {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    let url: string;
    let QueryString  ="";
    if (UserType == "3") {
      url = `${this.ServerUrl2}/api/ClientFamilyGroup/GetFamilyList`;
      // QueryString = `PrefixText=&LoginUserId=${LoginUserId}&TRANS_TYPE=EMPLOYEE`;
      QueryString = `PrefixText=&LoginUserId=${LoginUserId}&TRANS_TYPE=Client`;
    }
    else if (UserType == "1") {
      url = `${this.ServerUrl2}/api/ClientFamilyGroup/GetFamilyList`;
      QueryString = `PrefixText=&LoginUserId=${LoginUserId}&TRANS_TYPE=EMPLOYEE`;
      }
    else {
      url = `${this.ServerUrl2}/api/ClientFamilyGroup/GetFamilyList`;
      QueryString  =  `PrefixText=&LoginUserId=${LoginUserId}&TRANS_TYPE=SUBBROKER`;
    }
    //console.log(url)
    const body =  this.ConvertToJSON.QueryStringToJSON(QueryString);
    return this.http.post<any>(url,body, tokenOption);
  }
  Get_SelectedFamilyGroupDetails(REFF_ID) {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })

    }
    const url = `${this.ServerUrl2}/api/ClientFamilyGroup/ClientFamilyGroupDetails`;
    const QueryString = `TRANS_TYPE=&REFF_ID=${REFF_ID}`;
    const body =  this.ConvertToJSON.QueryStringToJSON(QueryString);
    return this.http.post<any>(url, body,tokenOption);
  }
  //#endregion

  //-------------------------------

  //=================SIP Reports=================
  GetActiveSIPReport(FromDate, EndDate, UserType, formData): Observable<any> {
    //////////
    let url = `${this.ServerUrl4}/api/ActiveSIPReport/Details?TRANS_TYPE=CLIENT_ID&FromDate=${FromDate}&EndDate=${EndDate}&UserType=${UserType}`;
    console.log(url);
    const header = this.GetToken();
    return this.http.post<any>(url, formData, header);
  }
  GetSTPReportReport(FromDate, EndDate, UserType, formData,ClientId,EmployeeId): Observable<any> {
    //////////
    let url = `${this.ServerUrl4}/api/STPReport/Details?TRANS_TYPE=CLIENT_ID&FromDate=${FromDate}&EndDate=${EndDate}&UserType=${UserType}&ClientBasicInfoIdList=${ClientId}&EmployeeCode=${EmployeeId}`;
    console.log(url);
    const header = this.GetToken();
    return this.http.post<any>(url, formData, header);
  }
  GetBounceSIPReport(FromDate, EndDate, UserType, formData): Observable<any> {

    let url = `${this.ServerUrl4}/api/SIPBounce/Details?TRANS_TYPE=CLIENT_ID&FromDate=${FromDate}&EndDate=${EndDate}&UserType=${UserType}`;
    const header = this.GetToken();
    return this.http.post<any>(url, formData, header);
  }
  GetMaturedSIPReport(FromDate, EndDate, UserType, LoginId, formData): Observable<any> {
    let url = `${this.ServerUrl4}/api/SIPEndDate/Details?TRANS_TYPE=CLIENT_ID&FromDate=${FromDate}&EndDate=${EndDate}&UserType=${UserType}&LOGIN_ID=${LoginId}`
    //console.log(url)
    const header = this.GetToken();
    return this.http.post<any>(url, formData, header);
  }
  GetTerminatedSIPReport(FromDate, EndDate, UserType, LoginId, formData): Observable<any> {
    let url = `${this.ServerUrl4}/api/SIPTermination/Details?TRANS_TYPE=CLIENT_ID&FromDate=${FromDate}&EndDate=${EndDate}&UserType=${UserType}&LOGIN_ID=${LoginId}`;
    //console.log(url)
    const header = this.GetToken();
    return this.http.post<any>(url, formData, header);
  }
  GetRegisteredSIPReport(FromDate, EndDate, UserType, LoginId, formData): Observable<any> {
    let url = `${this.ServerUrl4}/api/SIPAddition/Details?TRANS_TYPE=CLIENT_ID&FromDate=${FromDate}&EndDate=${EndDate}&UserType=${UserType}&LOGIN_ID=${LoginId}`;
    //console.log(url)
    const header = this.GetToken();
    return this.http.post<any>(url, formData, header);
  }
  Get_AMCwiseSIP(SUB_BROKER_CODE) {
    let url = `${this.ServerUrl4}/api/AMCWiseSIPDetails/Details?SUB_BROKER_CODE=${SUB_BROKER_CODE}&TRANS_TYPE=ALLClient`;
    //console.log(url)
    return this.http.get<any>(url);
  }

  //=================AUM and Other Reports=================
  Get_AUM_NatureWise2(UserType, NATURE, USER_ID,RoleId): Observable<any> {
    let url = `${this.ServerUrl4}/api/AUMWiseReportNew?TRANS_TYPE=Nature_SubNature&USER_TYPE=${UserType}&NATURE=${NATURE}&SubNature=&USER_ID=${USER_ID}&Role_ID=${RoleId}&SubBrokerID=${USER_ID}`;
  console.log('Nature wise URL:: '+ url);
    return this.http.get<any>(url);
  }

  GetAUMReportFundWise(UserType, SchemeCode, AMCCode, USER_ID, formData,RoleId): Observable<any> {
    let url = `${this.ServerUrl4}/api/AUMWiseReportNew?USER_TYPE=${UserType}&TRANS_TYPE=FUND_WISE&SchemeCode=${SchemeCode}&AMCCode=${AMCCode}&USER_ID=${USER_ID}&Role_ID=${RoleId}&SubBrokerID=${USER_ID}`;
    console.log(url);
    return this.http.get<any>(url);
  }
  Get_AMCwiseAUMreport(SUB_BROKER_CODE) {
    return this.http.get<any>(`${this.ServerUrl4}/api/AUMWiseReport/AUMDetails?SUB_BROKER_CODE=${SUB_BROKER_CODE}&TRANS_TYPE=AMC`);
  }

  GetHierarchywiseReport(UserType, Login_ID, formData) {
    let url = `${this.ServerUrl4}/api/AUMWiseReport?TRANS_TYPE=SUBBROKER&LOGIN_ID=${Login_ID}&USER_TYPE=${UserType}&TransId=${Login_ID}`
    //console.log(url);
    return this.http.get<any>(url);
  }

  GetOrderBookReport(UCCCode, FromDate, EndDate, Flag) {
    let url = `${this.ServerUrl3}/api/OrderBook/OrderBookDetails?UCCCode=${UCCCode}&FromDate=${FromDate}&EndDate=${EndDate}&Flag=${Flag}`;
    console.log(url);
    return this.http.get<any>(url);
  }

  //=================Portfolio Reports=================
  GetAllocationAMCReport(PAN, UserType, LoginId, clientId, Employee, subBrokerId, LoginUserIdCode, RoleId): Observable<any> {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    console.log('allocation token '+token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    Employee = 0;
    if (UserType = 3) {
      subBrokerId = "0"
    }
    RoleId = "1";
    let url = `${this.ServerUrl4}/api/ClientAllocationReport`;
    const QueryString = `PANNo=${PAN}&TRANS_TYPE=CLIENTDETAILS_BYPAN&UserType=${UserType}&LOGIN_ID=${LoginId}&ClientBasicInfoId=${clientId}&REFF_ID=AMC&Employee=${Employee}&SubBroker=${subBrokerId}&LogInUserID_Code=${LoginUserIdCode}&Role_ID=${RoleId}`;
    const body =this.ConvertToJSON.QueryStringToJSON(QueryString);
    console.log('Allocation body '+JSON.stringify(body));
    return this.http.post<any>(url,body, tokenOption);
  }
  GetAllocationAssetReport(PAN, UserType, LoginId, clientId, Employee, subBrokerId, LoginUserIdCode, RoleId): Observable<any> {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    Employee = 0;
    if (UserType = 3) {
      subBrokerId = "0"
    }
    let url = `${this.ServerUrl4}/api/ClientAllocationReport`;
    const QueryString =  `PANNo=${PAN}&TRANS_TYPE=CLIENTDETAILS_BYPAN&UserType=${UserType}&LOGIN_ID=${LoginId}&ClientBasicInfoId=${clientId}&REFF_ID=AssetType&Employee=${Employee}&SubBroker=${subBrokerId}&LogInUserID_Code=${LoginUserIdCode}&Role_ID=${RoleId}`;
    console.log(QueryString);
    const body  =  this.ConvertToJSON.QueryStringToJSON(QueryString);
      console.log(JSON.stringify(body));
    //console.log('Asset  ' + url);
    return this.http.post<any>(url,body, tokenOption);
  }
  //#region Return Summary
  GetReturnSummaryReport(clientId, Employee, subBrokerId, LoginInUserId, Schemecode, AMCCode, AssetType, AsOnDate, FolioNo): Observable<any> {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    console.log("tken "+token + "@" + UserId + "|" + User_Type + "|" + IpAddress)
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    Employee = 0;
    //let FolioNo = "0";
    let url = `${this.ServerUrl4}/api/PortfolioBreakdown`;
    const QueryString = `CON_STR=MF&TRANS_TYPE=Client&ClientBasicInfoId=${clientId}&EMPLOYEE_CODE=${Employee}&SUB_BROKER_CODE=${subBrokerId}&LogInUserID_Code=${LoginInUserId}&SchemeCode=${Schemecode}&AMCCode=${AMCCode}&FolioNumber=${FolioNo}&AssetType=${AssetType}&FromDate=01-01-1901&EndDate=${AsOnDate}`;
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    console.log('Return Summary : ' + url);
    console.log('Return Summary body : ' + JSON.stringify(body));
    return this.http.post<any>(url, body, tokenOption);
  }
  GetHoldingSummaryAMCList() {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    let url = `${this.ServerUrl4}/api/DropDown/ReportDetails?TRANS_TYPE=amc_list&REFF_ID=&CON_STR=MF&REFF_ID2=&REFF_ID3=`;
    //console.log(url)
    return this.http.get<any>(url, tokenOption);
  }
  //#endregion
  GetReturnDetailReport(UserType, clientId, Employee, subBrokerId, LoginInUserId, AsOnDate, ReportType): Observable<any> {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    Employee = 0;
    let url = `${this.ServerUrl4}/api/HoldingDetailRepor`;

    const QueryString = `ClientBasicInfoId=${clientId}&EMPLOYEE_CODE=${Employee}&SUB_BROKER_CODE=${subBrokerId}&LogInUserID_Code=${LoginInUserId}&FromDate=01-01-1901&EndDate=${AsOnDate}&REFF_ID=0&REFF_ID=${ReportType}`;
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    console.log('Detailed Holding Request ');
    console.log(JSON.stringify(body));
    return this.http.post<any>(url,body, tokenOption);
  }
  //#region Capital Gain Report
  GET_CapitalGainReport(USER_TYPE, ClientBasicInfoIdList, FromDate, EndDate, GrandFather, FinancialYear, LoginInUserId, Employee, subBrokerId, Role_ID): Observable<any> {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    Employee = 0;
    if (USER_TYPE == 3) { subBrokerId = "0" }
    let url = `${this.ServerUrl4}/api/CapitalGainWithAndWithoutIndexsation/Details`;
    const QueryString = `TRANS_TYPE=CLIENT_ID&Employee=${Employee}&SubBroker=${subBrokerId}&USER_TYPE=${USER_TYPE}&LogInUserID_Code=${LoginInUserId}&ClientBasicInfoIdList=${ClientBasicInfoIdList}&FromDate=${FromDate}&EndDate=${EndDate}&GrandFather=${GrandFather}&FinancialYear=${FinancialYear}&select_type=true`;
    const body =  this.ConvertToJSON.QueryStringToJSON(QueryString);
    //console.log('WI='+url)
    return this.http.post<any>(url,body, tokenOption);
  }

  GET_CapitalGainWithoutIndexation(USER_TYPE, ClientBasicInfoIdList, FromDate, EndDate, GrandFather, FinancialYear, LoginInUserId, Employee, subBrokerId, Role_ID): Observable<any> {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    Employee = 0;
    if (USER_TYPE == 3) { subBrokerId = "0" }
    let url = `${this.ServerUrl4}/api/CapitalGainWithAndWithoutIndexsation/Details`;
    const QueryString = `TRANS_TYPE=CLIENT_ID&Employee=${Employee}&SubBroker=${subBrokerId}&USER_TYPE=${USER_TYPE}&LogInUserID_Code=${LoginInUserId}&ClientBasicInfoIdList=${ClientBasicInfoIdList}&FromDate=${FromDate}&EndDate=${EndDate}&GrandFather=${GrandFather}&FinancialYear=${FinancialYear}&select_type=false`;
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);

    //console.log('WOI='+url)
    return this.http.post<any>(url,body,tokenOption);
  }

  Get_FinancialYear() {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    const url = `${this.ServerUrl4}/api/DropDown/ReportDetails?TRANS_TYPE=FinancialYears`;
    return this.http.get<any>(url, tokenOption);
  }
  //#endregion

  Get_DividendDetails(FromDate, EndDate, UserType, ClientId) {
    let url = `${this.ServerUrl4}/api/DividendDetails/Details`;
    const QueryString = `TRANS_TYPE=CLIENT_ID&Flag=CLIENT_ID&FromDate=${FromDate}&EndDate=${EndDate}&UserType=${UserType}&ClientBasicInfoId=${ClientId}&ClientBasicInfoIdList=${ClientId}`;
    const body  =  this.ConvertToJSON.QueryStringToJSON(QueryString);
    //console.log(url)
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    // return this.http.post<any>(url, formData, tokenOption)
    return this.http.post<any>(url, body,tokenOption)
  }

  //#region Transaction Report
  GetTransactionReport(FromDate, EndDate, AMCCode, SchemeCode, TransactionType, TransactionSubType
    , NATURE, SubNature, USER_TYPE, LogInUserID_Code, Role_ID, formData): Observable<any> {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    let url = `${this.ServerUrl4}/api/ViewTransaction/Details?TRANS_TYPE=CLIENT_ID&FromDate=${FromDate}&EndDate=${EndDate}&AMCCode=${AMCCode}&SchemeCode=${SchemeCode}&TransactionType=${TransactionType}&TransactionSubType=${TransactionSubType}&NATURE=${NATURE}&SubNature=${SubNature}&USER_TYPE=${USER_TYPE}&LogInUserID_Code=${LogInUserID_Code}&Role_ID=${Role_ID}&PageIndex=1&Flag=Page&PageSize=100`
    //console.log(url);
    return this.http.post<any>(url, formData, tokenOption);
  }
  GetNature() {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    let url = `${this.ServerUrl4}/api/DropDown/Details?TRANS_TYPE=Nature&REFF_ID=&REFF_ID2=&REFF_ID3=&CON_STR=MF`;
    return this.http.get<any>(url, tokenOption);
  }
  GetSubNature(nature) {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    let url = `${this.ServerUrl4}/api/DropDown/Details?TRANS_TYPE=TransSubNature&REFF_ID=${nature}&REFF_ID2=&REFF_ID3=&CON_STR=MF`;
    return this.http.get<any>(url, tokenOption);
  }
  GetSubTransactionType(TransactionType) {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    let url = `${this.ServerUrl4}/api/DropDown/Details?TRANS_TYPE=TransactionTypeALL&REFF_ID=${TransactionType}&REFF_ID2=&REFF_ID3=&CON_STR=MF`;
    return this.http.get<any>(url, tokenOption);
  }
  GetTransactionAMCList() {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    let url = `${this.ServerUrl4}/api/DropDown/Details?TRANS_TYPE=FundHouse_list&REFF_ID=&REFF_ID2=&REFF_ID3=&CON_STR=MF`;
    //console.log(url)
    return this.http.get<any>(url, tokenOption);
  }
  //#endregion

  //used in Transaction Report and Return Summary
  GetTransactionSchemeList(AMCCode, ClientId) {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    let url = `${this.ServerUrl4}/api/DropDown/ReportDetails?TRANS_TYPE=ClientWiseSchemeCode&REFF_ID=${ClientId}&REFF_ID2=${AMCCode}&REFF_ID3=&CON_STR=MF`;
    console.log(url);
    return this.http.get<any>(url, tokenOption);
  }
  //not used
  GetTransactionSubType() {
    return this.http.get<any>(`${this.ServerUrl4}/api/DropDown/Details?TRANS_TYPE=TransactionType&REFF_ID=&REFF_ID2=&REFF_ID3=&CON_STR=MF`, headers);
  }


  //#region explore Funds Services
  GetExploreFundsData() {
    let url = `${this.ServerUrl3}/api/BSESchemeList/SchemeList`;
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token +"@"+UserId+"|"+User_Type+"|"+IpAddress);
     const tokenOption = { headers:
      new HttpHeaders(
        {'Content-Type': 'application/json',
        'Authorization': `Basic ${TOKEN}`,
      })
    }
    return this.http.get<any[]>(url,tokenOption).pipe();
  }
  //#endregion
  GetExploreFundsData_NSE() {
    let url = `${this.ServerUrl8}/api/NSESchemeList/SchemeList`;
    const header = this.GetToken();
    return this.http.get<any[]>(url,header).pipe();
  }
  // Get IIN Report Data
  getIINReportData(ClientBasicInfoId, UserType, SelectType, UserId) {
    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl8}/api/ClientACHMandate/IINDetailsList?REFF_ID=${ClientBasicInfoId}&UserType=${UserType}&select_type=${SelectType}&USER_ID=${UserId}`;
    console.log('IIN Report URL ' + url);
    return this.http.get<any>(url);
  }
  // End of IIN Report Data

  // getting NSE Family List
  getNSEFamilyDetails(REFF_ID) {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token +"@"+UserId+"|"+User_Type+"|"+IpAddress);
     const tokenOption = { headers:
      new HttpHeaders(
        {'Content-Type': 'application/json',
        'Authorization': `Basic ${TOKEN}`,
      })
    }
    return this.http.get<any>(`${this.ServerUrl2}/api/ClientFamilyGroup/Details?TRANS_TYPE=&REFF_ID=${REFF_ID}`,tokenOption);
  }
  // end

  // Getting NSE Family Members
  Get_NSEFamilyDetail(UserType, LoginUserId) {
    // //////
    let url: string;
    if (UserType === '3') {
      url = `${this.ServerUrl2}/api/ClientFamilyGroup/GetFamilyList?PrefixText=&LoginUserId=${LoginUserId}&TRANS_TYPE=EMPLOYEE`;
    } else {
      url = `${this.ServerUrl2}/api/ClientFamilyGroup/GetFamilyList?PrefixText=&LoginUserId=${LoginUserId}&TRANS_TYPE=SUBBROKER`;
    }
    // console.log(url)
    return this.http.get<any>(url);
  }
  // end

  // Get NSE Orderbook Report Data
  getNSEOrderBook(FromDate, EndDate, ClientBasicInfoId, ApplicationId, PWD, Broker_code, UniqueNo) {

    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl8}/api/NSEReport/GetOrderDetails?FromDate=${FromDate}&EndDate=${EndDate}&CUSTOMER_ID=${ClientBasicInfoId}&APPLN_ID=${ApplicationId}&PWD=${PWD}&BROKER_CODE=${Broker_code}&unique_no=${UniqueNo}`;
    console.log('nse order book data' + url)
    return this.http.get<any>(url);
  }
  // End of IIN Report Data

  // Get NSE Orderbook Report Data
  getNSECredential() {
    // tslint:disable-next-line: max-line-length
    const header = this.GetToken();
    const url = `${this.ServerUrl8}/api/NSETransactionCommon/GetNSECredentialSetting`;
    return this.http.get<any>(url,header);
  }
  // End of IIN Report Data

  // Get NSE Orderbook Report Data
  getClientsIIN(ClientBasicInfoId) {
    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl8}/api/NSEReport/GetClientUCCDetails?ClientBasicInfoId=${ClientBasicInfoId}&Flag=Comma`;
    return this.http.get<any>(url);
  }
  // End of IIN Report Data
  // Get NSE Orderbook Report Data
  getACHMandateData(ClientBasicInfoId, UserType) {
    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl8}/api/ClientACHMandate/ACHMandateList?REFF_ID=${ClientBasicInfoId}&UserType=${UserType}`;
    return this.http.get<any>(url);
  }
  // End of IIN Report Data

  // Get PMS Transaction Data
  getPMSTransaction(TRANS_TYPE, UserType, LogInUserID_Code, FromDate, EndDate, ClientBasicInfoId) {
    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl7}/api/ViewTransactionPMS?TRANS_TYPE=${TRANS_TYPE}&USER_TYPE=${UserType}&LogInUserID_Code=${LogInUserID_Code}&PageIndex=1&Flag=Page&FromDate=${FromDate}&EndDate=${EndDate}&PageSize=999999&ClientBasicInfoIdList=${ClientBasicInfoId}`;
    return this.http.get<any>(url);
  }
  // End PMS Transaction Data

  // Get DE Transaction Data
  getDETransaction(TRANS_TYPE, UserType, LogInUserID_Code, FromDate, EndDate, ClientBasicInfoId) {
    // tslint:disable-next-line: no-shadowed-variable
    const headers = { 'content-type': 'application/json' };
    const data = { ClientBasicInfoIdList: ClientBasicInfoId };
    const body = JSON.stringify(data);
    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl7}/api/ViewTransactionDE?TRANS_TYPE=${TRANS_TYPE}&USER_TYPE=${UserType}&LogInUserID_Code=${LogInUserID_Code}&PageIndex=1&Flag=Page&FromDate=${FromDate}&EndDate=${EndDate}&PageSize=999999`;
    return this.http.post<any>(url, body, { headers });
  }
  // End Get DE Transaction Data

  // Get AIF Transaction Data
  getAIFTransaction(TRANS_TYPE, UserType, LogInUserID_Code, ClientBasicInfoId) {
    // tslint:disable-next-line: no-shadowed-variable
    const headers = { 'content-type': 'application/json' };
    const data = { ClientBasicInfoIdList: ClientBasicInfoId };
    const body = JSON.stringify(data);
    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl7}/api/AIFLedgerRepor?TRANS_TYPE=CLIENT_ID&USER_TYPE=${UserType}&LogInUserID_Code=${LogInUserID_Code}&Role_ID=0`;

    return this.http.post<any>(url, body, { headers });
  }
  // End Get AIF Transaction Data

  // Get PMS Holding Data
  getPMSHoldings(TRANS_TYPE, UserType, LogInUserID_Code, ClientBasicInfoId) {
    // tslint:disable-next-line: max-line-length
    const headers = { 'content-type': 'application/json' };
    const data = { ClientBasicInfoIdList: ClientBasicInfoId };
    const body = JSON.stringify(data);
    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl7}/api/HoldingReportPMS?TRANS_TYPE=${TRANS_TYPE}&USER_TYPE=${UserType}&LogInUserID_Code=${LogInUserID_Code}&PageIndex=1&Flag=Page&PageSize=999999&ClientBasicInfoIdList=${ClientBasicInfoId}`;

    return this.http.post<any>(url, body, { headers });
  }
  // End PMS Transaction Data

  // Get PMS Transaction Data
  getPMSSales(TRANS_TYPE, UserType, LogInUserID_Code, FromDate, EndDate, ClientBasicInfoId) {
    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl7}/api/NetSaleReportPMS?ClientBasicInfoIdList=${ClientBasicInfoId}&TRANS_TYPE=${TRANS_TYPE}&Employee=0&SubBroker=0&USER_TYPE=${UserType}&LogInUserID_Code=${LogInUserID_Code}&Role_ID=0&FromDate=${FromDate}&EndDate=${EndDate}`;

    return this.http.get<any>(url);
  }
  // End PMS Transaction Data

  // Get DE Holding Data
  getDEHoldings(TRANS_TYPE, UserType, LogInUserID_Code, ClientBasicInfoId, EmpId, SBId) {
    // tslint:disable-next-line: max-line-length
    const headers = { 'content-type': 'application/json' };
    const data = { ClientBasicInfoIdList: ClientBasicInfoId, EMPID: EmpId, SBID: SBId };
    const body = JSON.stringify(data);
    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl7}/api/HoldingReportDE?TRANS_TYPE=${TRANS_TYPE}&USER_TYPE=${UserType}&LogInUserID_Code=${LogInUserID_Code}&Role_ID=0 `;
    return this.http.post<any>(url, body, { headers });
  }
  // End De Holding Data

  // Get Calculated XIRRR by ClientBasicInfo Id
  getCalculatedXIRR(ClientBasicInfoId) {
    return this.http.get<any>(`${this.ServerUrl7}/api/Reports_All_IN_OneView/GetClientHoldingTransctionDe?CLIENT_ID=${ClientBasicInfoId}`);
  }
  // end of getinig XIRRR

  // Get DE Capital Gain
  getDECapitalGain(TRANS_TYPE, UserType, LogInUserID_Code, ClientBasicInfoId, EmpId, SBId, FromDate, ToDate) {
    // tslint:disable-next-line: max-line-length
    const url =`${this.ServerUrl7}/api/CapitalGainWithAndWithoutIndexsationDE?TRANS_TYPE=${TRANS_TYPE}&Employee=${EmpId}&SubBroker=${SBId}&USER_TYPE=${UserType}&LogInUserID_Code=${LogInUserID_Code}&Role_ID=0&TYPE=&ClientBasicInfoIdList=${ClientBasicInfoId}&FromDate=${FromDate}&EndDate=${ToDate}`;
    const body = this.ConvertToJSON.QueryStringToJSON(url.split('?')[1]);
    const header = this.GetToken();
    return this.http.post<any>(url.split('?')[0],body,header);
  }
  // end of getinig DE Capital Gain

  // OneView Report Data
  getOneViewReport(TRANS_TYPE, UserType, LogInUserID_Code, ClientBasicInfoId, EmpId, SBCode, FromDate, ToDate) {
    // tslint:disable-next-line: max-line-length
    const url =`${this.ServerUrl7}/api/Reports_All_IN_OneView/Details?CLIENT_ID=${ClientBasicInfoId}&EMPLOYEE_CODE=0&SUBBROKER_CODE=${SBCode}&TRANS_TYPE=${TRANS_TYPE}&FromDate=${FromDate}&EndDate=${ToDate}&LogInUserID_Code=${LogInUserID_Code}&ModuleName=Page`;
    const body = this.ConvertToJSON.QueryStringToJSON(url.split('?')[1]);
    const header = this.GetToken();
    return this.http.post<any>(url.split('?')[0],body,header);
  }
  // end of OneView Report Data
  getMFOneViewXIRR(ClientId) {
    const url =`${this.ServerUrl7}/api/Reports_All_IN_OneView/GetClientHoldingTransction?CLIENT_ID=${ClientId}&AssetType=`;
    const body = this.ConvertToJSON.QueryStringToJSON(url.split('?')[1]);
    const header = this.GetToken();
    return this.http.post<any>(url.split("?")[0],body,header);
  }
  getDEOneViewXIRR(ClientId) {

    const url = `${this.ServerUrl7}/api/Reports_All_IN_OneView/GetClientHoldingTransctionWithFilterXIRRPMS?CLIENT_ID=${ClientId}&AssetType=&FolioNumber=&SchemeCode=&AMCCode=`;

    const header = this.GetToken();
    const body = this.ConvertToJSON.QueryStringToJSON(url.split('?')[1]);
    return this.http.post<any>(url.split("?")[0],body,header);
  }
  getPMSOneViewXIRR(ClientId) {
    return this.http.get<any>(`${this.ServerUrl7}/api/Reports_All_IN_OneView/GetClientHoldingTransctionDe?CLIENT_ID=${ClientId}&AssetType=`);
  }
  //////////////////////////EMPLOYEE////////////////////////////

  EmployeeDashboard(LOGIN_ID, USER_ID, USER_TYPE) {
    let Url = `${this.ServerUrl7}/api/BirlaSubbrokerLandingDashBoard/Details?LOGIN_ID=${LOGIN_ID}&USER_ID=${USER_ID}&USER_TYPE=${USER_TYPE}`;
    const header = this.GetToken();
    return this.http.get<any>(Url,header);
  }
  MF_Dashboard(LOGIN_ID, Role_ID) {
    let Url = `${this.ServerUrl7}/api/EmployeeDashboard/Details?LOGIN_ID=${LOGIN_ID}&Role_ID=${Role_ID}`;
    console.log(Url);
    return this.http.get<any>(Url);
  }
  Post_PortfolioAllocation(formData) {
    let Url = `${this.ServerUrl4}/api/Portfolioallocationreport/Details`;
    return this.http.post<any>(Url, formData, headers);
  }

  //ClientBasicInfoId, FromDate, EndDate
  Post_FMP_Report(formData) {
    let Url = `${this.ServerUrl4}/api/FMPReport/FMPReport`;
    //let Url=`${this.ServerUrl4}/api/FMPReport/FMPReport?CON_STR=MF&TRANS_TYPE=Client&ClientBasicInfoId=8166&EMPLOYEE_CODE=0&SUB_BROKER_CODE=0&LogInUserID_Code=ADMIN&SchemeCode=0&AMCCode=0&FolioNumber=0&AssetType=0&FromDate=01-01-1900&EndDate=12-01-2021`;
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    return this.http.post<any>(Url, formData, tokenOption);
  }

  DetailTransactionWithGainReport(FromDate, EndDate, ClientBasicInfoId) {
    let Url = `${this.ServerUrl4}/api/DetailTransactionwithGainReport?TRANS_TYPE=CLIENT_ID&FromDate=${FromDate}&EndDate=${EndDate}&ClientBasicInfoId=${ClientBasicInfoId}&BRANCH_ID=0`;
    return this.http.get<any>(Url);
  }

  Get_NonSIP_Report(formData) {
    let Url = `${this.ServerUrl4}/api/NonSIPReport/Details`;
    return this.http.post<any>(Url, formData, headers);
  }

  Post_TaxSaving_Report(formData) {
    let Url = `${this.ServerUrl4}/api/TaxSavingReport/Details`;
    return this.http.post<any>(Url, formData, headers);
  }
  // getCompanyDetails(CompanyId) {
  //   //let Url = `http://173.249.23.172:9013/api/CompanyDetails/Details`;
  //   let Url = `${this.ServerUrl4}/api/CompanyDetails/Details`;
  //   const QueryString = `Flag=CompanyWise&CompanyId=${CompanyId}`;
  //   const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
  //   return this.http.post<any>(Url,body,headers);
  // }
  BindEmployeeFilters(LOGIN_ID, UserType, Trans_Type, request) {
    ////////
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    let url = `${this.ServerUrl4}/api/ReportFilter/Details?TRANS_TYPE=${Trans_Type}&LOGIN_ID=${LOGIN_ID}&USER_TYPE=1`;
    console.log('BindEmployeeFilters url '+url);
    console.log('BindEmployeeFilters token '+token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    return this.http.post<any>(url, request, tokenOption);
  }
  GetBranchDetailsByEmpId(LOGIN_ID) {
    ////////
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    let url = `${this.ServerUrl9}/api/ReportFilter/EmployeeWiseDetails`;
    console.log("clientid url "+url +  "     :::  "+`EMPLOYEE_CODE=${LOGIN_ID}`)
    const QueryString  = `EMPLOYEE_CODE=${LOGIN_ID}`;
   const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    return this.http.post<any>(url, body,tokenOption);
  }
  getCllientByPan(LOGIN_ID, UserType, Trans_Type, PanNo) {
    ////////
    console.log("Encr Pan "+ PanNo);
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    let url = `${this.ServerUrl4}/api/ReportFilter/ReportDetails`;
    const QueryString  = `TRANS_TYPE=${Trans_Type}&LOGIN_ID=${LOGIN_ID}&USER_TYPE=1&PANNo=${PanNo}`;
   const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    // const body = {
    //   "TRANS_TYPE":Trans_Type,
    //   "LOGIN_ID":LOGIN_ID,
    //   "USER_TYPE":"1",
    //   "PANNo":PanNo
    // };
    let str = JSON.stringify(body);
    console.log(str);
    console.log('URL::: ' + url);
    console.log('token '+token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    return this.http.post<any>(url,body, tokenOption);
  }
  BindClientFolio(ClientId, SchemeCode) {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    const url = `${this.ServerUrl7}/api/DropDown/ReportDetails`;
    const QueryString = `TRANS_TYPE=ClientWiseFolio&CON_STR=MF&REFF_ID=${ClientId}&REFF_ID2=${SchemeCode}`;
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    console.log('Bind Client Folio' + url);
    return this.http.post<any>(url,body, tokenOption);
  }
  GetToken() {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    console.log('token::  '+token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${TOKEN}`,
      })
    }
    return tokenOption;
  }
  GetFolioMasterData(ClientBasicInfoId,FolioNumber,SchemeCode): Observable<any> {
    //let DataUrl = `http://localhost:24922/api/FolioDetails?FolioNumber=${FolioNumber}&SchemeCode=${SchemeCode}`;

    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    //let url = `${this.ServerUrl9}/api/EmployeeWiseDetails/Details?EMPLOYEE_CODE=${LOGIN_ID}`;
    //http://localhost:4094/api/FolioDetails

    let url =`${this.ServerUrl9}/api/FolioDetails?FolioNumber=${FolioNumber}&SchemeCode=${SchemeCode}`;
    console.log(url);
    console.log(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    return this.http.get<any>(url, tokenOption).pipe();

  }
  PostReportScheduler( formData) {
    let url = `${this.ServerUrl2}/api/ReportShedular/Details`;
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }

    return this.http.post<any>(url, formData,tokenOption)
  }
  getNSESTPSWPOrderBook(FromDate, EndDate, ClientBasicInfoId, ApplicationId, PWD, Broker_code, UniqueNo,TYPE) {

    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl8}/api/NSEReport/GetSTPSWPOrderDetails?FromDate=${FromDate}&EndDate=${EndDate}&CUSTOMER_ID=${ClientBasicInfoId}&APPLN_ID=${ApplicationId}&PWD=${PWD}&BROKER_CODE=${Broker_code}&unique_no=${UniqueNo}&TYPE=${TYPE}`;
    console.log('nse order book data' + url)
    return this.http.get<any>(url);
  }

  GetSSRSReport( EmpCode) {
    let url = `${this.ServerUrl2}/api/SSRS/Details`;
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${TOKEN}`,
          })
    }
    let request = {
      'EmployeeCode':EmpCode
    }

    return this.http.post<any>(url, request,tokenOption)
  }
  getRMTaggingReport(FromDate, EndDate) {
    //this.ServerUrl8="http://localhost:4094/";
    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl8}/api/RMTaggingReport/Details?FromDate=${FromDate}&EndDate=${EndDate}`;
   // console.log('nse order book data' + url)
    return this.http.get<any>(url,this.GetToken());
  }
  getClientdropoffReport(FromDate, EndDate) {
    //this.ServerUrl8="http://localhost:4094/";
    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl8}/api/RMTaggingReport/DropoffDetails?FromDate=${FromDate}&EndDate=${EndDate}`;
    //console.log('nse order book data' + url)
    return this.http.get<any>(url,this.GetToken());
  }
  getLeadCreationReport(FromDate, EndDate) {

    // tslint:disable-next-line: max-line-length
    const url = `${this.ServerUrl8}/api/MahindraUser/Details?FromDate=${FromDate}&EndDate=${EndDate}`;
   // console.log('nse order book data' + url)
    return this.http.get<any>(url,this.GetToken());
  }
getClientTransactionStatus(ClientId,Flag){
  let s_url = `${this.ServerUrl8}/api/DropDown/ReportDetails?TRANS_TYPE=${Flag}&REFF_ID=${ClientId}&CON_STR=OptiCloud`;
    const tokenOption = this.GetToken();
    const url = s_url.split('?')[0];
    const QueryString = s_url.split('?')[1];
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    return this.http.post<any>(url, body, tokenOption).pipe();
}
}
