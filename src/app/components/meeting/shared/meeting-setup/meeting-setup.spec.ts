import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSetup } from './meeting-setup';

describe('MeetingSetup', () => {
  let component: MeetingSetup;
  let fixture: ComponentFixture<MeetingSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
