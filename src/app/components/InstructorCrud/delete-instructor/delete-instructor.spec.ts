import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInstructor } from './delete-instructor';

describe('DeleteInstructor', () => {
  let component: DeleteInstructor;
  let fixture: ComponentFixture<DeleteInstructor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteInstructor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteInstructor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
