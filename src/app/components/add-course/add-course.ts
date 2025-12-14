import { Component, OnInit } from '@angular/core';
import { Instructor } from '../../models/iinstructor';
import { AddCourseRequest, CourseService } from '../../Services/course.service';
import { InstructorService } from '../../Services/instructor-srevices';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Snackbar } from '../../shared/snackbar';

@Component({
  selector: 'app-add-course',
  imports: [CommonModule, FormsModule, RouterModule,RouterLink,MatSnackBarModule],
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
    private router: Router,
     private snackBar: Snackbar
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

  onSubmit(form: NgForm): void {
    this.isSubmitting = true;

       if (form.invalid || this.formModel.instructorId===0) {
      this.snackBar.open('Please fill in required fields', 'error');
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
         this.snackBar.open('Course added successfully', 'success');
        this.router.navigate(['/Courses']); // يرجّعك لليست الكورسات
      },
      error: (err) => {
        console.error(err);
         this.snackBar.open(err.error?.message || 'Failed to add course', 'error');
        this.isSubmitting = false;
      }
    });
  }
}