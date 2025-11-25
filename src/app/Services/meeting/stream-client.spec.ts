import { TestBed } from '@angular/core/testing';

import { StreamClient } from './stream-client';

describe('StreamClient', () => {
  let service: StreamClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
