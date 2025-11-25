import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLesson } from './add-lesson';

describe('AddLesson', () => {
  let component: AddLesson;
  let fixture: ComponentFixture<AddLesson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLesson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLesson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
