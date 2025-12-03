import { Component } from '@angular/core';
import { EnrollmentService } from '../../Services/enrollment-service';
import { EnrollmentRequest } from '../../models/EnrollmentRequest';

@Component({
  selector: 'app-enrollment-component',
  imports: [],
  templateUrl: './enrollment-component.html',
  styleUrl: './enrollment-component.css',
})
export class EnrollmentComponent {

 enrollModel: EnrollmentRequest = {
    studentId: 0,
    courseId: 0,
    payment: {
      amount: 0,
      paymentMethod: ''
    }
  };

  constructor(private service: EnrollmentService) {}

  enroll() {
    this.service.enrollStudent(this.enrollModel).subscribe(res => {
      console.log(res);
    });
  }
}
