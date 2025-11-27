import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstructor } from './edit-instructor';

describe('EditInstructor', () => {
  let component: EditInstructor;
  let fixture: ComponentFixture<EditInstructor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInstructor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInstructor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
