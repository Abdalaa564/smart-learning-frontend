import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteInstructorComponent } from './delete-instructor';

describe('DeleteInstructor', () => {
  let component: ConfirmDeleteInstructorComponent;
  let fixture: ComponentFixture<ConfirmDeleteInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteInstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
