import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoServiceService {

  constructor() { }

  GetData(){
    var data = 'ddMMyyyy';
    return formatDate(new Date(), data, 'en')
  }
}
