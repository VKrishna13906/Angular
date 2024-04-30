import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomLoaderService {
  visible: boolean = false;
  constructor() { }
  hide() { this.visible = false; }
  show() { this.visible = true; }
}
