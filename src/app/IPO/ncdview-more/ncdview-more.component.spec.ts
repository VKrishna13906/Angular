import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NCDViewMoreComponent } from './ncdview-more.component';

describe('NCDViewMoreComponent', () => {
  let component: NCDViewMoreComponent;
  let fixture: ComponentFixture<NCDViewMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NCDViewMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NCDViewMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
