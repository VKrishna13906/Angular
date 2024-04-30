import { TestBed } from '@angular/core/testing';

import { ConvertToJSONService } from './convert-to-json.service';

describe('ConvertToJSONService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConvertToJSONService = TestBed.get(ConvertToJSONService);
    expect(service).toBeTruthy();
  });
});
