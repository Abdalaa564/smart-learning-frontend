import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    imports: [CommonModule],
    templateUrl: './pagination.html',
    styleUrl: './pagination.css',
})
export class PaginationComponent {
    @Input() currentPage: number = 1;
    @Input() totalItems: number = 0;
    @Input() itemsPerPage: number = 10;

    @Output() pageChange = new EventEmitter<number>();

    get totalPages(): number {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    get pages(): number[] {
        return Array(this.totalPages).fill(0).map((x, i) => i + 1);
    }

    changePage(page: number): void {
        if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
            this.pageChange.emit(page);
        }
    }
}
