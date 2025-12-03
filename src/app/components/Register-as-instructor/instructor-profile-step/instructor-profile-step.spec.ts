import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfileStep } from './instructor-profile-step';

describe('InstructorProfileStep', () => {
  let component: InstructorProfileStep;
  let fixture: ComponentFixture<InstructorProfileStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorProfileStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorProfileStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
