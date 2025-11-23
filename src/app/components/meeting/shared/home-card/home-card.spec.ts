import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCard } from './home-card';

describe('HomeCard', () => {
  let component: HomeCard;
  let fixture: ComponentFixture<HomeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
