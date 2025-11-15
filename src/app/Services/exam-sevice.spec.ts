import { TestBed } from '@angular/core/testing';

import { ExamSevice } from './exam-sevice';

describe('ExamSevice', () => {
  let service: ExamSevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamSevice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
