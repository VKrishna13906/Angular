import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAllotmentPageNewComponent } from './report-allotment-page-new.component';

describe('ReportAllotmentPageNewComponent', () => {
  let component: ReportAllotmentPageNewComponent;
  let fixture: ComponentFixture<ReportAllotmentPageNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAllotmentPageNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAllotmentPageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
