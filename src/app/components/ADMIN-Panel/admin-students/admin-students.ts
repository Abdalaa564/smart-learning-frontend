import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Studentprofile } from '../../../models/studentprofile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-students.html',
  styleUrl: './admin-students.css',
})
export class AdminStudentsComponent {
  @Input() students: Studentprofile[] = [];
  @Input() studentEnrollCounts: { [studentId: number]: number } = {};

  @Output() add = new EventEmitter<void>();
  @Output() view = new EventEmitter<Studentprofile>();
  @Output() edit = new EventEmitter<Studentprofile>();
  @Output() delete = new EventEmitter<Studentprofile>();
}
