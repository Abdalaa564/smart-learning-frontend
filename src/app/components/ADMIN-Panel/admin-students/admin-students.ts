import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Studentprofile } from '../../../models/studentprofile';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';
import { PaginationComponent } from '../../../shared/pagination/pagination';
import { SortingComponent, SortEvent } from '../../../shared/sorting/sorting.component';
import { SortUtils } from '../../../shared/utils/sort-utils';

import { AuthService } from '../../../Services/auth-service';
import { StudentService } from '../../../Services/student';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    PaginationComponent,
    SortingComponent
  ],
  templateUrl: './admin-students.html',
  styleUrls: ['./admin-students.css']
})
export class AdminStudentsComponent {

  @Input() students: Studentprofile[] = [];
  @Input() studentEnrollCounts: { [studentId: number]: number } = {};

  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;

  // Search
  searchText = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  // Sorting
  sortField = 'firstName';
  sortDirection: 'asc' | 'desc' = 'asc';

  sortOptions = [
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },
    { label: 'Email', value: 'email' },
    { label: 'Enrollments', value: 'enrollments' }
  ];

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private router: Router
  ) {}

  /* ================= Permissions ================= */
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  /* ================= Search ================= */
  onSearchTextChange(text: string): void {
    this.searchText = text;
    this.currentPage = 1;
  }

  highlightText(text: string): string {
    return this.searchBar?.highlightText(text) || text;
  }

  get filteredStudents(): Studentprofile[] {
    if (!this.searchText.trim()) return this.students;

    const search = this.searchText.toLowerCase();
    return this.students.filter(s =>
      s.firstName?.toLowerCase().includes(search) ||
      s.lastName?.toLowerCase().includes(search) ||
      s.email?.toLowerCase().includes(search) ||
      s.phoneNumber?.toLowerCase().includes(search)
    );
  }

  /* ================= Sorting ================= */
  handleSortChange(event: SortEvent): void {
    this.sortField = event.field;
    this.sortDirection = event.direction;
    this.currentPage = 1;
  }

  /* ================= Pagination ================= */
  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  get paginatedStudents(): Studentprofile[] {
    let data = [...this.filteredStudents];

    // Custom sort for enrollments
    if (this.sortField === 'enrollments') {
      data.sort((a, b) => {
        const aCount = this.studentEnrollCounts[a.id] || 0;
        const bCount = this.studentEnrollCounts[b.id] || 0;
        return this.sortDirection === 'asc'
          ? aCount - bCount
          : bCount - aCount;
      });
    } else {
      data = SortUtils.sortData(data, this.sortField, this.sortDirection);
    }

    const start = (this.currentPage - 1) * this.itemsPerPage;
    return data.slice(start, start + this.itemsPerPage);
  }

  /* ================= Actions ================= */
  goToStudentProfile(id?: number): void {
    if (!id) return;
    this.router.navigate(['/student-profile', id]);
  }

  onDeleteStudent(student: Studentprofile): void {
    if (!student.userId) return;

    const confirmed = confirm(
      `Are you sure you want to delete ${student.firstName} ${student.lastName}?`
    );

    if (!confirmed) return;

    this.studentService.deleteStudent(student.userId).subscribe({
      next: () => {
        this.students = this.students.filter(s => s.userId !== student.userId);
      },
      error: err => {
        console.error(err);
        alert('Failed to delete student');
      }
    });
  }
}
