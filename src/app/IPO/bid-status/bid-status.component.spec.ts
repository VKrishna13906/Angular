import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidStatusComponent } from './bid-status.component';

describe('BidStatusComponent', () => {
  let component: BidStatusComponent;
  let fixture: ComponentFixture<BidStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
