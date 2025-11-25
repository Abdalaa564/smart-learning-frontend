import { TestBed } from '@angular/core/testing';

import { StudentprofileService } from './studentprofile-service';

describe('StudentprofileService', () => {
  let service: StudentprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
