import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonListComponent } from './skeleton-list';

describe('SkeletonListComponent', () => {
    let component: SkeletonListComponent;
    let fixture: ComponentFixture<SkeletonListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SkeletonListComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SkeletonListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
