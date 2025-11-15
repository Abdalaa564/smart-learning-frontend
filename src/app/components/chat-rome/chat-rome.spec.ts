import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRome } from './chat-rome';

describe('ChatRome', () => {
  let component: ChatRome;
  let fixture: ComponentFixture<ChatRome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatRome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatRome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
