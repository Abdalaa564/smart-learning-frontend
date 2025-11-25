import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updatelesson } from './updatelesson';

describe('Updatelesson', () => {
  let component: Updatelesson;
  let fixture: ComponentFixture<Updatelesson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updatelesson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updatelesson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
