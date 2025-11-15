import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSection } from './categories-section';

describe('CategoriesSection', () => {
  let component: CategoriesSection;
  let fixture: ComponentFixture<CategoriesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
