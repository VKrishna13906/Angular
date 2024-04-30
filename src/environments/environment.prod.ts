import { publish } from "rxjs";

export const environment = {
  production: true,
  //CommonBaseHref:'',

//Kotak URL Live
// ServerUrl  : 'https://ipowrapprer.kotaksecurities.com/',
// ServerUrl2 : 'https://ipowrapprer.kotaksecurities.com/',
// ServerUrl3 : 'https://ipowrapprer.kotaksecurities.com/',
// ServerUrl4 : 'https://ipowrapprer.kotaksecurities.com/',
// ServerUrl5 : "https://ipowrapprer.kotaksecurities.com/",
// ServerUrl6 : "https://ipowrapprer.kotaksecurities.com/", //fd "http://10.0.6.4:9092/FD"
// ServerUrl7 : 'https://ipowrapprer.kotaksecurities.com/',
// ServerUrl8 : 'https://ipowrapprer.kotaksecurities.com/', //nse transaction
// ServerUrl9 : 'https://ipowrapprer.kotaksecurities.com/', //nse login
// ServerUrlThirdParty : "https://ipowrapprer.kotaksecurities.com/",  // third party mahindra
// IsWrapperAPI : true,
// CompayName :'Kotak',
// CommonBaseHref : "ipo/"

// // //Kotak URL UAT New
// ServerUrl  : 'https://iponewuat.kotaksecurities.com/ipouatwrap/',
// ServerUrl2 : 'https://iponewuat.kotaksecurities.com/ipouatwrap/',
// ServerUrl3 : 'https://iponewuat.kotaksecurities.com/ipouatwrap/',
// ServerUrl4 : 'https://iponewuat.kotaksecurities.com/ipouatwrap/',
// ServerUrl5 : "https://iponewuat.kotaksecurities.com/ipouatwrap/",
// ServerUrl6 : "https://iponewuat.kotaksecurities.com/ipouatwrap/", //fd "https://10.0.6.4:9092/FD"
// ServerUrl7 : 'https://iponewuat.kotaksecurities.com/ipouatwrap/',
// ServerUrl8 : 'https://iponewuat.kotaksecurities.com/ipouatwrap/', //nse transaction
// ServerUrl9 : 'https://iponewuat.kotaksecurities.com/ipouatwrap/', //nse login
// ServerUrl10 : 'https://iponewuat.kotaksecurities.com/ipouatwrap/', //nse login
// ServerUrlThirdParty : "https://iponewuat.kotaksecurities.com/ipouatwrap/",  // third party mahindra
// IsWrapperAPI : true,
// CompayName :'Kotak',
// //Kotak URL UAT old
// ServerUrl  : 'http://iponewuat.kotakseconline.com:8089/',
// ServerUrl2 : 'http://iponewuat.kotakseconline.com:8089/',
// ServerUrl3 : 'http://iponewuat.kotakseconline.com:8089/',
// ServerUrl4 : 'http://iponewuat.kotakseconline.com:8089/',
// ServerUrl5 : "http://iponewuat.kotakseconline.com:8089/",
// ServerUrl6 : "http://iponewuat.kotakseconline.com:8089/", //fd "http://10.0.6.4:9092/FD"
// ServerUrl7 : 'http://iponewuat.kotakseconline.com:8089/',
// ServerUrl8 : 'http://iponewuat.kotakseconline.com:8089/', //nse transaction
// ServerUrl9 : 'http://iponewuat.kotakseconline.com:8089/', //nse login
// ServerUrl10 : 'http://iponewuat.kotakseconline.com:8089/', //nse login
// ServerUrlThirdParty : "http://iponewuat.kotakseconline.com:8089/",  // third party mahindra
// IsWrapperAPI : true,
// CompayName :'Kotak',

//Kotak URL Live CUG old
// ServerUrl  : 'https://ipocugwrap.kotaksecurities.online/',
// ServerUrl2 : 'https://ipocugwrap.kotaksecurities.online/',
// ServerUrl3 : 'https://ipocugwrap.kotaksecurities.online/',
// ServerUrl4 : 'https://ipocugwrap.kotaksecurities.online/',
// ServerUrl5 : "https://ipocugwrap.kotaksecurities.online/",
// ServerUrl6 : "https://ipocugwrap.kotaksecurities.online/", //fd "http://10.0.6.4:9092/FD"
// ServerUrl7 : 'https://ipocugwrap.kotaksecurities.online/',
// ServerUrl8 : 'https://ipocugwrap.kotaksecurities.online/', //nse transaction
// ServerUrl9 : 'https://ipocugwrap.kotaksecurities.online/', //nse login
// ServerUrl10 : 'https://ipocugwrap.kotaksecurities.online/', //nse login
// ServerUrlThirdParty : "https://ipocugwrap.kotaksecurities.online/",  // third party mahindra
// IsWrapperAPI : true,
// CompayName :'Kotak',

//Kotak URL Live uat new
// ServerUrl  : 'https://ipouatwrap.kotaksecurities.com/',
// ServerUrl2 : 'https://ipouatwrap.kotaksecurities.com/',
// ServerUrl3 : 'https://ipouatwrap.kotaksecurities.com/',
// ServerUrl4 : 'https://ipouatwrap.kotaksecurities.com/',
// ServerUrl5 : "https://ipouatwrap.kotaksecurities.com/",
// ServerUrl6 : "https://ipouatwrap.kotaksecurities.com/", //fd "http://10.0.6.4:9092/FD"
// ServerUrl7 : 'https://ipouatwrap.kotaksecurities.com/',
// ServerUrl8 : 'https://ipouatwrap.kotaksecurities.com/', //nse transaction
// ServerUrl9 : 'https://ipouatwrap.kotaksecurities.com/', //nse login
// ServerUrl10 : 'https://ipouatwrap.kotaksecurities.com/', //nse login
// ServerUrlThirdParty : "https://ipouatwrap.kotaksecurities.com/",  // third party mahindra
// IsWrapperAPI : true,
// CompayName :'Kotak',

//Kotak URL Live CUG NEw
// ServerUrl  : 'https://ipocugwrap.kotaksecurities.com/',
// ServerUrl2 : 'https://ipocugwrap.kotaksecurities.com/',
// ServerUrl3 : 'https://ipocugwrap.kotaksecurities.com/',
// ServerUrl4 : 'https://ipocugwrap.kotaksecurities.com/',
// ServerUrl5 : "https://ipocugwrap.kotaksecurities.com/",
// ServerUrl6 : "https://ipocugwrap.kotaksecurities.com/", //fd "http://10.0.6.4:9092/FD"
// ServerUrl7 : 'https://ipocugwrap.kotaksecurities.com/',
// ServerUrl8 : 'https://ipocugwrap.kotaksecurities.com/', //nse transaction
// ServerUrl9 : 'https://ipocugwrap.kotaksecurities.com/', //nse login
// ServerUrl10 : 'https://ipocugwrap.kotaksecurities.com/', //nse login
// ServerUrlThirdParty : "https://ipocugwrap.kotaksecurities.com/",  // third party mahindra
// IsWrapperAPI : true,
// CompayName :'Kotak',
//Kotak URL Live CUG 160
// ServerUrl  : 'https://ipocugwrap.kotaksecurities.com/',
// ServerUrl2 : 'https://ipocugwrap.kotaksecurities.com/',
// ServerUrl3 : 'https://ipocugwrap.kotaksecurities.com/',
// ServerUrl4 : 'https://ipocugwrap.kotaksecurities.com/',
// ServerUrl5 : "https://ipocugwrap.kotaksecurities.com/",
// ServerUrl6 : "https://ipocugwrap.kotaksecurities.com/", //fd "http://10.0.6.4:9092/FD"
// ServerUrl7 : 'https://ipocugwrap.kotaksecurities.com/',
// ServerUrl8 : 'https://ipocugwrap.kotaksecurities.com/', //nse transaction
// ServerUrl9 : 'https://ipocugwrap.kotaksecurities.com/', //nse login
// ServerUrl10 : 'https://ipocugwrap.kotaksecurities.com/', //nse login
// ServerUrlThirdParty : "https://ipocugwrap.kotaksecurities.com/",  // third party mahindra
// IsWrapperAPI : true,
// CompayName :'Kotak',

//Kotak URL Live CUG prod 159
// ServerUrl  : 'https://kstrade.kotaksecurities.com/',
// ServerUrl2 : 'https://kstrade.kotaksecurities.com/',
// ServerUrl3 : 'https://kstrade.kotaksecurities.com/',
// ServerUrl4 : 'https://kstrade.kotaksecurities.com/',
// ServerUrl5 : "https://kstrade.kotaksecurities.com/",
// ServerUrl6 : "https://kstrade.kotaksecurities.com/", //fd "http://10.0.6.4:9092/FD"
// ServerUrl7 : 'https://kstrade.kotaksecurities.com/',
// ServerUrl8 : 'https://kstrade.kotaksecurities.com/', //nse transaction
// ServerUrl9 : 'https://kstrade.kotaksecurities.com/', //nse login
// ServerUrl10 : 'https://kstrade.kotaksecurities.com/', //nse login
// ServerUrlThirdParty : "https://kstrade.kotaksecurities.com/",  // third party mahindra
// IsWrapperAPI : true,
// CompayName :'Kotak',


//Kotak URL Live Production Latest 08/07/2023
// ServerUrl  : 'https://kstrade.kotaksecurities.com/ksipowrapper/',
// ServerUrl2 : 'https://kstrade.kotaksecurities.com/ksipowrapper/',
// ServerUrl3 : 'https://kstrade.kotaksecurities.com/ksipowrapper/',
// ServerUrl4 : 'https://kstrade.kotaksecurities.com/ksipowrapper/',
// ServerUrl5 : "https://kstrade.kotaksecurities.com/ksipowrapper/",
// ServerUrl6 : "https://kstrade.kotaksecurities.com/ksipowrapper/", //fd "http://10.0.6.4:9092/FD"
// ServerUrl7 : 'https://kstrade.kotaksecurities.com/ksipowrapper/',
// ServerUrl8 : 'https://kstrade.kotaksecurities.com/ksipowrapper/', //nse transaction
// ServerUrl9 : 'https://kstrade.kotaksecurities.com/ksipowrapper/', //nse login
// ServerUrl10 : 'https://kstrade.kotaksecurities.com/ksipowrapper/', //nse login
// ServerUrlThirdParty : "https://kstrade.kotaksecurities.com/ksipowrapper/",  // third party mahindra
// IsWrapperAPI : true,
// CommonBaseHref : "ipo/",
// CompayName :'Kotak',

//Kotak URL Live Production Latest 08/07/2023
ServerUrl  : 'https://kstrade.kotaksecurities.com/ksipowrapper/',
ServerUrl2 : 'https://kstrade.kotaksecurities.com/ksipowrapper/',
ServerUrl3 : 'https://kstrade.kotaksecurities.com/ksipowrapper/',
ServerUrl4 : 'https://kstrade.kotaksecurities.com/ksipowrapper/',
ServerUrl5 : "https://kstrade.kotaksecurities.com/ksipowrapper/",
ServerUrl6 : "https://kstrade.kotaksecurities.com/ksipowrapper/", //fd "http://10.0.6.4:9092/FD"
ServerUrl7 : 'https://kstrade.kotaksecurities.com/ksipowrapper/',
ServerUrl8 : 'https://kstrade.kotaksecurities.com/ksipowrapper/', //nse transaction
ServerUrl9 : 'https://kstrade.kotaksecurities.com/ksipowrapper/', //nse login
ServerUrl10 : 'https://kstrade.kotaksecurities.com/ksipowrapper/', //nse login
ServerUrlThirdParty : "https://kstrade.kotaksecurities.com/ksipowrapper/",  // third party mahindra
IsWrapperAPI : true,
AllowAsba : false,
CommonBaseHref : "/preipo/",
CompayName :'Kotak',
};

