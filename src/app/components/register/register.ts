import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth-service';
import { ageRangeValidator } from '../../validators/date-range.validator';
import { Snackbar } from '../../shared/snackbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: Snackbar
  ) {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
        dateOfBirth: ['', [ageRangeValidator(20, 80)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // this.error = '';

    if (this.registerForm.invalid) {
      this.snackBar.open('Please correct the errors in the form.', 'error');
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.success = 'Registration successful! ';
        this.loading = false;
        this.snackBar.open(this.success, 'success');
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 409) {
          this.snackBar.open('Email already exists', 'error');
        } else if (error.status === 400) {
          this.snackBar.open('Invalid registration data', 'error');
        } else {
          this.snackBar.open('Something went wrong, try again', 'error');
        }
      },
    });
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
