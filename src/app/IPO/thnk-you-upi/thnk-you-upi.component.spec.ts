import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThnkYouUpiComponent } from './thnk-you-upi.component';

describe('ThnkYouUpiComponent', () => {
  let component: ThnkYouUpiComponent;
  let fixture: ComponentFixture<ThnkYouUpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThnkYouUpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThnkYouUpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
