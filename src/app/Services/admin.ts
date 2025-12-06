import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Instructor } from '../models/iinstructor';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:5163/api/Admin';

  constructor(private http: HttpClient) {}

  // 1) هترجع بس اللي Status = Pending (من الـ API)
  getPendingInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(`${this.apiUrl}/pending-instructors`);
  }

  // 2) Accept Instructor
  approveInstructor(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/instructors/${id}/approve`, {});
  }

  // 3) Reject Instructor
  rejectInstructor(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/instructors/${id}/reject`, {});
  }
}
