import { TestBed } from '@angular/core/testing';

import { TokenExpireService } from './token-expire.service';

describe('TokenExpireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenExpireService = TestBed.get(TokenExpireService);
    expect(service).toBeTruthy();
  });
});
