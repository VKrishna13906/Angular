import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPreLoginComponent } from './header-pre-login.component';

describe('HeaderPreLoginComponent', () => {
  let component: HeaderPreLoginComponent;
  let fixture: ComponentFixture<HeaderPreLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPreLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPreLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
