import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { enrollmentGuard } from './enrollment-guard';

describe('enrollmentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => enrollmentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
