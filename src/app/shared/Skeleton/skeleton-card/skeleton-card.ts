import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton';

@Component({
    selector: 'app-skeleton-card',
    standalone: true,
    imports: [CommonModule, SkeletonComponent],
    templateUrl: './skeleton-card.html',
    styleUrls: ['./skeleton-card.css']
})
export class SkeletonCardComponent {
    /**
     * Show image skeleton at the top
     */
    @Input() showImage: boolean = true;

    /**
     * Number of text lines in the card
     */
    @Input() lines: number = 3;

    /**
     * Show action buttons at the bottom
     */
    @Input() showActions: boolean = false;

    /**
     * Animation type
     */
    @Input() animation: 'pulse' | 'wave' = 'wave';

    /**
     * Image height
     */
    @Input() imageHeight: string = '200px';
}
