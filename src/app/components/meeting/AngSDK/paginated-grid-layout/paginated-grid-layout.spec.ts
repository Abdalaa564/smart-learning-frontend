import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedGridLayout } from './paginated-grid-layout';

describe('PaginatedGridLayout', () => {
  let component: PaginatedGridLayout;
  let fixture: ComponentFixture<PaginatedGridLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatedGridLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatedGridLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
