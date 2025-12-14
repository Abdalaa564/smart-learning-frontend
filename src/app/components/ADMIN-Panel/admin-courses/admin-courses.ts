
import { Component, Input, ViewChild } from '@angular/core';
import { Course } from '../../../models/Course';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';
import { AuthService } from '../../../Services/auth-service';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../shared/pagination/pagination';
import { SortingComponent, SortEvent } from '../../../shared/sorting/sorting.component';
import { SortUtils } from '../../../shared/utils/sort-utils';

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, PaginationComponent, SortingComponent],
  templateUrl: './admin-courses.html',
  styleUrl: './admin-courses.css',
})
export class AdminCoursesComponent {
  @Input() courses: Course[] = [];
  @Input() courseEnrollCounts: { [courseId: number]: number } = {};

  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  searchText = '';

  getCourseEnrollCount(courseId: number): number {
    return this.courseEnrollCounts[courseId] ?? 0;
  }

  // Sorting
  sortField = 'crs_Name';
  sortDirection: 'asc' | 'desc' = 'asc';
  sortOptions = [
    { label: 'Name', value: 'crs_Name' },
    { label: 'Price', value: 'price' },
    { label: 'Description', value: 'crs_Description' }
  ];

  handleSortChange(event: SortEvent) {
    this.sortField = event.field;
    this.sortDirection = event.direction;
    this.currentPage = 1; // Reset to first page
  }

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;

  get paginatedCourses(): Course[] {
    // 1. Filter
    let processed = this.filteredCourses;

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

  get filteredCourses(): Course[] {
    if (!this.searchText.trim()) {
      return this.courses;
    }

    const searchLower = this.searchText.toLowerCase();
    return this.courses.filter(course =>
      course.crs_Name?.toLowerCase().includes(searchLower) ||
      course.crs_Description?.toLowerCase().includes(searchLower)
    );
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // Actions matching Courses component
  goToAdd() {
    this.router.navigate(['/courses/add']);
  }

  viewDetails(course: Course) {
    if (!course.crs_Id) return;
    this.router.navigate(['/courses', course.crs_Id, 'details']);
  }

  goToEdit(course: Course) {
    if (!course.crs_Id) return;
    this.router.navigate(['/courses/edit', course.crs_Id]);
  }

  goToDelete(course: Course) {
    if (!course.crs_Id) return;
    this.router.navigate(['/Courses/delete', course.crs_Id]);
  }

  // end Search icon implementation
}

