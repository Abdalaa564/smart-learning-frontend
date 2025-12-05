import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInstructor } from './register-instructor';

describe('RegisterInstructor', () => {
  let component: RegisterInstructor;
  let fixture: ComponentFixture<RegisterInstructor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterInstructor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInstructor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
