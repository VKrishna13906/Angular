import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyIpoComponent } from './apply-ipo.component';

describe('ApplyIpoComponent', () => {
  let component: ApplyIpoComponent;
  let fixture: ComponentFixture<ApplyIpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyIpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyIpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
