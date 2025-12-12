import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

export interface StudentAttendance {
  studentId: number;
  fullName: string;
  email: string;
  attendanceDate: string;
  checkIn: string;
  checkOut?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = `${environment.apiBase}/Attendance`;

  constructor(private http: HttpClient) { }

  checkIn(lessonId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkin/${lessonId}`, {}, { responseType: 'text' });
  }

  checkOut(lessonId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout/${lessonId}`, {}, { responseType: 'text' });
  }

  getAttendanceByLesson(lessonId: number): Observable<StudentAttendance[]> {
    return this.http.get<StudentAttendance[]>(`${this.apiUrl}/lesson/${lessonId}`);
  }
}
