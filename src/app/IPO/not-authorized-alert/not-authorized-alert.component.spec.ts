import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthorizedAlertComponent } from './not-authorized-alert.component';

describe('NotAuthorizedAlertComponent', () => {
  let component: NotAuthorizedAlertComponent;
  let fixture: ComponentFixture<NotAuthorizedAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAuthorizedAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAuthorizedAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
