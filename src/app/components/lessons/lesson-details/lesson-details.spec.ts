import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDetails } from './lesson-details';

describe('LessonDetails', () => {
  let component: LessonDetails;
  let fixture: ComponentFixture<LessonDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
