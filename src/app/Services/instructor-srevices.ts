import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Instructor } from '../models/iinstructor';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  // http://localhost:5163/api/Instructor
  private baseUrl = environment.apiBase + '/Instructor';

  constructor(private http: HttpClient) {}

  // GET: /api/Instructor
  getAll(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.baseUrl);
  }

  // GET: /api/Instructor/{id}
  getById(id: number): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.baseUrl}/${id}`);
  }

  // POST: /api/Instructor
  // هنا خلتها Partial عشان لو بعت object من غير id / email ما يزعقش TypeScript
  create(instructor: Partial<Instructor>): Observable<Instructor> {
    return this.http.post<Instructor>(this.baseUrl, instructor);
  }

  // PUT: /api/Instructor/{id}
  update(id: number, instructor: Partial<Instructor>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, instructor);
  }

  // DELETE: /api/Instructor/{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
