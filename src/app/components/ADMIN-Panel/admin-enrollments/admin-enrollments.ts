import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
export interface AdminEnrollmentRow {
  studentName: string;
  courseName: string;
  coursePrice: number;
  instructorName: string;
}


@Component({
  selector: 'app-admin-enrollments',
  standalone: true,

  imports: [CommonModule],
  templateUrl: './admin-enrollments.html',
  styleUrl: './admin-enrollments.css',
})
export class AdminEnrollmentsComponent {
  @Input() enrollments: AdminEnrollmentRow[] = [];
  @Input() isLoading = false;
}
