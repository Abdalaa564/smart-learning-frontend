import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLesson } from './delete-lesson';

describe('DeleteLesson', () => {
  let component: DeleteLesson;
  let fixture: ComponentFixture<DeleteLesson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLesson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLesson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
