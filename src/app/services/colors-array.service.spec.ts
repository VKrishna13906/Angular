import { TestBed } from '@angular/core/testing';

import { ColorsArrayService } from './colors-array.service';

describe('ColorsArrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorsArrayService = TestBed.get(ColorsArrayService);
    expect(service).toBeTruthy();
  });
});
