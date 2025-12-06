import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Instructor } from '../../../models/iinstructor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-instructors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-instructors.html',
  styleUrl: './admin-instructors.css',
})
export class AdminInstructorsComponent {
  @Input() instructors: Instructor[] = [];

  @Output() add = new EventEmitter<void>();
  @Output() view = new EventEmitter<Instructor>();
  @Output() edit = new EventEmitter<Instructor>();
  @Output() delete = new EventEmitter<Instructor>();
}
