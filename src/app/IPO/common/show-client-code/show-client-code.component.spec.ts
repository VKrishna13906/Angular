import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClientCodeComponent } from './show-client-code.component';

describe('ShowClientCodeComponent', () => {
  let component: ShowClientCodeComponent;
  let fixture: ComponentFixture<ShowClientCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowClientCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowClientCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
