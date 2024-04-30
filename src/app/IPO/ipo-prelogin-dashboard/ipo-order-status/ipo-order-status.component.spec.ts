import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpoOrderStatusComponent } from './ipo-order-status.component';

describe('IpoOrderStatusComponent', () => {
  let component: IpoOrderStatusComponent;
  let fixture: ComponentFixture<IpoOrderStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpoOrderStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpoOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
