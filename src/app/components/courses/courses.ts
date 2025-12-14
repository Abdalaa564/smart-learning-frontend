// courses.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../models/Course';
import { environment } from '../../environment/environment';
import { CourseService } from '../../Services/course.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Instructor } from '../../models/iinstructor';
import { InstructorService } from '../../Services/instructor-srevices';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth-service';
import { EnrollmentService } from '../../Services/enrollment-service';
import { EnrollmentRequest } from '../../models/EnrollmentRequest';
import { SkeletonCardComponent } from '../../shared/Skeleton/skeleton-card/skeleton-card';
import { PaginationComponent } from '../../shared/pagination/pagination';
import { SafePipe } from '../../pipes/safe-pipe';
import { Snackbar } from '../../shared/snackbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  imports: [FormsModule, CommonModule, RouterLink, SkeletonCardComponent, PaginationComponent, SafePipe,MatSnackBarModule],
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
  selectedPaymentMethod = 'Paymob';

  showPaymentIframe = false;
  paymentUrl = '';
  transactionId = '';
  enrollmentMessage: string = '';
  enrollmentSuccess: boolean = false;
  showResultModal: boolean = false;

  // For checking payment status
  checkingPaymentStatus = false;

  isLoading = true;

  // ----Pagination----
  currentPage: number = 1;
  itemsPerPage: number = 8;

  get paginatedCourses(): Course[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.courses.slice(startIndex, startIndex + this.itemsPerPage);
  }
  // ---- end Pagination----
  
  // Role checking
  get isInstructor(): boolean {
    return this.authService.isInstructor();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isStudent(): boolean {
    return this.authService.isStudent();
  }

  // End Role checking

  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  constructor(
    private courseService: CourseService,
    private instructorService: InstructorService,
    private authService: AuthService,
    private enrollmentService: EnrollmentService,
    private router: Router,
    private route: ActivatedRoute,
   private snackBar: Snackbar

  ) { }

  ngOnInit(): void {
    this.loadData();
    this.loadEnrolledCourses();
    
    // Check if returning from payment
    this.checkPaymentCallback();
  }

  /**
   * Check if user is returning from Paymob payment
   */
  checkPaymentCallback(): void {
    this.route.queryParams.subscribe(params => {
      const success = params['success'];
      const transactionId = params['transactionId'];
      
      if (success === 'true' && transactionId) {
        this.verifyPaymentStatus(transactionId);
      } else if (success === 'false') {
        this.showPaymentResult(false, 'Payment was cancelled or failed.');
      }
    });
  }

  /**
   * Verify payment status with backend
   */
  verifyPaymentStatus(transactionId: string): void {
    this.checkingPaymentStatus = true;
    
    this.enrollmentService.getEnrollmentStatus(transactionId).subscribe({
      next: (status) => {
        this.checkingPaymentStatus = false;
        
        if (status.paymentStatus === 'Completed') {
          this.enrolledCourses.add(status.courseId);
          this.showPaymentResult(true, 'Enrollment successful! Welcome to your course.');
        } else if (status.paymentStatus === 'Pending') {
        this.showPaymentResult(false, 'Payment is still being processed. Please check back later.');
      } else {
        this.showPaymentResult(false, `Payment ${status.paymentStatus.toLowerCase()}. Please try again.`);
      }
      },
      error: (err) => {
        this.checkingPaymentStatus = false;
        this.showPaymentResult(false, 'Error verifying payment status.');
        console.error(err);
      }
    });
  }

  loadData(): void {
    this.isLoading = true;

    forkJoin({
      courses: this.courseService.getAllCourses(),
      instructors: this.instructorService.getAll(),
    }).subscribe({
      next: (data) => {
        this.courses = data.courses;
        this.instructors = data.instructors;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false;
         this.snackBar.open('Failed to load courses', 'error');
      },
    });
  }

  getCourseImage(course: Course): string {
    const url = course.imageUrl;
    if (!url) return '/assets/img/education/course-1.jpg';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
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

  deleteCourse(course: Course): void {
    if (!confirm(`Are you sure to delete "${course.crs_Name}" ?`)) return;
    this.courseService.deleteCourse(course.crs_Id).subscribe({
      next: (res) => {
        console.log('Delete response:', res);
        this.snackBar.open('Course deleted successfully', 'success');
        this.loadData();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to delete course', 'error');
      }
    });
  }

  loadEnrolledCourses(): void {
    const studentId = this.authService.UserId;
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
      // alert('⚠️ Please login to access course content.');
        this.snackBar.open('⚠️ Please login to access course content.', 'error');
      this.router.navigate(['/login']);
      return;
    }
    if (course.crs_Id == null) {
      this.snackBar.open('❌ Cannot access units: Course ID is missing.', 'error');
      return;
    }
    this.router.navigate(['/Courses', course.crs_Id, 'units']);
  }

  enroll(course: Course): void {
    const studentId = this.authService.currentUserId;
    if (!studentId) {
      this.snackBar.open('⚠️ You must be logged in to enroll in a course.', 'error');
      return;
    }
    this.selectedCourse = course;
    this.selectedPaymentMethod = 'Paymob';
    this.showEnrollModal = true;
  }

  /**
   * Confirm enrollment and get payment URL
   */
  confirmEnrollment(): void {
    if (!this.selectedCourse) return;

    const studentId = this.authService.UserId!;
    const req: EnrollmentRequest = {
      studentId,
      courseId: this.selectedCourse.crs_Id,
      payment: {
        amount: this.selectedCourse.price,
        paymentMethod: this.selectedPaymentMethod,
      },
    };

    this.enrollmentService.enrollStudent(req).subscribe({
      next: (res) => {
        this.showEnrollModal = false;
        
        if (res.success && res.paymentUrl) {
          this.transactionId = res.transactionId;
          this.paymentUrl = res.paymentUrl;
          
          // Option 1: Show in iframe (current approach)
          this.showPaymentIframe = true;
          
          // Option 2: Redirect directly to Paymob (alternative)
          // window.location.href = res.paymentUrl;
        } else {
          this.snackBar.open(res.message || 'Failed to initiate enrollment', 'error');
        }
      },
      error: (err) => {
        this.showEnrollModal = false;
        this.snackBar.open(err.error?.message || 'Failed to enroll', 'error');
        console.error(err);
      },
    });
  }

  /**
   * Show payment result modal
   */
  showPaymentResult(success: boolean, message: string): void {
    this.enrollmentSuccess = success;
    this.enrollmentMessage = message;
    this.showResultModal = true;
    this.closePaymentIframe();
  }

  closeEnrollModal(): void {
    this.showEnrollModal = false;
    this.selectedCourse = null;
    this.enrollingCourseId = null;
  }

  closePaymentIframe(): void {
    this.showPaymentIframe = false;
    this.paymentUrl = '';
  }

  closeResultModal(): void {
    this.showResultModal = false;
    this.enrollmentMessage = '';
    this.transactionId = '';
    
    // Reload enrolled courses
    this.loadEnrolledCourses();
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
  viewDetails(course: Course): void {
  if (!course.crs_Id) return;
  this.router.navigate(['/courses', course.crs_Id, 'details']);
}
}