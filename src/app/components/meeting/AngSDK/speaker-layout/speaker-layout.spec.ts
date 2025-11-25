import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerLayout } from './speaker-layout';

describe('SpeakerLayout', () => {
  let component: SpeakerLayout;
  let fixture: ComponentFixture<SpeakerLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakerLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeakerLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
