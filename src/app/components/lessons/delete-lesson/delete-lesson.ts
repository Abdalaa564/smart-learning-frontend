// delete-lesson.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../../Services/lesson.service';
import { Lesson } from '../../../models/LessonResource ';

@Component({
  selector: 'app-delete-lesson',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './delete-lesson.html',
  styleUrl: './delete-lesson.css',
})
export class DeleteLesson implements OnInit {

  courseId!: number;
  unitId!: number;
  lessonId!: number;

  lesson?: Lesson;
  isLoading = false;
  isDeleting = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService
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
        // ✅ بنعرض البيانات قبل الحذف
        this.lesson = lesson;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'حدث خطأ أثناء تحميل بيانات الدرس.';
        this.isLoading = false;
      }
    });
  }

  confirmDelete() {
    if (!this.lesson) { return; }

    this.isDeleting = true;
    this.lessonService.deleteLesson(this.lessonId).subscribe({
      next: () => {
        this.isDeleting = false;
        // بعد الحذف نرجع لليستة الدروس
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
        this.isDeleting = false;
        this.errorMessage = 'حدث خطأ أثناء حذف الدرس.';
      }
    });
  }

  cancel() {
    this.router.navigate([
      '/Courses',
      this.courseId,
      'units',
      this.unitId,
      'lessons'
    ]);
  }
}
