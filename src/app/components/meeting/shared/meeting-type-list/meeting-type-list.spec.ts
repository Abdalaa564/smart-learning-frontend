import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingTypeList } from './meeting-type-list';

describe('MeetingTypeList', () => {
  let component: MeetingTypeList;
  let fixture: ComponentFixture<MeetingTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingTypeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingTypeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
