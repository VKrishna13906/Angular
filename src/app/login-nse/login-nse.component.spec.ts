import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNseComponent } from './login-nse.component';

describe('LoginNseComponent', () => {
  let component: LoginNseComponent;
  let fixture: ComponentFixture<LoginNseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginNseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginNseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
