import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusStepperComponent } from './order-status-stepper.component';

describe('OrderStatusStepperComponent', () => {
  let component: OrderStatusStepperComponent;
  let fixture: ComponentFixture<OrderStatusStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
