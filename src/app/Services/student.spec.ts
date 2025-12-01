import { TestBed } from '@angular/core/testing';

import { Student } from './student';

describe('Student', () => {
  let service: Student;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Student);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
