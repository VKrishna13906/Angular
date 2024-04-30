import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisabledRightClick]'
})
export class DisabledRightClickDirective {

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }
  constructor() { }

}
