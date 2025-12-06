import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInstructorRequests } from './admin-instructor-requests';

describe('AdminInstructorRequests', () => {
  let component: AdminInstructorRequests;
  let fixture: ComponentFixture<AdminInstructorRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInstructorRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInstructorRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
