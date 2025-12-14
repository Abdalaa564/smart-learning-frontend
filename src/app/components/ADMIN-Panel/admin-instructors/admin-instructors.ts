import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Instructor } from '../../../models/iinstructor';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';
import { AuthService } from '../../../Services/auth-service';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../shared/pagination/pagination';

@Component({
  selector: 'app-admin-instructors',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, PaginationComponent],
  templateUrl: './admin-instructors.html',
  styleUrl: './admin-instructors.css',
})
export class AdminInstructorsComponent {
  @Input() instructors: Instructor[] = [];

  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  searchText = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;

  get paginatedInstructors(): Instructor[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredInstructors.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  // Search icon implementation
  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
    this.currentPage = 1; // Reset to first page
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
      instructor.email?.toLowerCase().includes(searchLower)
    );
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  goToAdd() {
    this.router.navigate(['/instructors/add']);
  }

  viewProfile(row: Instructor) {
    if (!row.id) return;
    this.router.navigate(['/instructor', row.id, 'profile']);
  }

  goToEdit(row: Instructor) {
    if (!row.id) return;
    this.router.navigate(['/instructors/edit', row.id]);
  }

  goToDelete(row: Instructor) {
    if (!row.id) return;
    this.router.navigate(['/instructors', row.id, 'confirm-delete']);
  }
}
