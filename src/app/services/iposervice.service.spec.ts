import { TestBed } from '@angular/core/testing';

import { IPOServiceService } from './iposervice.service';

describe('IPOServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IPOServiceService = TestBed.get(IPOServiceService);
    expect(service).toBeTruthy();
  });
});
