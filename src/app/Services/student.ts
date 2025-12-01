import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Studentprofile } from '../models/studentprofile';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = `${environment.apiBase}/Student`;

  constructor(private http: HttpClient) {}

  getCount(): Observable<{ totalStudents: number }> {
    return this.http.get<{ totalStudents: number }>(`${this.baseUrl}/count`);
  }
    getAll(): Observable<Studentprofile[]> {
    return this.http.get<Studentprofile[]>(this.baseUrl);
  }
}
