import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsArrayService {
  private colors;
  constructor() { }

  ColorsArray(a:string){
    switch (a) {
      case 'AU':
        this.colors = ["#6D3078", "#F9A63A", "#D70025", "#3A7517", "#d601de", "#52d726", "#2dcb75", "#26d7ae", "#ff6680", "#ff7300", "#ff3c00", "#3898f1", "#6b58bc", "#f1b002", "#6000ff",];
        break;
      case 'Mahindra':
        this.colors = ["#6D3078", "#F9A63A", "#D70025", "#3A7517", "#d601de", "#52d726", "#2dcb75", "#26d7ae", "#ff6680", "#ff7300", "#ff3c00", "#3898f1", "#6b58bc", "#f1b002", "#6000ff",];
        break;
      case 'YesSecurities':
        this.colors = ["#6D3078", "#F9A63A", "#D70025", "#3A7517", "#d601de", "#52d726", "#2dcb75", "#26d7ae", "#ff6680", "#ff7300", "#ff3c00", "#3898f1", "#6b58bc", "#f1b002", "#6000ff",];
        break;
      case 'IFA':
        this.colors = ["#4285f4", "#fabb05", "#d93025", "#2aa049", "#d601de", "#52d726", "#2dcb75", "#26d7ae", "#ff6680", "#ff7300", "#ff3c00", "#3898f1", "#6b58bc", "#f1b002", "#6000ff",];
        break;
      default:
        this.colors = ["#4285f4", "#fabb05", "#d93025", "#2aa049", "#d601de", "#52d726", "#2dcb75", "#26d7ae", "#ff6680", "#ff7300", "#ff3c00", "#3898f1", "#6b58bc", "#f1b002", "#6000ff",];
        break;
    }
    return this.colors;
  }
}
