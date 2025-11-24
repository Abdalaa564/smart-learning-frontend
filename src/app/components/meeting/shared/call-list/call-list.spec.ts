import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallList } from './call-list';

describe('CallList', () => {
  let component: CallList;
  let fixture: ComponentFixture<CallList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
