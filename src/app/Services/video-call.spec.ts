import { TestBed } from '@angular/core/testing';

import { VideoCall } from './video-call';

describe('VideoCall', () => {
  let service: VideoCall;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoCall);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
