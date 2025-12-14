import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Studentprofile } from '../../../models/studentprofile';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';
import { AuthService } from '../../../Services/auth-service';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../shared/pagination/pagination';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, PaginationComponent],
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

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 15;

  get paginatedStudents(): Studentprofile[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStudents.slice(startIndex, startIndex + this.itemsPerPage);
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

  goToStudentProfile(id?: number) {
    if (!id) return;
    this.router.navigate(['/student-profile', id]);
  }

  // end Search icon implementation
}
