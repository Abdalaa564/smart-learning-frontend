import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Studentprofile } from '../../../models/studentprofile';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';
import { AuthService } from '../../../Services/auth-service';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../shared/pagination/pagination';
import { SortingComponent, SortEvent } from '../../../shared/sorting/sorting.component';
import { SortUtils } from '../../../shared/utils/sort-utils';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, PaginationComponent, SortingComponent],
  templateUrl: './admin-students.html',
  styleUrl: './admin-students.css',
})
export class AdminStudentsComponent {
  @Input() students: Studentprofile[] = [];
  @Input() studentEnrollCounts: { [studentId: number]: number } = {};

  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  searchText = '';

  // Only DELETE is supported as an action (event)
  @Output() delete = new EventEmitter<Studentprofile>();

  // Sorting
  sortField = 'firstName';
  sortDirection: 'asc' | 'desc' = 'asc';
  sortOptions = [
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },
    { label: 'Email', value: 'email' },
    { label: 'Enrollments', value: 'id' } // Approximate using ID or can't sort map easily
  ];

  handleSortChange(event: SortEvent) {
    this.sortField = event.field;
    this.sortDirection = event.direction;
    this.currentPage = 1; // Reset to first page
  }

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;

  get paginatedStudents(): Studentprofile[] {
    // 1. Filter
    let processed = this.filteredStudents;

    // 2. Sort
    processed = SortUtils.sortData(processed, this.sortField, this.sortDirection);

    // 3. Paginate
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return processed.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  // Search icon implementation
  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
    this.currentPage = 1; // Reset to first page on search
  }

  highlightText(text: string): string {
    return this.searchBar?.highlightText(text) || text;
  }

  get filteredStudents(): Studentprofile[] {
    if (!this.searchText.trim()) {
      return this.students;
    }

    const searchLower = this.searchText.toLowerCase();
    return this.students.filter(student =>
      student.firstName?.toLowerCase().includes(searchLower) ||
      student.lastName?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.phoneNumber?.toLowerCase().includes(searchLower)
    );
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

goToStudentProfile(userId?: string) {
  if (!userId) return;
  
  console.log('Student User ID:', userId);
  this.router.navigate(['/student-profile', userId]);
}

  // end Search icon implementation
}
