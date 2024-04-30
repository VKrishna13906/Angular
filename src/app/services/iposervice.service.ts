import {formatDate} from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncrdecrService } from './../Auth/encrdecr.service';
import { ConvertToJSONService } from './convert-to-json.service';
import { JksdgfuehdnoService } from '../jksdgfuehdno.service';
const headers = { headers: new HttpHeaders({ 'content-type': 'application/json' }) }
@Injectable({
  providedIn: 'root'
})
export class IPOServiceService {

  //ServerUrl6 ="http://localhost:4094/";
  ServerUrl6 = environment.ServerUrl6;
  ServerUrl9 = environment.ServerUrl9;

  constructor(private http: HttpClient,
    private EncrdecrService: EncrdecrService,
    private jsonParse: ConvertToJSONService,
    private hireasdkask :  JksdgfuehdnoService) { }
  /*****************Dashboard*************************/
  GetToken() {
    //
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    console.log("token :: " + token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${TOKEN}`,
      })
    }
    return tokenOption;
  }

  getDashboardIPONCDData(body): Observable<any> {
    
    let url = `${this.ServerUrl6}/api/IPOBid/GetIPOData`;

    let req = {
      data : (body)
    }
    return this.http.post<any>(url, req, this.GetToken());
  }
  getIPOviewmoreData(body): Observable<any> {
    
    let s_url = `${this.ServerUrl6}/api/IPOBid/GetIPOData?Flag=IPONCDData`;

    const url = s_url.split('?')[0];
    const QueryString = s_url.split('?')[1];
    const qstring = this.jsonParse.QueryStringToJSON(QueryString);
    const request = JSON.stringify(qstring);
    let requestJson = {
      data :(request)
    }

    return this.http.post<any>(url, requestJson, this.GetToken());
  }
  getNCDviewmoreData(body): Observable<any> {
    let s_url = `${this.ServerUrl6}/api/IPOBid/GetIPOData?Flag=IPONCDData`;
    const url = s_url.split('?')[0];
    const QueryString = s_url.split('?')[1];
    const qstring = this.jsonParse.QueryStringToJSON(QueryString);
    const request = JSON.stringify(qstring);
    let requestJson = {
      data :(request)
    }
    return this.http.post<any>(url, requestJson, this.GetToken());
  }
  OpenFreeAccount(): Observable<any> {
    let url = `https://serviceint.kotaksecurities.in/LMS/AddContactNewBannerLS.aspx?BannerId=236314471642398921&Cmp_BWF_pk=236314471642398921`;
    return this.http.get<any>(url, headers);
  }
  /*****************Dashboard*************************/

  /*****************Current issue*************************/
  getCurrentIssue(): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOReport/Details?status=1&IssueType=I&SubbrokerID=364&TRANS_TYPE=ReportCurrentIPOIssueType`;

    return this.http.get<any>(url, headers);
  }
  getPastIssue(): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOReport/Details?status=0&IssueType=I&SubbrokerID=364&TRANS_TYPE=ReportPastIPOIssueType`;

    return this.http.get<any>(url, headers);
  }
  getNoOfBid(CompanyId, SubbrokerId): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOReport/Details?status=1&COMPANYID=${CompanyId}&SubbrokerID=${SubbrokerId}&TRANS_TYPE=ReportBIDdetails`;

    return this.http.get<any>(url, headers);
  }
  DownloadExcel(CompanyId, SubbrokerId): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOReport/Details?status=1&COMPANYID=${CompanyId}&SubbrokerID=${SubbrokerId}&TRANS_TYPE=ReportBIDdetails`;

