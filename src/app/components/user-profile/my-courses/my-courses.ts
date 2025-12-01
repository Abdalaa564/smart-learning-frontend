import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/Course';
import { EnrollmentService } from '../../../Services/enrollment-service';
import { AuthService } from '../../../Services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-my-courses',
  imports: [CommonModule],
  templateUrl: './my-courses.html',
  styleUrl: './my-courses.css',
})
export class MyCourses implements OnInit {
 enrolledCourses: Course[] = [];
  studentId!: number;

  constructor(
    private enrollmentService: EnrollmentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.studentId = this.authService.currentUserId!;

  if (!this.studentId) {
    alert("Please login first.");
    this.router.navigate(['/login']);
    return;
  }

  this.loadStudentCourses();
}

  loadStudentCourses(): void {
    this.enrollmentService.getStudentCourses(this.studentId).subscribe({
      next: (courses) => {
        this.enrolledCourses = courses;
      },
      error: (err) => {
        console.error(err);
        alert("Failed to load your courses.");
      }
    });
  }
imageBase = environment.imageBase;

getCourseImage(course: any): string {
  const url = course.imageUrl;

  if (!url) {
    return '/assets/img/education/course-1.jpg';
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return this.imageBase + url;
}

  goToUnits(course: Course) {
    this.router.navigate(['/Courses', course.crs_Id, 'units']);
  }
}
