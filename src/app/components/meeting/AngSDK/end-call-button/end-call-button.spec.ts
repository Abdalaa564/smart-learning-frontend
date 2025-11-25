import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndCallButton } from './end-call-button';

describe('EndCallButton', () => {
  let component: EndCallButton;
  let fixture: ComponentFixture<EndCallButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndCallButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndCallButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
