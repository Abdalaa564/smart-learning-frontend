import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourses } from './admin-courses';

describe('AdminCourses', () => {
  let component: AdminCourses;
  let fixture: ComponentFixture<AdminCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
