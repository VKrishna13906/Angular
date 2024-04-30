import { ConvertToJSONService } from './convert-to-json.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EncrdecrService } from './../Auth/encrdecr.service';
import { JksdgfuehdnoService } from '../jksdgfuehdno.service';
const headers = { headers: new HttpHeaders({ 'content-type': 'application/json' }) }

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  ServerUrl = environment.ServerUrl;
  ServerUrl2 = environment.ServerUrl2;
  ServerUrl3 = environment.ServerUrl3;
  ServerUrl6 = environment.ServerUrl6;
  ServerUrl9 = environment.ServerUrl9;
  ServerUrlreport = environment.ServerUrl4;
  ServerUrlThirdParty = environment.ServerUrlThirdParty;
  IsWrapper= environment.IsWrapperAPI;
  // Don't remove this lines from here
  RMContact:string ="";
  RMName:string ='';
  //
  constructor(private http: HttpClient,
    private EncrdecrService:EncrdecrService,
    private ConvertToJSON: ConvertToJSONService,
    private hireasdkask :  JksdgfuehdnoService) {

   }

  GetAccountInfo(id:string,UserType:string): Observable<any> {
    let DataUrl = ""
    let QueryString ='';
    id=(id);
    if(UserType === "2"){
      DataUrl = `${this.ServerUrl}/api/SignUp/GetAccountInfo`;
      QueryString = `SubBrokerId=${id}&ClientBasicInfoId=&UserType=2`;
    }
    else if(UserType === "1")
    {
      DataUrl = `${this.ServerUrl}/api/SignUp/GetAccountInfo`;
      QueryString = `SubBrokerId=${id}&ClientBasicInfoId=&UserType=1`;
    }
    else{
      DataUrl = `${this.ServerUrl9}/api/SignUp/GetAccountInfo`;
      QueryString = `SubBrokerId=&ClientBasicInfoId=${id}&UserType=3`;
    }

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
    // console.log("DataURl :"+DataUrl) ;
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    return this.http.post<any>(DataUrl,body,tokenOption).pipe();
  }

  GetClientInfo(ClientBasicInfoId): Observable<any> {
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
    let DataUrl = `${this.ServerUrl2}/api/ClientOnBoardingBSE/ClientProfileDetails`;
    const QueryString = `ClientBasicInfoId=${ClientBasicInfoId}`;
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    console.log(DataUrl);
    console.log(body);
    return this.http.post<any>(DataUrl,body,tokenOption).pipe();
  }

  PostAccountInfo(formData): Observable<any> {
    let DataUrl = `${this.ServerUrl}/api/SignUp/SignUp`;
    return this.http.post<any>(DataUrl, formData, headers);
  }

  PostRTAMailBack(formData): Observable<any> {
    let DataUrl = `${this.ServerUrl}/api/SignUp/RTAInfo`;
    return this.http.post<any>(DataUrl, formData, headers);
  }

  PostBSEstarInfo(formData): Observable<any> {
    let DataUrl = `${this.ServerUrl}/api/SignUp/BSECredentials`;
    return this.http.post<any>(DataUrl, formData, headers);
  }

  PostLogo(selectedFile:File,ARNNO): Observable<any> {
    const formData : FormData = new FormData();
    formData.append('Image',selectedFile,selectedFile.name);
    let DataUrl = `${this.ServerUrl}/api/SignUp/CompanyLogo?SubBrokerId=${ARNNO}`;
    return this.http.post<any>(DataUrl, formData);
  }

  PostEmailSettings(formData): Observable<any> {
    let DataUrl = `${this.ServerUrl}/api/SignUp/EmailSettings`;
    return this.http.post<any>(DataUrl, formData, headers);
  }

  PostBasicDetails(formData): Observable<any> {
    let DataUrl ='';
    if(this.IsWrapper){
      DataUrl = `${this.ServerUrl2}api/ClientOnBoardingBSE/Details`;
    }
    else{
     DataUrl = `${this.ServerUrl2}/api/ClientOnBoarding/Details`;
    }
    //console.log(DataUrl)
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
    return this.http.post<any>(DataUrl, formData,tokenOption);
  }
  PostPreBasicDetails(formData): Observable<any> {
    let DataUrl ='';
    if(this.IsWrapper){
      DataUrl = `${this.ServerUrl2}api/CheckDetails/Details`;
    }
    else{
     DataUrl = `${this.ServerUrl2}/api/ClientOnBoarding/Details`;
    }
    //console.log(DataUrl)
    // let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    // let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    // let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    // let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    // const TOKEN = btoa(token +"@"+UserId+"|"+User_Type+"|"+IpAddress);
    //  const tokenOption = { headers:
    //   new HttpHeaders(
    //     {'Content-Type': 'application/json',
    //     'Authorization': `Basic ${TOKEN}`,
    //   })
    // }
    return this.http.post<any>(DataUrl, formData,headers);
  }
  PostDocuments(formData): Observable<any> {

    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token +"@"+UserId+"|"+User_Type+"|"+IpAddress);
     const tokenOption = { headers:
      new HttpHeaders(
        {//'Content-Type': 'application/json',
        'Authorization': `Basic ${TOKEN}`,
      })
    }
    let DataUrl = `${this.ServerUrl2}/api/ClientOnBoardingBSE/UploadDocument`;
    return this.http.post<any>(DataUrl, formData,tokenOption);
  }
  GetStateList(): Observable<any> {
    let DataUrl = `${this.ServerUrl2}/api/DropDown/OnboardingDetails?Flag=State`;
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
    console.log('GetStateList URL '+DataUrl);
    console.log('GetStateList URL token '+token +"@"+UserId+"|"+User_Type+"|"+IpAddress);
    return this.http.get<any>(DataUrl,tokenOption).pipe();
  }

  GetRelationList(): Observable<any> {
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
    let DataUrl = `${this.ServerUrl2}/api/DropDown/OnboardingDetails?Flag=RELATION_LIST`;
    console.log('GetRelationList URL '+DataUrl);
    console.log('GetRelationList URL token '+token +"@"+UserId+"|"+User_Type+"|"+IpAddress);
    return this.http.get<any>(DataUrl,tokenOption).pipe();
  }

  GetBankList(): Observable<any> {
    let DataUrl = `${this.ServerUrl2}/api/DropDown/OnboardingListDetails?TRANS_TYPE=Bank_list&REFF_ID2=BankCode`;

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
    console.log('GetBankList URL '+DataUrl);
    console.log('GetBankList URL token '+token +"@"+UserId+"|"+User_Type+"|"+IpAddress);
    return this.http.get<any>(DataUrl).pipe();
  }
  GetBankListBSE(): Observable<any> {
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
    let DataUrl = `${this.ServerUrl2}/api/DropDown/OnboardingDetails?Flag=BankList`;
    console.log('GetBankListBSE URL '+DataUrl);
    console.log('GetBankListBSE URL token '+token +"@"+UserId+"|"+User_Type+"|"+IpAddress);
    return this.http.get<any>(DataUrl,tokenOption).pipe();
  }
  GetAccountTypeList(): Observable<any> {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token +"@"+UserId+"|"+User_Type+"|"+IpAddress);
    const tokenOption = {
       headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Basic ${TOKEN}`,})
    }
    let DataUrl = `${this.ServerUrl2}/api/DropDown/OnboardingDetails?Flag=AccountType`;
    console.log('GetAccountTypeList URL '+DataUrl);
    console.log('GetAccountTypeList URL token '+token +"@"+UserId+"|"+User_Type+"|"+IpAddress);
    return this.http.get<any>(DataUrl,tokenOption).pipe();
  }

  GetIdentificationTypeList(){
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
    let DataUrl = `${this.ServerUrl2}/api/DropDown/OnboardingDetails?Flag=IdentificationType`;
    console.log('GetIdentificationTypeList URL '+DataUrl);
    console.log('GetIdentificationTypeList URL token '+token +"@"+UserId+"|"+User_Type+"|"+IpAddress);
    return this.http.get<any>(DataUrl,tokenOption).pipe();
  }

  GetOccupationTypeList(){
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
    let DataUrl = `${this.ServerUrl2}/api/DropDown/OnboardingDetails?Flag=OccupationType`;
    console.log('GetOccupationTypeList URL '+DataUrl);
    console.log('GetOccupationTypeList URL token '+token +"@"+UserId+"|"+User_Type+"|"+IpAddress);
    return this.http.get<any>(DataUrl,tokenOption).pipe();
  }

  GetAnnualIncomeList(){
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
    let DataUrl = `${this.ServerUrl2}/api/DropDown/OnboardingDetails?Flag=AnnualIncome`;
    console.log('GetAnnualIncomeList URL '+DataUrl);
    console.log('GetAnnualIncomeList URL token '+token +"@"+UserId+"|"+User_Type+"|"+IpAddress);
    return this.http.get<any>(DataUrl,tokenOption).pipe();
  }

  GetGenerateUCC(ClientBasicInfoId){
    ////////
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
    let DataUrl = `${this.ServerUrl2}/api/UCCCreation/Details`;
    const QueryString = `FisrtHolderId=${ClientBasicInfoId}&Flag=SI`;
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    //console.log(DataUrl)
    return this.http.post<any>(DataUrl,body,tokenOption).pipe();
  }

  PostAOFForm(formData): Observable<any> {
    ////////
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token +"@"+UserId+"|"+User_Type+"|"+IpAddress);

     const tokenOption = { headers:
      new HttpHeaders(
        {
        'Authorization': `Basic ${TOKEN}`,
      })
    }
    let DataUrl = `${this.ServerUrl2}/api/UCCCreation/AOFUpload`;
    return this.http.post<any>(DataUrl, formData,tokenOption);
  }

  GetDownloadAOF(UCCCode){
    let DataUrl = `${this.ServerUrl2}/api/UCCCreation/GenerateAOF?UCCCode=${UCCCode}`;
    //console.log(DataUrl)
    return this.http.get<any>(DataUrl).pipe();
  }
  GetDownloadNACH(UCCCode, NachMandateId){
    let DataUrl = `${this.ServerUrl3}/api/NachMandate/DownloadNach?UCCCode=${UCCCode}&MandateId=${NachMandateId}&TRANS_TYPE=Bank_inFormation`;
    //console.log(DataUrl)
    return this.http.get<any>(DataUrl).pipe();
  }
  postFDDetails(data){
    const url = `${this.ServerUrl6}/api/FD/UploadDocument`;
    const header = this.GetTokenNonJSON();
    return this.http.post<any>(url,data,header);
  }
  getFDDetails(ClientBasicInfoId){
    const url= `${this.ServerUrl6}/api/FD/getFDDetails?ClientBasicInfoId=${ClientBasicInfoId}`;
    console.log("FD URL "+ url);
    const header = this.GetToken();
    return this.http.get<any>(url,header);
  }
  enableClientFD(ClientBasicInfoId){
    const url = `${this.ServerUrl2}/api/FD/EnableFd`;
    const Data ={"ClientbasicinfoID": ClientBasicInfoId};
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
    return this.http.post<any>(url,Data,tokenOption);
  }
  VerifyPanEmailMobile(formData): Observable<any> {
    let DataUrl  ='';
    if(this.IsWrapper){
      DataUrl = `${this.ServerUrl2}api/CheckDetails/Details`;
    }
    else{
    DataUrl = `${this.ServerUrl2}api/CheckDetails/Details`;
    }

    //console.log(DataUrl)
    return this.http.post<any>(DataUrl, formData,headers);
  }
  // SendOTP(formData): Observable<any> {
  //   let DataUrl = `${this.ServerUrl2}/api/OTP_Birla/Details`;
  //   //console.log(DataUrl)
  //   return this.http.post<any>(DataUrl, formData, headers);
  // }
  SendOTP(formData): Observable<any> {
    let DataUrl = `${this.ServerUrlThirdParty}/api/SMSService/SendOTP`;
    //console.log(DataUrl)
    return this.http.post<any>(DataUrl, formData, headers);
  }
  CheckKYC(PANNO,MobileNo) {
    const header = this.GetToken();
    //let DataUrl = `${this.ServerUrlThirdParty}/api/KycCheck/KycCheck?PANNo=${PANNO}&MobileNo=${MobileNo}`;
    let DataUrl = `${this.ServerUrlThirdParty}/api/KYCCheck/CVLKRAKYC?PANNo=${PANNO}&MobileNo=${MobileNo}`;
    console.log(DataUrl)
    return this.http.get<any>(DataUrl,header);
  }
  GetAddressByPin(PinCode){
    return this.http.get<any>(`${this.ServerUrl2}/api/FillBank_details/Details?Flag=&Code=${PinCode}`).pipe();
  }
  GetBankByIFSC(IFSCCode){
    return this.http.get<any>(`${this.ServerUrl2}/api/FillBank_details/Details?Flag=IFSC&Code=${IFSCCode}`).pipe();
  }
  GetClientInfobypanno(PANNO,UserType) {
    let DataUrl = `${this.ServerUrlreport}api/ForgotPassword/ReportDetails`;
    const QueryString =`PANNo=${PANNO}&TRANS_TYPE=CLIENTDETAILS_BYPAN&USER_TYPE=${UserType}`;
    const body = this.ConvertToJSON.QueryStringToJSON(QueryString);
    console.log(DataUrl);
    console.log(JSON.stringify(body));

    return this.http.post<any>(DataUrl,body,headers);
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
  KycCheckCVL(PANNO,MobileNo,DOB) {
    const header = this.GetToken();
    let DataUrl = `${this.ServerUrlThirdParty}/api/KYCCheck/KycCheckCVL?PANNo=${PANNO}&MobileNo=${MobileNo}&DOB=${DOB}`;
    const body =this.ConvertToJSON.QueryStringToJSON(DataUrl.split('?')[1]);
    return this.http.get<any>(DataUrl,header);
  }
  LoadKYC(formData) {
    const header = this.GetToken();
    let DataUrl = `${this.ServerUrlThirdParty}/api/KYCCheck/LoadKYCKotak`;
    return this.http.post<any>(DataUrl,formData,header);
  }
  CheckExistingPAN(formData): Observable<any> {
    let DataUrl  ='';
    const header = this.GetToken();
    if(this.IsWrapper){
      DataUrl = `${this.ServerUrl2}/api/ClientOnBoardingBSE/Details`;
    }
    else{
    DataUrl = `${this.ServerUrl2}/api/ClientOnBoarding/Details`;
    }
    //console.log(DataUrl)
    return this.http.post<any>(DataUrl, formData, header);
  }
  GetTokenNonJSON() {
    let token = sessionStorage.getItem('`huR,8@RK9^??b4 -.hfs!!uR,XX');
    let UserId = (sessionStorage.getItem('m5JkoXISmYRAIuY'));
    let User_Type = (sessionStorage.getItem('L2D3506kIHSk3E0'));
    let IpAddress = sessionStorage.getItem('Tgsh@#3734fjfskshh==');
    const TOKEN = btoa(token + "@" + UserId + "|" + User_Type + "|" + IpAddress);
    const tokenOption = {
      headers: new HttpHeaders({
      'Authorization': `Basic ${TOKEN}`,
      })
    }
    return tokenOption;
  }
  SendCommonOTP(body): Observable<any>{
    const url = `${this.ServerUrl}api/CommonOTP/SendOTPSMS`;
    //const token = this.GetToken();
    console.log(url)
    return this.http.post<any>(url,body,headers)
  }
  PostNSEInfo(formData): Observable<any> {
    let DataUrl = `${this.ServerUrl}/api/SignUp/NSECredentials`;
    return this.http.post<any>(DataUrl, formData, headers);
  }
  sendMandatectivationlink(formData): Observable<any> {
    let DataUrl = `${this.ServerUrl}/api/ClientMandate/SendMandateActivationLink`;
      const token = this.GetToken();
    return this.http.post<any>(DataUrl, formData, token);
  }
  CheckAUKYC(PANNO,MobileNo) {
    const header = this.GetToken();
    //let DataUrl = `${this.ServerUrlThirdParty}/api/KycCheck/KycCheck?PANNo=${PANNO}&MobileNo=${MobileNo}`;
    let DataUrl = `${this.ServerUrlThirdParty}/api/KYCCheck/AUCVLKRAKYC?PANNo=${PANNO}&MobileNo=${MobileNo}`;
    console.log(DataUrl)
    const json = this.ConvertToJSON.QueryStringToJSON(DataUrl.split('?')[1]);

    return this.http.post<any>(DataUrl.split('?')[0],json,header);
  }
}
