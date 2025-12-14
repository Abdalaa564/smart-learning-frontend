import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Lesson } from '../../../models/LessonResource ';
import { LessonService } from '../../../Services/lesson.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Snackbar } from '../../../shared/snackbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-updatelesson',
  imports: [CommonModule,FormsModule,RouterLink,MatSnackBarModule],
  templateUrl: './updatelesson.html',
  styleUrl: './updatelesson.css',
})
export class EditLesson implements OnInit {

  courseId!: number;
  unitId!: number;
  lessonId!: number;

  lessonName = '';
  lessonDescription = '';

  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService,
    private snackBar: Snackbar
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.unitId = Number(this.route.snapshot.paramMap.get('unitId'));
    this.lessonId = Number(this.route.snapshot.paramMap.get('lessonId'));

    this.loadLesson();
  }

  loadLesson() {
    this.isLoading = true;
    this.lessonService.getLessonById(this.lessonId).subscribe({
      next: (lesson: Lesson) => {
        // ✅ رجعنا البيانات القديمة وملينا الفورم
        this.lessonName = lesson.lesson_Name;
        this.lessonDescription = lesson.lessonDescription ?? '';
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'حدث خطأ أثناء تحميل بيانات الدرس.';
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.lessonName.trim()) {
      this.errorMessage = 'Lesson name is required.';
      return;
    }

    this.isSubmitting = true;

    const body = {
      lesson_Name: this.lessonName,
      lessonDescription: this.lessonDescription
    };

    this.lessonService.updateLesson(this.lessonId, body).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Lesson updated successfully.';
        this.snackBar.open(this.successMessage, 'success');

        // تقدر تعرض رسالة أو ترجع لصفحة التفاصيل
         this.router.navigate([
          '/Courses',
          this.courseId,
          'units',
          this.unitId,
          'lessons'
        ]);
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
        this.errorMessage = 'Error while updating lesson.';
        this.snackBar.open(this.errorMessage, 'error');
      }
    });
  }

  cancel() {
    this.router.navigate([
      '/Courses',
      this.courseId,
      'units',
      this.unitId,
      'lessons',
      this.lessonId
    ]);
  }
}