    return this.http.get<any>(url, headers);
  }
  ProductNote(CompanyId, SubbrokerId): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOCompany/Details?COMPANYID=${CompanyId}&TRANS_TYPE=GET_COMPANIES_DETAILS`;

    return this.http.get<any>(url, headers);
  }
  /*****************Dashboard*************************/

  /*************************ClientList */
  getGroupList(LoginId): Observable<any> {
    // LoginId =364;
    let url = `${this.ServerUrl6}/api/IPOExcel/IPOClientMain?GenerateMode=ONLINE&CreatedBy=${LoginId}&TRANS_TYPE=FillGroupDropdown&LoginMode=subbroker`;

    return this.http.get<any>(url, headers);
  }

  getIssueList(issueType): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOCompany/Details?IssueType=${issueType}&TRANS_TYPE=GET_IPO_NCD_FORM_PRINTING`;
    return this.http.get<any>(url, this.GetToken());
  }

  getQuantityAndPrice(companyId): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOCompany/Details?COMPANYID=${companyId}&TRANS_TYPE=GET_COMPANIES_DETAILS`;

    return this.http.get<any>(url, headers);

  }
  SearchClient(formData: any): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOExcel/IpoClientList`;

    return this.http.post<any>(url, formData, headers).pipe();
  }

  ViewBid(companyId, SubbrokerCode): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOBidData/BSESBidtatus?IssueType=I&TRANS_TYPE=GET_COMPANIES_IPO_NCD_DDL&COMPANY_ID=${companyId}&SUBBROKERCODE=${SubbrokerCode}`
    return this.http.get<any>(url, this.GetToken());
  }

  InitiateBid(formData): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOExcel/IPOGeneratePDFDetails`

    return this.http.post<any>(url, formData, headers).pipe();
  }

  /******************************* */


  GetBankList(): Observable<any> {
    let url = `${this.ServerUrl6}/api/Bank/Details`

    return this.http.get<any>(url, headers);
  }
  GetLocationList(): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOLocation/Details`

    return this.http.get<any>(url, headers);
  }
  ValidateUPIId(formData): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOBid/GET_IPO_Bidding_Data`;
    return this.http.post<any>(url, formData, this.GetToken()).pipe();
  }

  PostClient(formData): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOClientBankDetail/SaveNdUpdateIPOClientBankDetails`

    return this.http.post<any>(url, formData, headers).pipe();
  }


  //****************AllotementReport */
  GetIssueByFinacialYear(IssueType: any, FinancialYear: any): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOCompany/Details?IssueType=${IssueType}&FinancialYear=${FinancialYear}&TRANS_TYPE=GET_COMPANIES_IPO_NCD_DDL`;

    return this.http.get<any>(url, headers);
  }

  GetIPONCDSearchList(body): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOBid/GetIPOData`;
    let req = {
      data : (body)
    }
    return this.http.post<any>(url, req, this.GetToken());
  }

  GetBidStatusList(CompanyId: any, subbrokercode: any, IssueType: any): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOBidData/BSESBidtatus?TRANS_TYPE=GET_COMPANIES_IPO_NCD_DDL&COMPANY_ID=${CompanyId}&SUB_BROKER_CODE=${subbrokercode}&IssueType=${IssueType}`;

    return this.http.get<any>(url, this.GetToken());
  }

  AllotmentReport(data): Observable<any> {
    
    let url = `${this.ServerUrl6}/api/IPOReport/GetAllotmentReportDetails`;
    return this.http.post<any>(url, data, this.GetToken());
  }
