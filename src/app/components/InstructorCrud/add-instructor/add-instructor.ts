import { Component } from '@angular/core';
import { InstructorService } from '../../../Services/instructor-srevices';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { Instructor } from '../../../models/iinstructor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/auth-service';
import { CreateInstructorRequest } from '../../../models/CreateInstructorRequest ';
=======
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CreateInstructorRequest } from '../../../models/CreateInstructorRequest ';
>>>>>>> master

@Component({
  selector: 'app-add-instructor',
  imports: [CommonModule, FormsModule],

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

  constructor(
    private service: InstructorService,
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    console.log('Create Instructor payload:', this.model);

    this.service.create(this.model).subscribe({
      next: (res) => {
        console.log('Instructor created:', res);
        this.router.navigate(['/instructors']);
      },
      error: err => {
        console.error('Error creating instructor:', err);
      }
    });
  }
}