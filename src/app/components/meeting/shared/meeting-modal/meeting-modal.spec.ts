import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingModal } from './meeting-modal';

describe('MeetingModal', () => {
  let component: MeetingModal;
  let fixture: ComponentFixture<MeetingModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
