import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertToJSONService {

  constructor() { }
  QueryStringToJSON1(queryString) {
    
    var pairs = queryString.split('&');
    var result = {};
    pairs.forEach(function (pair) {
     
      pair = pair.split('=');
      let count = pair.length;
      if(count ==4){ //if(count ==4){
        result[pair[0]] = decodeURIComponent(pair[1]+"==" || '');
      }else{
      result[pair[0]] = decodeURIComponent(pair[1] || '');
      }
    });
    return JSON.parse(JSON.stringify(result));
  }

  QueryStringToJSON(queryString) {
 
    var pairs = queryString.split('&');
    var result = {};
    pairs.forEach(function (pair) {
      let key = pair.substring(0, pair.indexOf('='));
      let value = pair.substring(pair.indexOf('=') + 1);
      result[key] = decodeURIComponent(value || '');
    });
    return JSON.parse(JSON.stringify(result));
  }
}
