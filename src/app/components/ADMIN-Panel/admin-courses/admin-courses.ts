import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Course } from '../../../models/Course';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';

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

  @Output() add = new EventEmitter<void>();
  @Output() view = new EventEmitter<Course>();
  @Output() edit = new EventEmitter<Course>();
  @Output() delete = new EventEmitter<Course>();

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
  // end Search icon implementation
}
