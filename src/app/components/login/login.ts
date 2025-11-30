import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterModule,ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    
    this.authService.login(this.loginForm.value).subscribe({
      next: res => {
        const role = this.authService.getRoleFromToken();  // 👈 برضو من authService

        if (role === 'Instructor') {
          this.router.navigate(['/instructor/profile']);
        } else {
          this.router.navigate(['/userProfile']);
        }

        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = err.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}
