// lesson.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Lesson } from '../models/LessonResource ';


@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private baseUrl = `${environment.apiBase}/Lesson`;

  constructor(private http: HttpClient) {}

  getLessonsByUnit(unitId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.baseUrl}/unit/${unitId}`);
  }

  getLessonById(id: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.baseUrl}/${id}`);
  }

  createLesson(formData: FormData) {
    return this.http.post<any>(`${this.baseUrl}/create`, formData);
  }

  // ✅ UPDATE
  updateLesson(id: number, body: { lesson_Name: string; lessonDescription: string }) {
    return this.http.put(`${this.baseUrl}/${id}`, body);
  }

  // ✅ DELETE
  deleteLesson(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
