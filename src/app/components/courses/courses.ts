import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../models/Course';
import { environment } from '../../environment/environment';
import {
  AddCourseRequest,
  CourseService,
  UpdateCourseRequest,
} from '../../Services/course.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Instructor } from '../../models/iinstructor';
import { InstructorService } from '../../Services/instructor-srevices';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth-service';
import { EnrollmentService } from '../../Services/enrollment-service';
import { EnrollmentRequest } from '../../models/EnrollmentRequest';

@Component({
  selector: 'app-courses',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  courses: Course[] = [];
  instructors: Instructor[] = [];
  imageBase = environment.imageBase;
  enrolledCourses: Set<number> = new Set();

  showEnrollModal: boolean = false;
  selectedCourse: Course | null = null;
  enrollingCourseId: number | null = null;
  selectedPaymentMethod: string = 'CreditCard';

  paymentMethods = [
    { value: 'CreditCard', label: 'Credit Card', icon: '💳' },
    { value: 'DebitCard', label: 'Debit Card', icon: '💳' },
    { value: 'PayPal', label: 'PayPal', icon: '🅿️' },
    { value: 'BankTransfer', label: 'Bank Transfer', icon: '🏦' },
  ];
  enrollmentMessage: string = '';
  enrollmentSuccess: boolean = false;
  showResultModal: boolean = false;
  transactionId: string = '';

  constructor(
    private courseService: CourseService,
    private instructorService: InstructorService,
    private authService: AuthService,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadEnrolledCourses();
  }

  loadData(): void {
    forkJoin({
      courses: this.courseService.getAllCourses(),
      instructors: this.instructorService.getAll(),
    }).subscribe({
      next: (data) => {
        this.courses = data.courses;
        this.instructors = data.instructors;
      },
      error: (err) => console.error('Error loading data:', err),
    });
  }

  getCourseImage(course: Course): string {
    const url = course.imageUrl;

    if (!url) {
      return '/assets/img/education/course-1.jpg';
    }

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    return this.imageBase + url;
  }

  getInstructorImage(course: Course): string {
    const instructor = this.instructors.find((i) => i.id === course.instructorId);

    if (!instructor || !instructor.photoUrl) {
      return '/assets/img/person/person-1.jpg';
    }

    return instructor.photoUrl;
  }

  getInstructorName(course: Course): string {
    const instructor = this.instructors.find((i) => i.id === course.instructorId);
    return instructor?.fullName ?? course.instructorName ?? 'Unknown';
  }

  // ---------- DELETE COURSE ----------
  deleteCourse(course: Course): void {
    if (!confirm(`Are you sure to delete "${course.crs_Name}" ?`)) return;

    this.courseService.deleteCourse(course.crs_Id).subscribe({
      next: (res) => {
        console.log('Delete response:', res);
        this.loadData();
      },
      error: (err) => console.error(err),
    });
  }

  // ----------- ENROLLMENT ----------
  loadEnrolledCourses(): void {
    const studentId = this.authService.currentUserId;
    if (studentId) {
      this.enrollmentService.getStudentCourses(studentId).subscribe({
        next: (courses) => {
          courses.forEach((course) => {
            this.enrolledCourses.add(course.crs_Id);
          });
        },
        error: (err) => console.error('Error loading enrolled courses:', err),
      });
    }
  }

  isEnrolledInCourse(id: number): boolean {
    return this.enrolledCourses.has(id);
  }

  goToUnits(course: Course): void {
    const studentId = this.authService.currentUserId;

    if (!studentId) {
      alert('⚠️ Please login to access course content.');
      this.router.navigate(['/login']);
      return;
    }

    if (course.crs_Id == null) {
      console.error('Attempted to navigate to units for a course with missing crs_Id:', course);
      alert('❌ Cannot access units: Course ID is missing.');
      return;
    }

    if (!this.isEnrolledInCourse(course.crs_Id)) {
      const confirmEnroll = confirm(
        `You must enroll in "${course.crs_Name}" to access its units.\n\nWould you like to enroll now?`
      );
      if (confirmEnroll) {
        this.enroll(course);
      }
      return;
    }

    this.router.navigate(['/Courses', course.crs_Id, 'units']);
  }

  enroll(course: Course): void {
    const studentId = this.authService.currentUserId;

    if (!studentId) {
      alert('⚠️ You must be logged in to enroll in a course.');
      return;
    }

    this.selectedCourse = course;
    this.selectedPaymentMethod = 'CreditCard';
    this.showEnrollModal = true;
  }

  confirmEnrollment(): void {
    if (!this.selectedCourse) return;

    const studentId = this.authService.currentUserId;
    if (!studentId) {
      alert('⚠️ You must be logged in to enroll.');
      this.closeEnrollModal();
      return;
    }

    this.enrollingCourseId = this.selectedCourse.crs_Id;

    const req: EnrollmentRequest = {
      studentId: studentId,
      courseId: this.selectedCourse.crs_Id,
      payment: {
        amount: this.selectedCourse.price,
        paymentMethod: this.selectedPaymentMethod,
      },
    };

    this.enrollmentService.enrollStudent(req).subscribe({
      next: (res) => {
        this.enrollingCourseId = null;
        this.showEnrollModal = false;

        if (this.selectedCourse) {
          this.enrolledCourses.add(this.selectedCourse.crs_Id);
        }

        this.enrollmentSuccess = true;
        this.enrollmentMessage = res.message || 'Enrollment completed successfully!';
        this.transactionId = res.transactionId || '';
        this.showResultModal = true;
      },
      error: (err) => {
        this.enrollingCourseId = null;
        this.showEnrollModal = false;
        this.enrollmentSuccess = false;
        this.enrollmentMessage =
          err.error?.message || 'Failed to enroll. Please try again.';
        this.showResultModal = true;
        console.error('Enrollment error:', err);
      },
    });
  }

  closeEnrollModal(): void {
    this.showEnrollModal = false;
    this.selectedCourse = null;
    this.enrollingCourseId = null;
  }

  closeResultModal(): void {
    this.showResultModal = false;
    this.enrollmentMessage = '';
    this.transactionId = '';
  }

  isEnrolling(crs_Id: number): boolean {
    return this.enrollingCourseId === crs_Id;
  }

  goToMyCourses(): void {
    const studentId = this.authService.currentUserId;
    if (studentId) {
      this.router.navigate(['/student', studentId, 'courses']);
    }
    this.closeResultModal();
  }
}
