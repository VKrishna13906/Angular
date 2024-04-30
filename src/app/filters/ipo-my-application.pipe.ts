import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ipoMyApplication'
})
export class IpoMyApplicationPipe implements PipeTransform {

  transform(value: any, ShowRecordCount:number): any {
    //debugger
    if (value.length > 0) {
      //debugger
      let FinalArray = [];
        if (ShowRecordCount != undefined) {
          if (value.length <= ShowRecordCount) {
            value[0].IsShowLoadMore = false;
            FinalArray = value.slice(0, value.length);
          }
          else {
            value[0].IsShowLoadMore = true;
            FinalArray = value.slice(0, ShowRecordCount);
          }
        }
      return FinalArray;
    }
    else {
      return value;
    }
  }

}
