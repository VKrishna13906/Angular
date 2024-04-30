import { TestBed } from '@angular/core/testing';

import { SubbrokerService } from './subbroker.service';

describe('SubbrokerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubbrokerService = TestBed.get(SubbrokerService);
    expect(service).toBeTruthy();
  });
});
