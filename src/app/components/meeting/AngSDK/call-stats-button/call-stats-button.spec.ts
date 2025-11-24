import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallStatsButton } from './call-stats-button';

describe('CallStatsButton', () => {
  let component: CallStatsButton;
  let fixture: ComponentFixture<CallStatsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallStatsButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallStatsButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
