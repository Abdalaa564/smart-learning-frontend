import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Meeting } from './meeting';

describe('Meeting', () => {
  let component: Meeting;
  let fixture: ComponentFixture<Meeting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Meeting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Meeting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
