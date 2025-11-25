import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourse } from './add-course';

describe('AddCourse', () => {
  let component: AddCourse;
  let fixture: ComponentFixture<AddCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
