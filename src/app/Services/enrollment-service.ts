import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnrollmentRequest } from '../models/EnrollmentRequest';
import { map, Observable } from 'rxjs';
import { EnrollmentResponse } from '../models/EnrollmentResponse';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private baseUrl = 'http://localhost:5163/api/Enrollment';

  constructor(private http: HttpClient) {}

  enrollStudent(data: EnrollmentRequest): Observable<EnrollmentResponse> {
    return this.http.post<EnrollmentResponse>(`${this.baseUrl}/enroll`, data);
  }

  getStudentCourses(studentId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/student/${studentId}`);
  }
  isStudentEnrolled(studentId: number, courseId: number) {
    return this.getStudentCourses(studentId).pipe(
      map((enrollments: any[]) => {
        console.log('Checking enrollment for:', courseId);
        console.log('Student enrollments:', enrollments);
        return enrollments.some((e) => Number(e.crs_Id) === Number(courseId));
      })
    );
  }
}
