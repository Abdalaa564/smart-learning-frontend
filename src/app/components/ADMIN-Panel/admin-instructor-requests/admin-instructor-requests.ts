import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Instructor } from '../../../models/iinstructor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-instructor-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-instructor-requests.html',
  styleUrl: './admin-instructor-requests.css',
})
export class AdminInstructorRequestsComponent {
  @Input() pendingInstructors: Instructor[] = [];
  @Input() isLoading = false;

  @Output() approve = new EventEmitter<Instructor>();
  @Output() reject = new EventEmitter<Instructor>();
}
