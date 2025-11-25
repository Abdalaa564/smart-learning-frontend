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

  // GET /api/Lesson/unit/{unitId}
  getLessonsByUnit(unitId: number): Observable<Lesson[]> {
    // عدّل مسار الـ API هنا لو عندك Route مختلف
    return this.http.get<Lesson[]>(`${this.baseUrl}/unit/${unitId}`);
  }

  // لو حبيت تستخدمه لاحقاً
  getLessonById(id: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.baseUrl}/${id}`);
  }
   createLesson(formData: FormData) {
    return this.http.post<any>(`${this.baseUrl}/create`, formData);
  }
}
