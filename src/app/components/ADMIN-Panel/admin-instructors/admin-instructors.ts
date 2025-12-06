import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Instructor } from '../../../models/iinstructor';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-admin-instructors',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './admin-instructors.html',
  styleUrl: './admin-instructors.css',
})
export class AdminInstructorsComponent {
  @Input() instructors: Instructor[] = [];

  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  searchText = '';

  @Output() add = new EventEmitter<void>();
  @Output() view = new EventEmitter<Instructor>();
  @Output() edit = new EventEmitter<Instructor>();
  @Output() delete = new EventEmitter<Instructor>();
  
  // Search icon implementation
  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }

  highlightText(text: string): string {
    return this.searchBar?.highlightText(text) || text;
  }

  get filteredInstructors(): Instructor[] {
    if (!this.searchText.trim()) {
      return this.instructors;
    }

    const searchLower = this.searchText.toLowerCase();
    return this.instructors.filter(instructor =>
      instructor.fullName?.toLowerCase().includes(searchLower) ||
      instructor.jobTitle?.toLowerCase().includes(searchLower)
    );
  }
  // end Search icon implementation
}
