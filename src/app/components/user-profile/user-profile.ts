import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Studentprofile } from '../../models/studentprofile';
import { StudentprofileService } from '../../Services/studentprofile-service';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../Services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Snackbar } from '../../shared/snackbar';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, CommonModule, DatePipe, MatSnackBarModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
  providers: [DatePipe],
  standalone: true,

})
export class UserProfile implements OnInit {

  profileForm: FormGroup;
  profile: Studentprofile | null = null;
  loading = false;
  editing = false;
  error = '';
  success = '';

  isReadOnly = false;

  constructor(
    private formBuilder: FormBuilder,
    private student: StudentprofileService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private snackbar: Snackbar
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      dateOfBirth: ['', [Validators.required, this.pastDateValidator]],
      address: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isReadOnly = true;
        this.loadStudentProfile(+id);
      } else {
        this.isReadOnly = false;
        this.loadProfile();
      }
    });
  }

  loadProfile() {
    this.loading = true;
    this.student.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.populateForm(data);
        this.loading = false;
        this.profileForm.enable();
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load profile';
        this.loading = false;
      }
    });
  }

  loadStudentProfile(id: number) {
    this.loading = true;
    this.student.getStudentById(id).subscribe({
      next: (data) => {
        this.profile = data;
        this.populateForm(data);
        this.loading = false;
        this.profileForm.disable(); // Disable form in read-only mode
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load student profile';
        this.loading = false;
      }
    });
  }

  populateForm(data: Studentprofile) {
    this.profileForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      dateOfBirth: data.dateOfBirth.split('T')[0], // Format for date input
      address: data.address,
      city: data.city
    });
  }

  toggleEdit() {
    console.log("Toggle clicked!");
    this.editing = !this.editing;
    this.error = '';
    this.success = '';
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;

    this.student.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        this.success = 'Profile updated successfully!';
        this.snackbar.open(this.success, 'success');


        this.profile = {
          ...this.profile!,
          ...this.profileForm.value
        };

        this.editing = false;
        this.loading = false;

        setTimeout(() => this.success = '', 3000);
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to update profile';
        this.snackbar.open(this.error, 'error');
        this.loading = false;
      }
    });
  }


  onCancel() {
    this.editing = false;
    if (this.profile) {
      this.populateForm(this.profile);
    }
  }

  get f() {
    return this.profileForm.controls;
  }

  goToMyCourses() {
    const studentId = this.authService.UserId;
    console.log('Current User ID:', this.authService.UserId);

    this.router.navigate(['/student', studentId, 'courses']);

  }
  pastDateValidator(control: AbstractControl) {
    const date = new Date(control.value);
    return date > new Date() ? { futureDate: true } : null;
  }

  // ngAfterViewInit() {
  //   const editBtn = document.getElementById('editBtn');
  //   const modal = document.getElementById('editModal');
  //   const closeModalBtn = document.getElementById('closeModal');
  //   const cancelBtn = document.getElementById('cancelBtn');

  //   if (editBtn && modal && closeModalBtn && cancelBtn) {
  //     editBtn.addEventListener('click', () => {
  //       modal.style.display = 'flex';
  //     });

  //     closeModalBtn.addEventListener('click', () => {
  //       modal.style.display = 'none';
  //     });

  //     cancelBtn.addEventListener('click', () => {
  //       modal.style.display = 'none';
  //     });

  //     window.addEventListener('click', (e) => {
  //       if (e.target === modal) {
  //         modal.style.display = 'none';
  //       }
  //     });
  //   }
  // }
}