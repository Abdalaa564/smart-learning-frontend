// lesson-details.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../../Services/lesson.service';
import { Lesson } from '../../../models/LessonResource ';


@Component({
  selector: 'app-lesson-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lesson-details.html',
  styleUrl: './lesson-details.css',
})
export class LessonDetails implements OnInit {

  courseId!: number;
  unitId!: number;
  lessonId!: number;

  lesson?: Lesson;
  isLoading = false;
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
      next: (data) => {
        this.lesson = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'حدث خطأ أثناء تحميل بيانات الدرس.';
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate([
      '/Courses',
      this.courseId,
      'units',
      this.unitId,
      'lessons'
    ]);
  }
}
