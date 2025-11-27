import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCourse } from './delete-course';

describe('DeleteCourse', () => {
  let component: DeleteCourse;
  let fixture: ComponentFixture<DeleteCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
