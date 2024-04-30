import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, SearchIssue: string, FilterObj: {}): any {
    debugger
    let FinalArray = [];
    if (value.length > 0) {
      if (SearchIssue != '' && SearchIssue.length >= 3) {
        let rr = value.filter(a => a.CompanyName.trim().toLowerCase().includes(SearchIssue.toLowerCase()));
        FinalArray = this.MakeIssueTypeArray(rr, FilterObj);
      }
      else {
        FinalArray = this.MakeIssueTypeArray(value, FilterObj);
      }
    }
    else {
      FinalArray = value;
    }
    return FinalArray
  }
  MakeIssueTypeArray(arr, FilterObj) {
    let TempArr: any;
    let IssueType = FilterObj.SelectedIssueType;
    if (IssueType != '') {
      let rr = arr.filter(a => a.IssueType == IssueType);
      TempArr = this.MakeStatusArray(rr, FilterObj);
    }
    else {
      TempArr = this.MakeStatusArray(arr, FilterObj);
    }
    return TempArr;
  }
  MakeStatusArray(arr, FilterObj) {
    let TempArr: any;
    let Status = FilterObj.SelectedStatus;
    if (Status != '') {
      let rr = arr.filter(a => a.BidStatusDisplay == Status);
      TempArr = this.MakeFinancialArray(rr, FilterObj);
    }
    else {
      TempArr = this.MakeFinancialArray(arr, FilterObj);
    }
    return TempArr;
  }
  MakeFinancialArray(arr, FilterObj) {
    
    console.log(JSON.stringify(FilterObj))
    let TempArr: any;
    let FromDate = FilterObj.FromDate;
    let ToDate = FilterObj.ToDate;
    if (FromDate != '' && ToDate != '') {
      let rr = [];
      arr.map(a => {
        let d = ((a.DateOfApplication).split('.'))[0];
        let dd = (d.split('T'))[0];
        let ddd = `${dd}T00:00:00`;
        let dof = +new Date(ddd);
        let f = +new Date(FromDate);
        let t = +new Date(ToDate);
        if (f <= dof && t >= dof) {
          rr.push(a)
        }
      });
      TempArr = rr;
    }
    else {
      TempArr = arr
    }
    return TempArr;
  }
}
