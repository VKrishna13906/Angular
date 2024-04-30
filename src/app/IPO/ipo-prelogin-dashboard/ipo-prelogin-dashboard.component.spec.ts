import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpoPreloginDashboardComponent } from './ipo-prelogin-dashboard.component';

describe('IpoPreloginDashboardComponent', () => {
  let component: IpoPreloginDashboardComponent;
  let fixture: ComponentFixture<IpoPreloginDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpoPreloginDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpoPreloginDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
