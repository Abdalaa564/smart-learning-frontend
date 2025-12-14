import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesService } from '../../../Services/grades-service';
import { StudentGrade } from '../../../models/student-grade';

@Component({
    selector: 'app-admin-grades',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-grades.html',
    styleUrl: './admin-grades.css'
})
export class AdminGradesComponent implements OnInit {
    grades: StudentGrade[] = [];
    isLoading = false;

    constructor(private gradesService: GradesService) { }

    ngOnInit(): void {
        this.loadGrades();
    }

    loadGrades(): void {
        this.isLoading = true;
        this.gradesService.getStudentGrades().subscribe({
            next: (data) => {
                this.grades = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading grades', err);
                this.isLoading = false;
            }
        });
    }
}
