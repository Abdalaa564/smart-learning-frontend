import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnrollmentRequest } from '../models/EnrollmentRequest';
import { map, Observable, of, take, tap } from 'rxjs';
import { EnrollmentResponse } from '../models/EnrollmentResponse';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private baseUrl = 'http://localhost:5163/api/Enrollment';
  private cachedCourses: Course[] | null = null;
  constructor(private http: HttpClient) {}

  enrollStudent(data: EnrollmentRequest): Observable<EnrollmentResponse> {
    return this.http.post<EnrollmentResponse>(`${this.baseUrl}/enroll`, data);
  }

  // getStudentCourses(studentId: number): Observable<Course[]> {
  //   return this.http.get<Course[]>(`${this.baseUrl}/student/${studentId}`);
  // }

  getStudentCourses(studentId: number): Observable<Course[]> {
  if (this.cachedCourses) {
    return of(this.cachedCourses); 
  }

  return this.http.get<Course[]>(`${this.baseUrl}/student/${studentId}`).pipe(
    tap((courses) => {
      this.cachedCourses = courses; 
    })
  );

}

  isStudentEnrolled(studentId: number, courseId: number) {
    return this.getStudentCourses(studentId).pipe( take(1),
      map((enrollments: any[]) => {
        console.log('Checking enrollment for:', courseId);
        console.log('Student enrollments:', enrollments);
        return enrollments.some((e) => Number(e.crs_Id) === Number(courseId));
      })
    );
  }
   getEnrollmentStatus(transactionId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/paymob-status/${transactionId}`);
  }
}
