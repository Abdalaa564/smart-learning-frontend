import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Instructor } from '../models/iinstructor';
import { AdminUser, CreateAdminDto, UpdateAdminDto } from '../models/Admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:5163/api/Admin';

  constructor(private http: HttpClient) { }

  // ============ INSTRUCTORS ============

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

  
  // ============ ADMINS ============

  getAllAdmins(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${this.apiUrl}/admins`);
  }

  getAdminById(userId: string): Observable<AdminUser> {
    return this.http.get<AdminUser>(`${this.apiUrl}/admins/${userId}`);
  }

  createAdmin(dto: CreateAdminDto): Observable<AdminUser> {
    return this.http.post<AdminUser>(`${this.apiUrl}/admins`, dto);
  }

  updateAdmin(userId: string, dto: UpdateAdminDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/admins/${userId}`, dto);
  }

  deleteAdmin(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admins/${userId}`);
  }

  getAdminsCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/admins/count`);
  }
}
