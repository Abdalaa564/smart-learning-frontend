import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SortEvent {
    field: string;
    direction: 'asc' | 'desc';
}

@Component({
    selector: 'app-sorting',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.css']
})
export class SortingComponent {
    @Input() sortOptions: { label: string; value: string }[] = [];
    @Input() initialSortField: string = '';

    @Output() sortChange = new EventEmitter<SortEvent>();

    selectedField: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';

    ngOnInit() {
        if (this.initialSortField) {
            this.selectedField = this.initialSortField;
        } else if (this.sortOptions.length > 0) {
            this.selectedField = this.sortOptions[0].value;
        }
    }

    onFieldChange() {
        this.emitSortChange();
    }

    toggleDirection() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.emitSortChange();
    }

    private emitSortChange() {
        this.sortChange.emit({
            field: this.selectedField,
            direction: this.sortDirection
        });
    }
}
