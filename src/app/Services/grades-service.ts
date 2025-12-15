import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentGrade } from '../models/student-grade';

@Injectable({
  providedIn: 'root',
})
export class GradesService {
  private apiUrl = 'http://localhost:5163/api/Quiz'; // عدّل الـ URL حسب المشروع

  constructor(private http: HttpClient) {}

  getStudentGrades(): Observable<StudentGrade[]> {
    // هيدخل userId من الـ JWT Token في الـ Backend
    return this.http.get<StudentGrade[]>(`${this.apiUrl}/GetAllGrades`);
  }
}
