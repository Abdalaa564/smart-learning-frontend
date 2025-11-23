import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallControls } from './call-controls';

describe('CallControls', () => {
  let component: CallControls;
  let fixture: ComponentFixture<CallControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
