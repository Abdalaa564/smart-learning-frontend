import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfile } from './instructor-profile';

describe('InstructorProfile', () => {
  let component: InstructorProfile;
  let fixture: ComponentFixture<InstructorProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
