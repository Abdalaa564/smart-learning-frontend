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
import { Snackbar } from '../../shared/snackbar';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
      private snackbar: Snackbar


  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email],
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    //  this.error = '';

    if (this.loginForm.invalid) {
      this.snackbar.open('Please fix validation errors', 'error');
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        const role = this.authService.getRoleFromToken(); // 👈 برضو من authService
        this.snackbar.open('Login successful ', 'success');
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'Instructor') {
          this.router.navigate(['/instructor/profile']);
        } else {
          this.router.navigate(['/userProfile']);
        }

        this.loading = false;
      },
      error: (err) => {
       this.loading = false;

      if (err.status === 401) {
        this.snackbar.open('Invalid email or password', 'error');
      } else if (err.status === 404) {
        this.snackbar.open('User not found', 'error');
      } else {
        this.snackbar.open('Something went wrong, try again', 'error');
      }
    }
    });
  }

}
