import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstructorsListComponent } from './instructors';



describe('Instructors', () => {
  let component: InstructorsListComponent;
  let fixture: ComponentFixture<InstructorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
