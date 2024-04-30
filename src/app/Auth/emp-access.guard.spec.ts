import { TestBed, async, inject } from '@angular/core/testing';

import { EmpAccessGuard } from './emp-access.guard';

describe('EmpAccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpAccessGuard]
    });
  });

  it('should ...', inject([EmpAccessGuard], (guard: EmpAccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
