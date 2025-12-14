import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatingSection } from './meating-section';

describe('MeatingSection', () => {
  let component: MeatingSection;
  let fixture: ComponentFixture<MeatingSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeatingSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeatingSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
