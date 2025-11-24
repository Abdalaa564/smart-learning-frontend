import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallParticipantsList } from './call-participants-list';

describe('CallParticipantsList', () => {
  let component: CallParticipantsList;
  let fixture: ComponentFixture<CallParticipantsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallParticipantsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallParticipantsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
