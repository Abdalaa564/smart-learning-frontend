import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environment/environment';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LessonService } from '../../../Services/lesson.service';
import { UnitService } from '../../../Services/unit.service';
import { CommonModule } from '@angular/common';
import { Unit } from '../../../models/Unit ';
import { Lesson } from '../../../models/LessonResource ';
import { EnrollmentService } from '../../../Services/enrollment-service';
import { AuthService } from '../../../Services/auth-service';

@Component({
  selector: 'app-lessons',
  imports: [CommonModule, RouterLink],
  templateUrl: './lessons.html',
  styleUrl: './lessons.css',
})
export class Lessons implements OnInit {

  courseId!: number;
  unitId!: number;

  unit?: Unit;
  lessons: Lesson[] = [];
  isLoading = false;
  errorMessage = '';
  isEnrolled = false;
  freeLessonsLimit = 3;   
  freeUnitId = 1; 
  env = environment;
  units: Unit[] = [];

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
    private lessonService: LessonService,
    private unitService: UnitService,
    private enrollmentService: EnrollmentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.unitId = Number(this.route.snapshot.paramMap.get('unitId'));
    const studentId = this.authService.UserId;
    if (studentId) {
      this.enrollmentService.isStudentEnrolled(studentId, this.courseId)
        .subscribe(res => this.isEnrolled = res);
    }

    this.unitService.getByCourse(this.courseId).subscribe(units => {
    this.units = units.sort((a, b) => a.orderIndex - b.orderIndex); // تأكد إن الوحدات مرتبة حسب الـ order
    this.loadUnit();
    this.loadLessons();
  });
  }

  loadUnit(): void {
    this.unitService.getUnit(this.unitId).subscribe({
      next: (u) => this.unit = u,
      error: (err) => console.error('Error loading unit:', err)
    });
  }

  loadLessons(): void {
    this.isLoading = true;

    this.lessonService.getLessonsByUnit(this.unitId).subscribe({
      next: (data) => {
        this.lessons = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading lessons:', err);
        this.errorMessage = 'حدث خطأ أثناء تحميل الدروس.';
        this.isLoading = false;
      }
    });
  }
canAccessLesson(index: number): boolean {
  // If Admin or Instructor -> Allow full access
  if (this.authService.isAdmin() || this.authService.isInstructor()) {
    return true;
  }

  // If enrolled, grant full access
  if (this.isEnrolled) return true;

  // Only first unit's first 3 lessons are free
  const firstUnit = this.units[0];
  if (this.unit && this.unit.unit_Id === firstUnit.unit_Id && index < this.freeLessonsLimit) {
    return true;
  }

  return false;
}

  getPdfResource(lesson: Lesson) {
    return lesson.resources?.find(r => r.resource_Type === 'pdf');
  }

  getPdfThumbnail(lesson: Lesson): string {
    const pdf = this.getPdfResource(lesson);
    if (pdf && pdf.thumbnailUrl) {
      return pdf.thumbnailUrl;
    }
    return `${environment.imageBase}/images/pdf-icon.png`;
  }

  getPdfDownloadUrl(lesson: Lesson): string | null {
    const pdf = this.getPdfResource(lesson);
    return pdf ? pdf.resource_Url : null;
  }

  // ✅ حذف الدرس
  onDeleteLesson(lesson: Lesson) {
    if (!confirm(`هل أنت متأكد من حذف الدرس "${lesson.lesson_Name}" ؟`)) {
      return;
    }

    this.lessonService.deleteLesson(lesson.lesson_Id).subscribe({
      next: () => {
        // شيله من الليست من غير ما تعيد تحميل API لو حابب
        this.lessons = this.lessons.filter(l => l.lesson_Id !== lesson.lesson_Id);
      },
      error: (err) => {
        console.error('Error deleting lesson:', err);
        alert('حدث خطأ أثناء حذف الدرس');
      }
    });
  }
}