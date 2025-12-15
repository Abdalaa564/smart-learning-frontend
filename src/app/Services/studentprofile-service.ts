import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Studentprofile } from '../models/studentprofile';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentprofileService {
  private apiUrl = 'https://elearningg.runasp.net/api';
  private tokenKey = 'access_token';
  private userKey = 'current_user';

  private currentUserSubject = new BehaviorSubject<Studentprofile | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Studentprofile> {
    return this.http.get<Studentprofile>(`${this.apiUrl}/Account/profile`);
  }

  getStudentById(id: string): Observable<Studentprofile> {
    return this.http.get<Studentprofile>(`${this.apiUrl}/Student/profile/${id}`);
  }

  updateProfile(data: Partial<Studentprofile>): Observable<Studentprofile> {
    return this.http.put<Studentprofile>(`${this.apiUrl}/student/profile`, data)
      .pipe(
        tap(updatedUser => {

          this.saveUser(updatedUser);
          this.currentUserSubject.next(updatedUser);
        })
      );
  }

  deleteStudent(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Student/${userId}`);
  }


  private saveUser(user: Studentprofile): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }


  private getUserFromStorage(): Studentprofile | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }
}
