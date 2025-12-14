import { Component } from '@angular/core';
import { InstructorService } from '../../../Services/instructor-srevices';
import { Router } from '@angular/router';
import { Instructor } from '../../../models/iinstructor';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/auth-service';
import { CreateInstructorRequest } from '../../../models/CreateInstructorRequest ';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Snackbar } from '../../../shared/snackbar';

@Component({
  selector: 'app-add-instructor',
  imports: [CommonModule, FormsModule,MatSnackBarModule],

  templateUrl: './add-instructor.html',
  styleUrl: './add-instructor.css',
})
export class AddInstructorComponent {

  model: CreateInstructorRequest = {
    email: '',
    password: '',
    fullName: '',
    jobTitle: '',
    rating: 1,

    phoneNumber: '',
    youtubeChannelUrl: '',
    photoUrl: '',
    certificateUrl: ''
  };
  isSubmitting = false;

  constructor(
    private service: InstructorService,
    private auth: AuthService,
    private router: Router,
    private snackBar: Snackbar
  ) {}

  submit(form: NgForm) {
    this.isSubmitting = true;

    if (form.invalid) {
      this.snackBar.open('Please fill in all required fields correctly', 'error');
      this.isSubmitting = false;
      return;
    }

    this.service.create(this.model).subscribe({
      next: (res) => {
        this.snackBar.open('Instructor created successfully', 'success');
        this.isSubmitting = false;
        this.router.navigate(['/instructors']);
      },
      error: err => {
        this.snackBar.open(err.error?.message || 'Failed to create instructor', 'error');
        console.error('Error creating instructor:', err);
        this.isSubmitting = false;
      }
    });
  }
}