import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUnit } from './update-unit';

describe('UpdateUnit', () => {
  let component: UpdateUnit;
  let fixture: ComponentFixture<UpdateUnit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUnit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUnit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
