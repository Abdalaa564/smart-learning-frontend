import { TestBed } from '@angular/core/testing';

import { InstructorService } from './instructor-srevices';

describe('InstructorSrevices', () => {
  let service: InstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
