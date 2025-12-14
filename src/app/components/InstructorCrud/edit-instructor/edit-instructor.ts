import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Instructor } from '../../../models/iinstructor';
import { InstructorService } from '../../../Services/instructor-srevices';
import { ActivatedRoute, Router } from '@angular/router';
import { Snackbar } from '../../../shared/snackbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-instructor',
  imports:[CommonModule, FormsModule,MatSnackBarModule],
  templateUrl: './edit-instructor.html',
  styleUrl: './edit-instructor.css',
})
export class EditInstructorComponent implements OnInit {

  model: Partial<Instructor> = {};
  id!: number;
  loading = true;
  isSubmitting = false;

  constructor(
    private service: InstructorService,
    private route: ActivatedRoute,
    private router: Router,
        private snackBar: Snackbar

  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getById(this.id).subscribe({
      next: res => {
        this.model = res;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

    save(form: NgForm) {
    this.isSubmitting = true;

    if (form.invalid) {
      this.snackBar.open('Please fill in all required fields correctly', 'error');
      this.isSubmitting = false;
      return;
    }

    this.service.update(this.id, this.model).subscribe({
      next: msg => {
        this.snackBar.open('Instructor updated successfully', 'success');
        this.isSubmitting = false;
        this.router.navigate(['/instructors']);
      },
      error: err => {
        console.error('ERROR FROM UPDATE:', err);
        this.snackBar.open(err.error?.message || 'Failed to update instructor', 'error');
        this.isSubmitting = false;
      }
    });
  }
}