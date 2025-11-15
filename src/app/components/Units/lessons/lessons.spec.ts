import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lessons } from './lessons';

describe('Lessons', () => {
  let component: Lessons;
  let fixture: ComponentFixture<Lessons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lessons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lessons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
