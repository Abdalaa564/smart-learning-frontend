import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEnrollments } from './admin-enrollments';

describe('AdminEnrollments', () => {
  let component: AdminEnrollments;
  let fixture: ComponentFixture<AdminEnrollments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEnrollments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEnrollments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
