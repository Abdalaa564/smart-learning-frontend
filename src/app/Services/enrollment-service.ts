import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnrollmentRequest } from '../models/EnrollmentRequest';
import { map, Observable, take } from 'rxjs';
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

  // 🔹 كورسات الطالب (من غير caching مشترك)
  getStudentCourses(studentId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/student/${studentId}`);
  }

  // 🔹 هل الطالب مسجّل في كورس معيّن
  isStudentEnrolled(studentId: number, courseId: number) {
    return this.getStudentCourses(studentId).pipe(
      take(1),
      map((enrollments: any[]) => {
        console.log('Checking enrollment for:', courseId);
        console.log('Student enrollments:', enrollments);
        return enrollments.some(
          (e) => Number(e.crs_Id) === Number(courseId)
        );
      })
    );
  }

  getEnrollmentStatus(transactionId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/paymob-status/${transactionId}`);
  }

  /** 🔹 عدد الـ enroll لكورس واحد: /api/Enrollment/course/{courseId}/count */
  getCourseEnrollmentCount(courseId: number): Observable<number> {
    return this.http
      .get<{ courseId: number; enrollmentCount: number }>(
        `${this.baseUrl}/course/${courseId}/count`
      )
      .pipe(map((res) => res.enrollmentCount));
  }

  /** 🟢 Get how many enrollments for student */
  getStudentEnrollmentCount(studentId: number): Observable<number> {
    return this.http
      .get<any[]>(`${this.baseUrl}/student/${studentId}`)
      .pipe(
        map((res) => res.length) // count by array length
      );
  }
}
