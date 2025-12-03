import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCourses } from './my-courses';

describe('MyCourses', () => {
  let component: MyCourses;
  let fixture: ComponentFixture<MyCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
