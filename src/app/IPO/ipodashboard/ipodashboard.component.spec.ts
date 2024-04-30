import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IPODashboardComponent } from './ipodashboard.component';

describe('IPODashboardComponent', () => {
  let component: IPODashboardComponent;
  let fixture: ComponentFixture<IPODashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IPODashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IPODashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
