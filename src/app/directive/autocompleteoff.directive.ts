import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutocompleteoff]'
})
export class AutocompleteoffDirective {
  private _chrome = navigator.userAgent.indexOf('Chrome') > -1;
  constructor(private _el: ElementRef) {}
  ngOnInit() {
    debugger
    if (this._chrome) {
      if (this._el.nativeElement.getAttribute('autocomplete') === 'off') {
        setTimeout(() => {
          this._el.nativeElement.setAttribute('autocomplete', 'offoff');
        });
      }
    }
  }

}
