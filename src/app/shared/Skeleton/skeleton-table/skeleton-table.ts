import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton';

@Component({
    selector: 'app-skeleton-table',
    standalone: true,
    imports: [CommonModule, SkeletonComponent],
    templateUrl: './skeleton-table.html',
    styleUrls: ['./skeleton-table.css']
})
export class SkeletonTableComponent {
    /**
     * Number of rows to display
     */
    @Input() rows: number = 5;

    /**
     * Number of columns to display
     */
    @Input() columns: number = 4;

    /**
     * Show table header
     */
    @Input() showHeader: boolean = true;

    /**
     * Animation type
     */
    @Input() animation: 'pulse' | 'wave' = 'wave';

    /**
     * Get array for rows
     */
    get rowsArray(): number[] {
        return Array(this.rows).fill(0);
    }

    /**
     * Get array for columns
     */
    get columnsArray(): number[] {
        return Array(this.columns).fill(0);
    }
}
