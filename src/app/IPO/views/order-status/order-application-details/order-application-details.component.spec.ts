import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApplicationDetailsComponent } from './order-application-details.component';

describe('OrderApplicationDetailsComponent', () => {
  let component: OrderApplicationDetailsComponent;
  let fixture: ComponentFixture<OrderApplicationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderApplicationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
