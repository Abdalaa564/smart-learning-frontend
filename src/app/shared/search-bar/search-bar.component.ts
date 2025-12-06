import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
    @Input() placeholder: string = 'Search...';
    @Input() alignRight: boolean = true; // true = expand from right, false = expand from left
    @Output() searchTextChange = new EventEmitter<string>();

    isSearchOpen = false;
    searchText = '';

    toggleSearch() {
        this.isSearchOpen = !this.isSearchOpen;
        if (!this.isSearchOpen) {
            this.searchText = '';
            this.searchTextChange.emit('');
        }
    }

    onSearchChange() {
        this.searchTextChange.emit(this.searchText);
    }

    /**
     * Highlights matching text in the provided content
     * @param text - The text to search within
     * @returns HTML string with highlighted matches
     */
    highlightText(text: string): string {
        if (!this.searchText.trim()) return text;

        const regex = new RegExp(`(${this.searchText})`, 'gi');
        return text.replace(regex, '<mark class="highlight">$1</mark>');
    }
}
