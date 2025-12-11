import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { LessonService } from '../../../Services/lesson.service';
import { environment } from '../../../environment/environment';
import { EnrollmentService } from '../../../Services/enrollment-service';
import { AuthService } from '../../../Services/auth-service';
import { SafePipe } from '../../../pipes/safe-pipe';
import { Lesson } from '../../../models/LessonResource ';

@Component({
  selector: 'app-lesson-details',
  imports: [CommonModule, RouterLink, SafePipe],
  templateUrl: './lesson-details.html',
  styleUrl: './lesson-details.css',
})
export class LessonDetails implements OnInit {
  lesson?: Lesson;
  courseId!: number;
  unitId!: number;
  lessonId!: number;

  isLoading = false;
  errorMessage = '';
  isEnrolled = false;
  canAccessContent = false;

  freeLessonsLimit = 3;
  freeUnitId = 1;
  currentLessonIndex = -1;

  env = environment;

  // Role checking
  get isInstructor(): boolean {
    return this.authService.isInstructor();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // End Role checking

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private lessonService: LessonService,
    private enrollmentService: EnrollmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.unitId = Number(this.route.snapshot.paramMap.get('unitId'));
    this.lessonId = Number(this.route.snapshot.paramMap.get('lessonId'));

    this.checkEnrollment();
  }

  checkEnrollment(): void {
    const studentId = this.authService.UserId;

    // If Admin or Instructor -> Allow access immediately
    if (this.authService.isAdmin() || this.authService.isInstructor()) {
      this.isEnrolled = true; // Treat as enrolled for UI logic
      this.canAccessContent = true;
      this.loadLesson();
      return;
    }

    if (!studentId) {
      // Not logged in - check if free lesson
      this.checkFreeAccess();
      return;
    }

    this.enrollmentService.isStudentEnrolled(studentId, this.courseId).subscribe({
      next: (enrolled) => {
        this.isEnrolled = enrolled;

        if (enrolled) {
          this.canAccessContent = true;
          this.loadLesson();
        } else {
          this.checkFreeAccess();
        }
      },
      error: (err) => {
        console.error('Enrollment check error:', err);
        this.checkFreeAccess();
      },
    });
  }

  checkFreeAccess(): void {
    if (this.unitId !== this.freeUnitId) {
      console.log('❌ Not Unit 1 - LOCKED');
      this.denyAccess();
      return;
    }
    // Get all lessons in this unit to determine index
    this.lessonService.getLessonsByUnit(this.unitId).subscribe({
      next: (lessons) => {
        // Sort lessons by ID to ensure correct order
        const sortedLessons = lessons.sort((a, b) => a.lesson_Id - b.lesson_Id);
        // Find current lesson's index (0-based)
        this.currentLessonIndex = sortedLessons.findIndex((l) => l.lesson_Id === this.lessonId);
        // Validate index
        if (this.currentLessonIndex === -1) {
          this.denyAccess('Lesson not found in this unit');
          return;
        }
        // Check if within free limit (0, 1, 2 for first 3 lessons)
        const isFree = this.currentLessonIndex < this.freeLessonsLimit;
        if (isFree) {
          this.canAccessContent = true;
          this.loadLesson();
        } else {
          this.denyAccess();
        }
      },
      error: (err) => {
        console.error('Failed to fetch unit lessons:', err);
        this.denyAccess('Unable to verify lesson access');
      },
    });
  }
  denyAccess(message?: string): void {
    this.canAccessContent = false;
    this.errorMessage =
      message ||
      'This lesson requires enrollment. Please enroll in the course to access this content.';
  }
  loadLesson(): void {
    if (!this.canAccessContent) {
      return;
    }

    this.isLoading = true;

    this.lessonService.getLessonById(this.lessonId).subscribe({
      next: (data) => {
        this.lesson = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading lesson:', err);
        this.errorMessage = 'An error occurred while loading the lesson.';
        this.isLoading = false;
      },
    });
  }

  getPdfResource() {
    return this.lesson?.resources?.find((r) => r.resource_Type === 'pdf');
  }

  getPdfUrl(): string | null {
    const pdf = this.getPdfResource();
    return pdf ? pdf.resource_Url : null;
  }

  goToEnroll(): void {
    this.router.navigate(['/Courses']);
  }

  goBack(): void {
    this.location.back();
  }
}
