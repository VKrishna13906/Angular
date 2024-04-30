import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IPOViewMoreComponent } from './ipoview-more.component';

describe('IPOViewMoreComponent', () => {
  let component: IPOViewMoreComponent;
  let fixture: ComponentFixture<IPOViewMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IPOViewMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IPOViewMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
