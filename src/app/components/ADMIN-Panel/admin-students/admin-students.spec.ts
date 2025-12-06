import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudents } from './admin-students';

describe('AdminStudents', () => {
  let component: AdminStudents;
  let fixture: ComponentFixture<AdminStudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStudents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
