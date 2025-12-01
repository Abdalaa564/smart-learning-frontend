import { Component } from '@angular/core';
import { InstructorService } from '../../../Services/instructor-srevices';
import { Router } from '@angular/router';
import { Instructor } from '../../../models/iinstructor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/auth-service';

@Component({
  selector: 'app-add-instructor',
  imports: [CommonModule, FormsModule],

  templateUrl: './add-instructor.html',
  styleUrl: './add-instructor.css',
})
export class AddInstructorComponent {

   model: Partial<Instructor> = {
    // هنسيبها فاضية هنا، ونعبيها وقت الـ submit من الـ AuthService
    userId: '',
    fullName: '',
    jobTitle: '',
    numberOfStudents: 0,
    rating: 1,           // خليه 1 بدل 0 عشان الـ Range في الباك إند لو من 1 لـ 5
    phoneNumber: '',
    youtubeChannelUrl: '',
    photoUrl: '',
    certificateUrl: ''
  };

  constructor(
    private service: InstructorService,
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    const userId = this.auth.currentIdentityUserId;

    if (!userId) {
      console.error('No userId found from AuthService. Are you logged in?');
      // ممكن هنا تعرض toastr أو alert للمستخدم
      return;
    }

    const payload = {
      userId: userId,
      fullName: this.model.fullName,
      jobTitle: this.model.jobTitle,
      rating: this.model.rating,
      phoneNumber: this.model.phoneNumber,
      youtubeChannelUrl: this.model.youtubeChannelUrl,
      photoUrl: this.model.photoUrl,
      certificateUrl: this.model.certificateUrl
    };

    console.log('Create Instructor payload:', payload);

    this.service.create(payload).subscribe({
      next: () => this.router.navigate(['/instructors']),
      error: err => {
        console.error('Error creating instructor:', err);
      }
    });
  }
}