// Encryption(data : any){
//   let iv = '345Nspb#$#479KJN';
//   CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data.toString()), '345Nspb#$#479KJN'+ formatDate(new Date(), 'dd/MM/yyyy', 'en'),
// {
//     keySize: 128 / 8,
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7
// })}

  GetIPOCompanyDetails(data: any): Observable<any> {
    ;
     let url = `${this.ServerUrl9}/api/IPOCompanyDetails/GetIPOCompanyDetails`
    // let iv = '345Nspb#$#479KJN';
    let req = {
      data : (data)
      //data: this.Encryption(data)
    }
    return this.http.post<any>(url, req, this.GetToken()).pipe();
  }
  GetRHPDocumentDetails(data: any): Observable<any> {
    let url = `${this.ServerUrl9}/api/IPOCompany/GetRHPDocumentDetails`
    return this.http.post<any>(url, data, headers).pipe();
  }
  GetIPOClientDetails(FirstApplicantPAN, SubBrokerCode, EmpCode, ClientCode): Observable<any> {
    let url = `${this.ServerUrl9}/api/IPOClientDetails/GetIPOClientDetails`;
    let request: any = {
      "ClientCode" : ClientCode,
      "FirstApplicantPAN": FirstApplicantPAN,
      "SubBrokerCode": SubBrokerCode,
      "EmpCode": EmpCode
    };
    request = JSON.stringify(request);
    let inputdata: any = {
      data: (request)
    }
    return this.http.post<any>(url, inputdata, this.GetToken()).pipe();
  }
  GET_IPO_Bidding_Data(UPIId): Observable<any> {
    let url = `${this.ServerUrl6}/api/DropDownIPO/FillDetails?TRANS_TYPE=UPIValidation&REFF_ID=${UPIId}&REFF_ID2&REFF_ID3&CON_STR=IPO`;
    const json = this.jsonParse.QueryStringToJSON(url.split('?')[1]);
    let req ={
      data : (JSON.stringify(json))
    }
    return this.http.post<any>(url.split('?')[0], req, this.GetToken()).pipe();
  }
  Submit_GET_IPO_Bidding_Data(UPIId, Mobile, otp): Observable<any> {
    let url = `${this.ServerUrl6}/api/DropDownIPO/SubmitFillDetails?TRANS_TYPE=UPIValidation&REFF_ID=${UPIId}&REFF_ID2&REFF_ID3&CON_STR=IPO`;
    const json = this.jsonParse.QueryStringToJSON(url.split('?')[1]);
    let req ={
      data : (JSON.stringify(json))
    }
    let uni = btoa(sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX') + ":" +  Mobile + ":" + otp);
    
    const tokenOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${uni}`,
      })
    }
    return this.http.post<any>(url.split('?')[0], req, tokenOption).pipe();
  }
  SaveNdUpdateIPOClientBankDetails(formData): Observable<any> {
    // let url = `${this.ServerUrl9}api/IPOClientBankDetail/SaveNdUpdateIPOClientBankDetails?SrNo=${SrNo}&FirstApplicant=${FirstApplicant}&FirstApplicantPAN=${FirstApplicantPAN}&Mobile=${Mobile}&Email=${Email}&CreatedBy=${CreatedBy}&Status=${Status}&Address=${Address}&Pincode=${Pincode}&IPAddress=${IPAddress}&Subbrokercode=${Subbrokercode} &EmpCode=${EmpCode}&Group=${Group}`
    let url = `${this.ServerUrl9}api/IPOClientBankDetail/SaveNdUpdateIPOClientBankDetails`;
    let req = {
      data : (JSON.stringify(formData))
    }
    return this.http.post<any>(url, formData, headers).pipe();
  }
  // SaveNdUpdateIPOClientBankDetailsangular(formData): Observable<any> {
  //   // let url = `${this.ServerUrl9}api/IPOClientBankDetail/SaveNdUpdateIPOClientBankDetails?SrNo=${SrNo}&FirstApplicant=${FirstApplicant}&FirstApplicantPAN=${FirstApplicantPAN}&Mobile=${Mobile}&Email=${Email}&CreatedBy=${CreatedBy}&Status=${Status}&Address=${Address}&Pincode=${Pincode}&IPAddress=${IPAddress}&Subbrokercode=${Subbrokercode} &EmpCode=${EmpCode}&Group=${Group}`
  //   let url = `${this.ServerUrl9}api/IPOClientBankDetail/SaveNdUpdateIPOClientBankDetails`;
  //   let req = {
  //     data : (JSON.stringify(formData))
  //   }
  //   return this.http.post<any>(url, formData, headers).pipe();
  // }
  IPONCDBiding(formData, flag): Observable<any> {
    let url = `${this.ServerUrl9}/api/IPONCDBiding/${flag}Details`
    return this.http.post<any>(url, formData, this.GetToken()).pipe();
  }
  IPONCDOrderStatus(formData): Observable<any> {
    let url = `${this.ServerUrl9}/api/IPONCDOrderStatus/OrderStatus`
    return this.http.post<any>(url, formData, this.GetToken()).pipe();
  }
  GetBidData(CompanyId, SubBrokerCode, EmpCode): any {
    const url = `${this.ServerUrl6}/api/IPOBidData/BSESBidtatus?COMPANY_ID=${CompanyId}&SUBBROKERCODE=${SubBrokerCode}&EmpCode=${EmpCode}`;
    const json = this.jsonParse.QueryStringToJSON(url.split('?')[1]);
    let req ={
      data : (JSON.stringify(json))
    }
    return this.http.post(url.split('?')[0], req, this.GetToken());
  }
  GetIPOCompanyList(IssueType): any {
    
    const url = `${this.ServerUrl6}/api/DropDownIPO/FillDetails?TRANS_TYPE=ALLIPONCD&REFF_ID=${IssueType}&REFF_ID2&REFF_ID3&CON_STR=IPO`;
    const json = this.jsonParse.QueryStringToJSON(url.split('?')[1]);
    let req ={
      data : (JSON.stringify(json))
    }
    return this.http.post(url.split('?')[0], req, this.GetToken());
  }

  GetOrderBookReport(data): Observable<any> {
    
    let url = `${this.ServerUrl6}/api/IPOBid/IPOTradeOrderBook`;
    let req = {
      data : (JSON.stringify(data))
    }
    return this.http.post<any>(url, req, this.GetToken());
  }
  GetIPOCompanylistDetails(IssueType: any): Observable<any> {
    
    let s_url = `${this.ServerUrl9}/api/DropDownIPO/FillDetails?TRANS_TYPE=ALLIPONCD&REFF_ID=${IssueType}&REFF_ID2&REFF_ID3&CON_STR=IPO`
    const url = s_url.split('?')[0];
    const QueryString = s_url.split('?')[1];
    const body = this.jsonParse.QueryStringToJSON(QueryString);
    let req ={ 
      data : (JSON.stringify(body))
    }
    return this.http.post<any>(url, req, this.GetToken()).pipe();
  }

  GetTradeBookReport(Subbrokercode: any, CompanyId: any, ApplicationNo: any, PANNO: any, CStatus: any, EmpCode: any): Observable<any> {
    let url = `${this.ServerUrl6}/api/IPOBid/IPOTradeOrderBook?Flag=TradeBook&COMPANY_ID=${CompanyId}&SUBBROKER_CODE=${Subbrokercode}&ApplicationNo=${ApplicationNo}&CStatus=${CStatus}&EmpCode=${EmpCode}&OrderNo=${PANNO}`;

    return this.http.get<any>(url, this.GetToken());
  }
  GetNCDSeries(CompId): Observable<any> {
    let url = `${this.ServerUrl9}/api/DropDownIPO/FillDetailsIPO?TRANS_TYPE=NCDSERIES&REFF_ID=${CompId}&REFF_ID2&REFF_ID3&CON_STR=IPO`
    const json = this.jsonParse.QueryStringToJSON(url.split('?')[1])
    let req ={
      data : (JSON.stringify(json))
    }
    return this.http.post<any>(url.split('?')[0], req, this.GetToken()).pipe();
  }
  GetDropdownDetails(flag: any): Observable<any> {
    let s_url = `${this.ServerUrl9}/api/DropDownIPO/FillDetails?TRANS_TYPE=${flag}&REFF_ID&REFF_ID2&REFF_ID3&CON_STR=IPO`
    const url = s_url.split('?')[0];
    const QueryString = s_url.split('?')[1];
    const body = this.jsonParse.QueryStringToJSON(QueryString);
    return this.http.post<any>(url, body, this.GetToken()).pipe();

  }
  GetDropdowndynamicDetails(flag: any, refid: any, refid2: any, refid3: any): Observable<any> {
    let s_url = `${this.ServerUrl9}/api/DropDownIPO/FillDetails?TRANS_TYPE=${flag}&REFF_ID=${refid}&REFF_ID2=${refid2}&REFF_ID3=${refid3}&CON_STR=IPO`
    const url = s_url.split('?')[0];
    const QueryString = s_url.split('?')[1];
    const body = this.jsonParse.QueryStringToJSON(QueryString);
    return this.http.post<any>(url, body, this.GetToken()).pipe();

  }
  IPOClientList(formData: any): Observable<any> {

    let url = `${this.ServerUrl6}/api/IPONCDConsent/IPOClientList`;

    return this.http.post<any>(url, formData, headers).pipe();
  }
  InitiateBidNEW(formData): Observable<any> {

    let url = `${this.ServerUrl6}/api/IPONCDConsent/IPOinitiateBid`

    return this.http.post<any>(url, formData, headers).pipe();
  }
  GetIPOBankList(): Observable<any> {
    let url = `${this.ServerUrl9}/api/DropDownIPO/FillDetails?TRANS_TYPE=ASBABANK&REFF_ID&REFF_ID2&REFF_ID3&CON_STR=IPO`
    const json = this.jsonParse.QueryStringToJSON(url.split('?')[1])
    return this.http.post<any>(url.split('?')[0], json, this.GetToken()).pipe();
  }
  GetIPOBankLocation(): Observable<any> {
    let url = `${this.ServerUrl9}/api/DropDownIPO/FillDetails?TRANS_TYPE=ASBALOCATION&REFF_ID&REFF_ID2&REFF_ID3&CON_STR=IPO`
    const json = this.jsonParse.QueryStringToJSON(url.split('?')[1])
    return this.http.post<any>(url.split('?')[0], json, this.GetToken()).pipe();
  }
  GetDetailsFromApplicationNo(CompId, ApplicationNo): Observable<any> {
    let url = `${this.ServerUrl9}/api/IPOBid/IPONCDApplication?COMPANY_ID=${CompId}&ApplicationNo=${ApplicationNo}`
    const json = this.jsonParse.QueryStringToJSON(url.split('?')[1])
    return this.http.post<any>(url.split('?')[0], json, this.GetToken()).pipe();
  }
  CheckValidUPIId(UPIID): Observable<any> {
    let url = `${this.ServerUrl9}/api/DropDownIPO/FillDetails?TRANS_TYPE=UPIValidation&REFF_ID=${UPIID}&REFF_ID2&REFF_ID3&CON_STR=IPO`
    const json = this.jsonParse.QueryStringToJSON(url.split('?')[1])
    return this.http.post<any>(url.split('?')[0], json, this.GetToken()).pipe();
  }
  CheckExistApplication(applicationno, compid): Observable<any> {
    let url = `${this.ServerUrl9}/api/DropDownIPO/FillDetails?TRANS_TYPE=APPLICATIONExist&REFF_ID=${applicationno}&REFF_ID2=${compid}&REFF_ID3&CON_STR=IPO`
    const json = this.jsonParse.QueryStringToJSON(url.split('?')[1])
    return this.http.post<any>(url.split('?')[0], json, this.GetToken()).pipe();
  }
  IPOFillDetails(applicationno, compid, Flag): Observable<any> {
    let url = `${this.ServerUrl9}/api/DropDownIPO/FillDetails?TRANS_TYPE=${Flag}&REFF_ID=${compid}&REFF_ID2=&REFF_ID3&CON_STR=IPO`
    const json = this.jsonParse.QueryStringToJSON(url.split('?')[1]);
    let req = {
      data : (JSON.stringify(json))
    }
    return this.http.post<any>(url.split('?')[0], req, this.GetToken()).pipe();
  }

  SendIPOConsentApplication(data: any): Observable<any> {
    const url = `${this.ServerUrl6}/api/IPONCDConsent/ConsentApplicationDetails`;
    return this.http.post<any>(url, data, headers);
  }

  GeneratePDFForm(data: any): Observable<any> {
    const url = `${this.ServerUrl6}/api/IPONCDConsent/IPOinitiateBid`;
    return this.http.post<any>(url, data, headers);
  }
  GenerateMobileOTP(DataBody): Observable<any> {
    const url = `${this.ServerUrl9}/api/SendSMSNDMAIL/SendSMS`;
    let req ={
      data :  (DataBody)
    }
    return this.http.post<any>(url, req, headers);
  }
  verifyOTP(Mobile, otp)
  {
    const url = `${this.ServerUrl9}/api/SendSMSNDMAIL/UniqueResponse`;
    let uni = btoa(sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX') + ":" +  Mobile + ":" + otp);
    
    const tokenOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${uni}`,
      })
    }
    let req ={
      data :  null
    }
    return this.http.post<any>(url, req, tokenOption);
  }
  // VerifyOTPResponse(DataBody): Observable<any> {
  //   const url = `${this.ServerUrl9}/api/SendSMSNDMAIL/SendSMS`;
  //   let req ={
  //     data :  (DataBody)
  //   }
  //   return this.http.post<any>(url, req, headers);
  // }

  GetSSOClient(DataBody): Observable<any> {
    const url = `${this.ServerUrl9}/api/Authenticate/GetSSOClientDetails`;
    return this.http.post<any>(url, DataBody, headers);
  }
  GetSSOClientNEO(DataBody): Observable<any> {
    const url = `${this.ServerUrl9}/api/Authenticate/GetNEOSSOClientDetails`;
    return this.http.post<any>(url, DataBody, headers);
  }
  GetIPONCDClientSearch(data: any): Observable<any> {
    
    const url = `${this.ServerUrl9}/api/IPONCDClientSearch/ClientList`;
    return this.http.post<any>(url, data, this.GetToken());
  }
  GetFinancialYear(data) {
    const url = `${this.ServerUrl9}/api/DropDownIPO/FillDetails`;
    let req ={
      data : (data)
    }
    return this.http.post<any>(url, req, this.GetToken());
  }
  PostASBAOrder(data) {
    const url = `${this.ServerUrl9}/api/IPONCDBiding/IPOASBADetails`;
    return this.http.post<any>(url, data, this.GetToken());
  }
  GetValidateUPI_SSO(data) {
    const url = `${this.ServerUrl9}/api/Authenticate/GetUPIDetails`;
    return this.http.post<any>(url, data, headers);
  }
//added by adarsh for get flag  for NEW BIDING,MOD BIDING ,DEL BIDING
GetIns_Mod_Del_BIDFLAG(body): Observable<any> {
  let url = `${this.ServerUrl9}/api/IPOCompanyDetails/GetIPOFreshbid_mod_del_status`;
  console.log(url);
  let req ={
    data : (JSON.stringify(body))
  }
  return this.http.post<any>(url, req, this.GetToken());

}
ASBAOrderStatus(formData): Observable<any> {
  let url = `${this.ServerUrl9}/api/ASBAOrderStatus/ASBAOrderStatus`
  let request = JSON.stringify(formData);
  let inputdata: any = {
    data: (request)
  }
  return this.http.post<any>(url, inputdata, this.GetToken()).pipe();
}

}
