import { Component, OnInit } from '@angular/core';
import { StudentGrade } from '../../models/student-grade';
import { GradesService } from '../../Services/grades-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-grades-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './student-grades-component.html',
  styleUrl: './student-grades-component.css',
})
export class StudentGradesComponent implements OnInit {
  grades: StudentGrade[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private gradesService: GradesService) {}

  ngOnInit(): void {
    this.gradesService.getStudentGrades().subscribe({
      next: (data) => {
        this.grades = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load grades';
        this.loading = false;
      }
    });
  }
}
