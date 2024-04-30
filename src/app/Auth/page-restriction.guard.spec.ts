import { TestBed, async, inject } from '@angular/core/testing';

import { PageRestrictionGuard } from './page-restriction.guard';

describe('PageRestrictionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageRestrictionGuard]
    });
  });

  it('should ...', inject([PageRestrictionGuard], (guard: PageRestrictionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
