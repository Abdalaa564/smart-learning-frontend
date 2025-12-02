import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton';

@Component({
    selector: 'app-skeleton-list',
    standalone: true,
    imports: [CommonModule, SkeletonComponent],
    templateUrl: './skeleton-list.html',
    styleUrls: ['./skeleton-list.css']
})
export class SkeletonListComponent {
    /**
     * Number of list items to display
     */
    @Input() items: number = 5;

    /**
     * Show avatar/icon on the left
     */
    @Input() showAvatar: boolean = true;

    /**
     * Number of text lines per item
     */
    @Input() lines: number = 2;

    /**
     * Animation type
     */
    @Input() animation: 'pulse' | 'wave' = 'wave';

    /**
     * Avatar size
     */
    @Input() avatarSize: string = '48px';

    /**
     * Get array for ngFor
     */
    get itemsArray(): number[] {
        return Array(this.items).fill(0);
    }
}
