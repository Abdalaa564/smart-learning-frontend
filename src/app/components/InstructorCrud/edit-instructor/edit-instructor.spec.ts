import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstructorComponent } from './edit-instructor';

describe('EditInstructor', () => {
  let component: EditInstructorComponent;
  let fixture: ComponentFixture<EditInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
