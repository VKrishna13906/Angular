import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpoHeaderComponent } from './ipo-header.component';

describe('IpoHeaderComponent', () => {
  let component: IpoHeaderComponent;
  let fixture: ComponentFixture<IpoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
