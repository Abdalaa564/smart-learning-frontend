import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Instructor } from '../../models/iinstructor';
import { CourseService, UpdateCourseRequest } from '../../Services/course.service';
import { InstructorService } from '../../Services/instructor-srevices';
import { Course } from '../../models/Course';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Snackbar } from '../../shared/snackbar';

@Component({
  selector: 'app-edit-course',
  imports: [CommonModule, FormsModule, RouterModule, RouterLink, MatSnackBarModule],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css',
})
export class EditCourse implements OnInit {
  courseId!: number;
  selectedImageFile: File | null = null;

  instructors: Instructor[] = [];

  formModel = {
    crs_Name: '',
    crs_Description: '',
    price: 0,
    instructorId: 0,
    imageUrl: '',
  };

  isSubmitting = false;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private instructorService: InstructorService,
    private router: Router,
    private snackBar: Snackbar
  ) {}

  ngOnInit(): void {
    // 1) خد الـ id من ال URL /courses/edit/:id
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Edit course id from route = ', this.courseId);

    // 2) هات الإنستراكتورز
    this.instructorService.getAll().subscribe({
      next: (instructors) => {
        this.instructors = instructors;

        // 3) هات بيانات الكورس القديم من الـ API
        this.courseService.getCourseById(this.courseId).subscribe({
          next: (course: Course) => {
            console.log('Course loaded for edit: ', course);

            this.formModel = {
              crs_Name: course.crs_Name,
              crs_Description: course.crs_Description,
              price: course.price,
              instructorId: course.instructorId,
              imageUrl: course.imageUrl || '',
            };

            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error loading course by id', err);
            this.isLoading = false;
          },
        });
      },
      error: (err) => console.error('Error loading instructors', err),
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;

    if (!this.formModel.crs_Name || !this.formModel.instructorId) {
      alert('Instructor and Course Name are required');
      this.isSubmitting = false;
      return;
    }

    const dto: UpdateCourseRequest = {
      crs_Name: this.formModel.crs_Name,
      crs_Description: this.formModel.crs_Description,
      price: this.formModel.price,
      instructorId: this.formModel.instructorId,
      imageUrl: this.formModel.imageUrl || null,
      imageFile: this.selectedImageFile,
    };

    console.log('Submitting update dto = ', dto);

    this.courseService.updateCourse(this.courseId, dto).subscribe({
      next: (res) => {
        console.log('Update response: ', res);
        this.isSubmitting = false;
        this.snackBar.open('Course updated successfully', 'success');
        this.router.navigate(['/Courses']); // يرجع لليست الكورسات
      },
      error: (err) => {
        console.error('Error updating course', err);
        this.snackBar.open(err.error?.message || 'Failed to update course', 'error');

        this.isSubmitting = false;
      },
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
      console.log('Selected file:', this.selectedImageFile);
    }
  }
}
