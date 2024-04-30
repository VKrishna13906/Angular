import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryDetailsComponent } from './order-summary-details.component';

describe('OrderSummaryDetailsComponent', () => {
  let component: OrderSummaryDetailsComponent;
  let fixture: ComponentFixture<OrderSummaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSummaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
