import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAccountStep } from './instructor-account-step';

describe('InstructorAccountStep', () => {
  let component: InstructorAccountStep;
  let fixture: ComponentFixture<InstructorAccountStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorAccountStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorAccountStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
