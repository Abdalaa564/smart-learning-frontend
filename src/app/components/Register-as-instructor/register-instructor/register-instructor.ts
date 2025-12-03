// src/app/components/register-instructor/register-instructor.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth-service';
import { RegisterInstructorRequest } from '../../../models/iinstructor';
import { InstructorAccountStepComponent } from '../instructor-account-step/instructor-account-step';
import { InstructorProfileStepComponent } from '../instructor-profile-step/instructor-profile-step';


@Component({
  selector: 'app-register-instructor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InstructorAccountStepComponent,
    InstructorProfileStepComponent
  ],
  templateUrl: './register-instructor.html',
  styleUrl: './register-instructor.css'
})
export class RegisterInstructorComponent {

  registerForm: FormGroup;
  currentStep = 1;
  submitted = false;
  loading = false;

  // Toast
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        // STEP 1
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        fullName: ['', Validators.required],
        jobTitle: ['', Validators.required],
        phoneNumber: ['', [
          Validators.required,
          Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)
        ]],
        youtubeChannelUrl: [''],

        // STEP 2
        photoUrl: [''],
        certificateUrl: [''],
        cvUrl: [''],
        specialization: ['', Validators.required],
        universityName: ['', Validators.required],
        about: ['', [Validators.required, Validators.minLength(20)]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Validator بتاع الباسورد
  passwordMatchValidator(group: AbstractControl | null) {
    if (!group) return null;
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // علشان نستخدم الكنترولز بسهولة جوه الـ Parent (في goToStep2)
  get f() {
    return this.registerForm.controls;
  }

  // الانتقال من Step 1 لـ Step 2 بعد ما يتأكد إن Step 1 valid
  onNextFromStep1() {
    this.submitted = true;

    const controlsToCheck = [
      'email',
      'password',
      'confirmPassword',
      'fullName',
      'jobTitle',
      'phoneNumber'
    ];

    let step1Valid = true;

    controlsToCheck.forEach(controlName => {
      const control = this.registerForm.get(controlName);
      control?.markAsTouched();
      control?.updateValueAndValidity();
      if (control?.invalid) {
        step1Valid = false;
      }
    });

    if (this.registerForm.errors?.['passwordMismatch']) {
      step1Valid = false;
    }

    if (!step1Valid) return;

    this.currentStep = 2;
  }

  onBackToStep1() {
    this.currentStep = 1;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const payload: RegisterInstructorRequest =
      this.registerForm.value as RegisterInstructorRequest;

    this.loading = true;

    this.authService.registerInstructor(payload).subscribe({
      next: () => {
        this.loading = false;
        this.toastType = 'success';
        this.toastMessage = 'Wait until admin approve your profile';
        this.showToast = true;

        setTimeout(() => {
          this.showToast = false;
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: (err) => {
        this.loading = false;
        this.toastType = 'error';
        this.toastMessage =
          err.error?.message || 'Registration failed, please try again';
        this.showToast = true;

        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      }
    });
  }
}
