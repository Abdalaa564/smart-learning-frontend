import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LessonService } from '../../../Services/lesson.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Snackbar } from '../../../shared/snackbar';

@Component({
  selector: 'app-add-lesson',
  imports: [CommonModule, FormsModule, RouterLink,MatSnackBarModule],
  templateUrl: './add-lesson.html',
  styleUrl: './add-lesson.css',
})
export class AddLesson implements OnInit {

  courseId!: number;
  unitId!: number;

  lessonName: string = '';
  lessonDescription: string = '';
  youtubeUrl: string = '';
  file: File | null = null;

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
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.lessonName.trim()) {
      this.errorMessage = 'Lesson name is required.';
      return;
    }

    if (!this.file) {
      this.errorMessage = 'PDF file is required.';
      return;
    }

    const formData = new FormData();
    formData.append('unitId', this.unitId.toString());
    formData.append('lessonName', this.lessonName);
    formData.append('lessonDescription', this.lessonDescription || '');
    formData.append('file', this.file);
    formData.append('youtubeUrl', this.youtubeUrl || '');

    this.isSubmitting = true;

    this.lessonService.createLesson(formData).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        //this.successMessage = 'Lesson created successfully.';
        this.snackBar.open('Lesson created successfully.', 'success');

        // ✅ بعد النجاح رجّع المستخدم لصفحة الـ lessons
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
        // this.errorMessage = 'Error while creating lesson.';
        this.snackBar.open( 'Error while creating lesson.', 'error');
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