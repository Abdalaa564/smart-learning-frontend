import { Component, Input, ViewChild } from '@angular/core';
import { Course } from '../../../models/Course';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';
import { AuthService } from '../../../Services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
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

  // Search icon implementation
  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
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
      course.instructorName?.toLowerCase().includes(searchLower) ||
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
