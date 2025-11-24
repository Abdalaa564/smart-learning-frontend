import { TestBed } from '@angular/core/testing';

import { MeetingRoomService } from './meeting-room-service';

describe('MeetingRoomService', () => {
  let service: MeetingRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
