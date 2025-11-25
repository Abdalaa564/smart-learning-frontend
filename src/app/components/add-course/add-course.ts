import { Component, OnInit } from '@angular/core';
import { Instructor } from '../../models/iinstructor';
import { AddCourseRequest, CourseService } from '../../Services/course.service';
import { InstructorService } from '../../Services/instructor-srevices';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  imports: [CommonModule, FormsModule, RouterModule,RouterLink],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css',
})
export class AddCourse implements OnInit {

 instructors: Instructor[] = [];

  formModel = {
    crs_Name: '',
    crs_Description: '',
    price: 0,
    instructorId: 0,
    imageUrl: ''
  };

  selectedImageFile: File | null = null;
  isSubmitting = false;

  constructor(
    private courseService: CourseService,
    private instructorService: InstructorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.instructorService.getAll().subscribe({
      next: (instructors) => this.instructors = instructors,
      error: (err) => console.error(err)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
      console.log("Selected image:", this.selectedImageFile);
    }
  }

  onSubmit(): void {
    this.isSubmitting = true;

    if (!this.formModel.crs_Name || !this.formModel.instructorId) {
      alert('Instructor and Course Name are required');
      this.isSubmitting = false;
      return;
    }

    const request: AddCourseRequest = {
      crs_Name: this.formModel.crs_Name,
      crs_Description: this.formModel.crs_Description,
      price: this.formModel.price,
      instructorId: this.formModel.instructorId,
      imageFile: this.selectedImageFile,
      imageUrl: this.formModel.imageUrl || null
    };

    this.courseService.addCourse(request).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/Courses']); // يرجّعك لليست الكورسات
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
      }
    });
  }
}