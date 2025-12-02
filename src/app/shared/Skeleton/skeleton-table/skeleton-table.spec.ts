import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonTableComponent } from './skeleton-table';

describe('SkeletonTableComponent', () => {
    let component: SkeletonTableComponent;
    let fixture: ComponentFixture<SkeletonTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SkeletonTableComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SkeletonTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
