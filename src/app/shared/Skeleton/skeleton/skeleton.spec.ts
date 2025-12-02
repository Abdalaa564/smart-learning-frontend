import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonComponent } from './skeleton';

describe('SkeletonComponent', () => {
    let component: SkeletonComponent;
    let fixture: ComponentFixture<SkeletonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SkeletonComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SkeletonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default values', () => {
        expect(component.type).toBe('text');
        expect(component.width).toBe('100%');
        expect(component.height).toBe('1rem');
        expect(component.lines).toBe(1);
        expect(component.animation).toBe('wave');
    });

    it('should generate correct lines array', () => {
        component.lines = 3;
        expect(component.linesArray.length).toBe(3);
    });
});
