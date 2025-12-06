import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../models/Course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-courses.html',
  styleUrl: './admin-courses.css',
})
export class AdminCoursesComponent {
  @Input() courses: Course[] = [];
  @Input() courseEnrollCounts: { [courseId: number]: number } = {};

  @Output() add = new EventEmitter<void>();
  @Output() view = new EventEmitter<Course>();
  @Output() edit = new EventEmitter<Course>();
  @Output() delete = new EventEmitter<Course>();

  getCourseEnrollCount(courseId: number): number {
    return this.courseEnrollCounts[courseId] ?? 0;
  }
}
