import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Studentprofile } from '../../models/studentprofile';
import { StudentprofileService } from '../../Services/studentprofile-service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule,CommonModule, DatePipe],
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

  constructor(
    private formBuilder: FormBuilder,
    private student: StudentprofileService
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.student.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.populateForm(data);
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load profile';
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