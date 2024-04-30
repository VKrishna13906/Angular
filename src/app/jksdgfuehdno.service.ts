import { Injectable } from '@angular/core';
import * as asdhjhureh from 'crypto-js';
import { DemoServiceService } from './demo-service.service';
import { rk } from '../assets/config/rr'
@Injectable({
  providedIn: 'root'
})
export class JksdgfuehdnoService {
  ahshuiewhraa: string = '';
  tetsassatsdg: string = '';
  constructor(private data : DemoServiceService) { 
    this.ahshuiewhraa = '345Nspb#' +this.data.GetData();
    this.tetsassatsdg = '345Nspb#$#479KJN'; //'579OpTNspb#$#897';   
  }
  //The set method is use for encrypt the value.
  setPageNotFound(value:string){
    
    let huishiwsjkzc = asdhjhureh.enc.Utf8.parse(this.ahshuiewhraa);
    let iv = asdhjhureh.enc.Utf8.parse(this.ahshuiewhraa);
    let encrypted = asdhjhureh.AES.encrypt(asdhjhureh.enc.Utf8.parse(value.toString()), huishiwsjkzc,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: asdhjhureh.mode.CBC,
        padding: asdhjhureh.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  getPageNotFound(value:string){
    let huishiwsjkzc = asdhjhureh.enc.Utf8.parse(this.ahshuiewhraa);
    let iv = asdhjhureh.enc.Utf8.parse(this.ahshuiewhraa);
    let decrypted = asdhjhureh.AES.decrypt(value, huishiwsjkzc, {
        keySize: 128 / 8,
        iv: iv,
        mode: asdhjhureh.mode.CBC,
        padding: asdhjhureh.pad.Pkcs7
    });

    return decrypted.toString(asdhjhureh.enc.Utf8);
  }

  uniquegetPageNotFound(value:string){
    let huishiwsjkzc = asdhjhureh.enc.Utf8.parse(this.tetsassatsdg);
    let iv = asdhjhureh.enc.Utf8.parse(this.tetsassatsdg);
    let decrypted = asdhjhureh.AES.decrypt(value, huishiwsjkzc, {
        keySize: 128 / 8,
        iv: iv,
        mode: asdhjhureh.mode.CBC,
        padding: asdhjhureh.pad.Pkcs7
    });

    return decrypted.toString(asdhjhureh.enc.Utf8);
  }
}
