import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInstructors } from './admin-instructors';

describe('AdminInstructors', () => {
  let component: AdminInstructors;
  let fixture: ComponentFixture<AdminInstructors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInstructors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInstructors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
