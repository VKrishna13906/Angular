import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EncrdecrService } from 'src/app/Auth/encrdecr.service';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';
import { IPOServiceService } from 'src/app/services/iposervice.service';
import { JksdgfuehdnoService } from 'src/app/jksdgfuehdno.service';
@Component({
  selector: 'app-bid-category',
  templateUrl: './bid-category.component.html',
  styleUrls: ['./bid-category.component.css']
})
export class BidCategoryComponent implements OnInit {
  @Input() TrinityFlag;
  @Input() CompId;
  @Input() ArrCategory: any[] = [];
  @Input() ArrClientData: any[] = [];
  @Output() SelectedCategory: EventEmitter<any> = new EventEmitter()
  show: boolean = true;
  CategoryData: any[] = [];
  //ShowCategoryDiv: boolean = true;
  constructor(private EncrdecrService: EncrdecrService,
    private Loader: CustomLoaderService,private hireasdkask : JksdgfuehdnoService) { }

  ngOnInit() {
    localStorage.setItem('CategoryDetailsStart', JSON.stringify(new Date().getTime()))
    var loaderInterval = setInterval(() => {
      let str = document.readyState;
      if (str == 'complete' && this.ArrCategory.length > 0) {
        
        this.CategoryData = this.ArrCategory;
        if (this.TrinityFlag == "N") {
          this.CategoryData = this.CategoryData.filter(s => (s.VALUEFIELD.toLowerCase() == 'ind' || s.VALUEFIELD.toLowerCase() == 'sha' || s.VALUEFIELD.toLowerCase() == 'emp' || s.VALUEFIELD.toLowerCase() == 'pol' || s.VALUEFIELD.toLowerCase() == 'hni'));
          //this.ShowCategoryDiv = true;
        }
        else {
          let d = sessionStorage.getItem('mhsd#d@l;d*g#hjb');
          if (d != undefined && d != null) {
            let rr = JSON.parse((d));
            let pd = rr.objIPOClientPD;
            let Status = (pd[0].Status).toLowerCase();
            if (Status != 'individual' && Status != 'huf' && Status != 'nre' && Status != 'nro') {
              this.CategoryData = this.CategoryData.filter(s => (s.VALUEFIELD.toLowerCase() == 'hni'));
            }
            else {
              this.CategoryData = this.CategoryData.filter(s => (s.VALUEFIELD.toLowerCase() == 'ind' || s.VALUEFIELD.toLowerCase() == 'sha' || s.VALUEFIELD.toLowerCase() == 'emp' || s.VALUEFIELD.toLowerCase() == 'pol' || s.VALUEFIELD.toLowerCase() == 'hni'));
            }
          }
        }
        this.CategoryData[0].selected = true;
        this.CategoryData.map(arr => {
          arr.disabled = false;
        })
        this.SelectedCategory.emit(this.CategoryData[0].VALUEFIELD)
        this.setCategory(this.CategoryData[0]);

        if (sessionStorage.getItem('gjh$jbLjk') == "0") {
          sessionStorage.removeItem('nsd#d@l;d*g#hjb222');
        }
        let b = sessionStorage.getItem('nsd#d@l;d*g#hjb222');
        if (b != null && b != undefined && b != '') {
          let d: any = JSON.parse((b));
          this.CategoryData.map((arr, i) => {
            let c = d.CATEGORY;
            if (arr.VALUEFIELD == c) {
              arr.selected = true;
              this.SelectedCategory.emit(this.CategoryData[i].VALUEFIELD)
              this.setCategory(this.CategoryData[i]);
            }
            arr.disabled = true;
          })
        }
        else if (sessionStorage.getItem('gjh$jbLjk2r2') == '1') {
          let c = sessionStorage.getItem('gdfgg(%fgshgd=2f2');
          if (c != null && c != undefined && c != '') {
            let cat = JSON.parse((c));
            this.CategoryData.map((arr, i) => {
              if (arr.VALUEFIELD == cat.VALUEFIELD) {
                arr.selected = true;
                this.SelectedCategory.emit(this.CategoryData[i].VALUEFIELD)
                this.setCategory(this.CategoryData[i]);
              }
            })
          }
        }
        localStorage.setItem('CategoryDetailsEnd', JSON.stringify(new Date().getTime()))
        this.Loader.hide();
        clearInterval(loaderInterval)
      }
    }, 1000);

  }
  radioChecked(VALUEFIELD, i) {
    this.CategoryData.forEach(item => {
      if (item.VALUEFIELD !== VALUEFIELD) {
        item.selected = false;
      } else {
        item.selected = true;
        this.SelectedCategory.emit(item.VALUEFIELD);
        this.setCategory(item);
      }
    })
  }

  setCategory(category: any) {
    //
    let rr: any = {}
    rr.TEXTFIELD = category.TEXTFIELD;
    rr.VALUEFIELD = category.VALUEFIELD;
    sessionStorage.setItem('gdfgg(%fgshgd=', (JSON.stringify(rr)));
  }
}
